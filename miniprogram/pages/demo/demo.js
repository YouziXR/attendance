// miniprogram/pages/demo/demo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    testInnerText: '',
    activitySpecialList: []
  },
  onTestCpmtTab(val) {
    console.log(val);
  },
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo);
            }
          });
        }
      }
    });
    this.getSpecialList();
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      testInnerText: 'wtf?'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
