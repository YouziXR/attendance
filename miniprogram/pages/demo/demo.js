/*
 * @Description: 打卡首页
 * @Author: youzi
 * @Date: 2020-04-10 10:25:25
 * @LastEditors: youzi
 * @LastEditTime: 2020-04-22 22:41:18
 */
// miniprogram/pages/demo/demo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    activitySpecialList: [],
    userNickName: ''
  },
  onTestCpmtTab(val) {
    console.log(val);
  },
  /**
   * @param {null} null
   * @return {null} null
   * @desc: 获取精品打卡列表
   * @author: youzi
   * @Date: 2020-04-10 17:14:55
   */
  getSpecialList() {
    var reqTask = wx.request({
      url: 'https://mockapi.eolinker.com/IijxmBq899bd1253246ccd95aaae99e8be43da84b7f788a/specialList',
      // data: { prop: '1' },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: result => {
        // console.log(result);
        let res = result.data;
        if (res.code === 200) {
          this.setData({
            activitySpecialList: res.data.specialList
          });
        }
      },
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * @desc: 新增用户，直接调用云数据库的add方法
   * @param {object} userInfo 用户信息对象
   * @return {null}
   * @logic: 错误处理在函数内部
   * @author: youzi
   * @Date: 2020-04-10 16:53:49
   */
  addUserInfo(userInfo) {
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('userInfo')
      .add({
        data: {
          ...userInfo,
          createTime: db.serverDate(),
          updateTime: db.serverDate()
        }
      })
      .then(res => {})
      .catch(e => {
        console.log(e);
        wx.showToast({
          title: '新增用户信息失败',
          icon: 'none'
        });
      });
  },
  /**
   * @param {null} null
   * @return {null}
   * @logic: 优先访问本地存储，如果没有取到值，再访问数据库，如果还是没有取到值，最后访问getUserInfo接口
   * @author: youzi
   * @Date: 2020-04-10 15:58:00
   */
  ownGetUserInfo() {
    const db = wx.cloud.database();
    const _ = db.command;
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        console.log(res);
        const userInfo = res.data;
        this.setData({
          userNickName: userInfo.nickName
        });
      },
      fail: () => {
        db.collection('userInfo')
          .where({
            _openid: '{openid}'
            // nickname: ''
          })
          .get()
          .then(res => {
            console.log(res);
            if (!res.data.length) {
              wx.getSetting()
                .then(res => {
                  console.log(res);
                  if (res.authSetting['scope.userInfo']) {
                    return wx.getUserInfo();
                  }
                })
                .then(res => {
                  console.log(res);
                  const userInfo = res.userInfo;
                  this.setData({
                    userNickName: userInfo.nickName
                  });
                  return new Promise((resolve, reject) => {
                    wx.setStorage({
                      key: 'userInfo',
                      data: {
                        nickName: userInfo.nickName,
                        avatarUrl: userInfo.avatarUrl
                      }
                    })
                      .then(() => resolve(userInfo))
                      .catch(e => reject(e));
                  });
                  /* return wx.setStorage({
                    key: 'userInfo',
                    data: userInfo
                  }); */
                })
                .then(res => {
                  console.log(res);
                  this.addUserInfo({
                    nickName: res.nickName,
                    avatarUrl: res.avatarUrl
                  });
                })
                .catch(error => {
                  wx.showToast({
                    title: error,
                    icon: 'none'
                  });
                  console.log(error);
                });
            } else {
              let { nickName, avatarUrl } = res.data[0];
              wx.setStorage({
                key: 'userInfo',
                data: { nickName, avatarUrl },
                success: result => {
                  this.setData({
                    userNickName: nickName
                  });
                  // res.data;
                },
                fail: () => {},
                complete: () => {}
              });
            }
          });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getSpecialList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.ownGetUserInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onReady();
    this.onShow();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});
