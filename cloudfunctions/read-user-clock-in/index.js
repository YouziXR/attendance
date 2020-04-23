/*
 * @Description: 读取user-clock-in表，联表查询
 * @Author: youzi
 * @Date: 2020-04-21 16:57:27
 * @LastEditors: youzi
 * @LastEditTime: 2020-04-22 23:02:26
 */

// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
/**
 * 查询打卡记录的函数
 * @return: promise
 * @logic: 先查表userClockIn，拿到activityId，再去查表clockInActivities，拿到打卡活动的信息，最后根据creater的openid，查表userInfo，拿到创建者的信息
 * @author: youzi
 * @Date: 2020-04-21 19:28:07
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  // 调用函数后的返回值
  let result = [];
  return await readUserClockIn(wxContext.OPENID)
    .then(async res => {
      console.log('readUserClockIn', res);
      if (!res.errCode) {
        if (!res.data.length) {
          return result;
        }
        let clockInList = res.data;
        for (let i = 0; i < clockInList.length; i++) {
          const el = clockInList[i];
          let activityWithUser = await readClockInActivity(el.activityId);
          activityWithUser.clockInTime = el.clockInTime;
          console.warn('main', activityWithUser);
          result.push(activityWithUser);
        }
        return result;
      } else {
        throw new Error(res.errMsg);
      }
    })
    .catch(err => {
      console.error(err);
      return err;
    });
};

/**
 * 根据openid查表userClockIn，获取打卡记录信息，然后调用readClockInActivity函数
 * @param {string} _openid
 * @return: promise 成功或者失败的promise回调
 * @author: youzi
 * @Date: 2020-04-22 14:38:38
 */
const readUserClockIn = async _openid => {
  try {
    // debugger
    // 查询后的结果数组
    // let clockInList;
    return await db.collection('userClockIn').where({ _openid }).get();
    /* if (!result.errCode) {
      clockInList = result.data;
    } else {
      throw new Error(esult.errMsg);
    }
    console.warn(clockInList);
    for (let i = 0; i < clockInList.length; i++) {
      const el = clockInList[i];
      await readClockInActivity(el.activityId);
    } */
    /* const userInfo = await db
      .collection('userInfo')
      .where({
        _openid: wxContext.OPENID
      })
      .get();
    console.warn(userInfo); */
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 * 根据activityId查表clockInActivities，获取打卡活动信息
 * @param {string} activityId 活动id
 * @return: promise 包括创建人信息，打卡活动信息
 * @logic: 查表获得creater的id，再去调用查userInfo表的函数
 * @author: youzi
 * @Date: 2020-04-21 19:32:12
 */
const readClockInActivity = async activityId => {
  try {
    let activityWithUser = {};
    let result = await db.collection('clockInActivities').doc(activityId).get();
    // 判断是否查询出了异常
    if (!result.errCode) {
      // 临时变量
      let tmpActivityInfo = result.data;
      return await readUserInfo(tmpActivityInfo.creater).then(res => {
        let tmpUserInfo = res.data[0];
        let { nickName, avatarUrl } = tmpUserInfo;
        let { activityTime, description, name, type } = tmpActivityInfo;
        Object.assign(activityWithUser, { nickName, avatarUrl, activityTime, description, name, type });
        console.warn('readClockInActivity', activityWithUser);
        return activityWithUser;
      });
      /* .catch(err => {
            console.error(err);
            return err;
          }); */
    } else {
      throw new Error(esult.errMsg);
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 * 查表userInfo，获取创建者的信息
 * @param {string} createrId 打卡活动创建者openid
 * @return : promise 包含创建者的信息数组
 * @author: youzi
 * @Date: 2020-04-22 09:59:34
 */
const readUserInfo = async createrId => {
  try {
    let userInfo;
    return await db
      .collection('userInfo')
      .where({
        _openid: createrId
      })
      .get();
    /* if (!result.errCode) {
      userInfo = result.data;
      console.warn('readUserInfo', userInfo);
      return userInfo;
    } else {
      throw new Error(esult.errMsg);
    } */
  } catch (err) {
    console.error(err);
    return err;
  }
};
