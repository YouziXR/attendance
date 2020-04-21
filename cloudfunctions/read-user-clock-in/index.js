/*
 * @Description: 读取user-clock-in表，联表查询
 * @Author: youzi
 * @Date: 2020-04-21 16:57:27
 * @LastEditors: youzi
 * @LastEditTime: 2020-04-21 19:47:53
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
 * @logic: 先查表user_clock_in，拿到activity_id，再去查表clock_in_activities，拿到打卡活动的信息，最后根据creater的openid，查表user_info，拿到创建者的信息
 * @author: youzi
 * @Date: 2020-04-21 19:28:07
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  try {
    console.log(wxContext);
    // debugger
    // 查询后的结果数组
    let clockInList;
    const result = await db
      .collection('user_clock_in')
      .where({
        _openid: wxContext.OPENID
      })
      .get();
    if (!result.errCode) {
      clockInList = result.data;
    }
    console.warn(clockInList);
    clockInList.forEach(el => {
      readClockInActivity(el.activity_id);
    });
    /* const userInfo = await db
      .collection('user_info')
      .where({
        _openid: wxContext.OPENID
      })
      .get();
    console.warn(userInfo); */
  } catch (e) {
    console.error(e);
  }
};

/**
 * 根据activity_id查表clock_in_activities，获取打卡活动信息
 * @param {string} activityId 活动id
 * @return: 打卡活动信息
 * @logic: 查表获得creater的id，再去调用查user_info表的函数
 * @author: youzi
 * @Date: 2020-04-21 19:32:12
 */
const readClockInActivity = async activityId => {
  try {
    let activity;
    let result = await db
      .collection('clock_in_activities')
      .doc(activityId)
      .get();
    if (!result.errCode) {
      activity = result.data;
      console.warn(activity);
    } else {
      console.error(result.errMsg);
    }
  } catch (error) {
    console.error(error);
  }
};
