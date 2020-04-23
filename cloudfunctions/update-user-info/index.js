/*
 * @Description: 更新用户信息表的操作
 * @Author: youzi
 * @Date: 2020-04-11 18:40:34
 * @LastEditors: youzi
 * @LastEditTime: 2020-04-22 17:26:30
 */
// 初始化 cloud
const cloud = require('wx-server-sdk');
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
});
// 使用了 async await 语法
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  try {
    console.log(event);
    const wxContext = cloud.getWXContext();
    // debugger
    return await db
      .collection('userInfo')
      .where({
        _openid: wxContext.OPENID
      })
      // .get();
      .update({
        data: {
          nickName: event.nickName,
          wxid: event.wxid,
          updateTime: db.serverDate()
        }
      });
  } catch (e) {
    console.error(e);
  }
};
