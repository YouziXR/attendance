// miniprogram/pages/participate-clock-in/participate-clock-in.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 活动信息，用于列表渲染，后端接口获取
    activityInfo: [],
    // loading隐藏时是否显示动画
    animated: true,
    // loading的显示与隐藏
    show: true,
    // 跳转到打卡详情页面
    navUrl: '../clock-in-detail/clock-in-detail'
  },
  /**
   * @desc: 跳转到下一界面，由组件触发，事件代理冒泡捕获
   * @param {object} e 事件参数，e.detail
   * @return: null
   * @author: youzi
   * @Date: 2020-04-23 20:04:47
   */
  onTapNavigate(e) {
    console.warn('onTapNavigate', e);
    let info = e.detail;
    wx.navigateTo({
      url: this.data.navUrl,
      success: res => {
        res.eventChannel.emit('getInfoFromListPage', info);
      },
      fail: e => {
        console.error(e);
      },
      complete: () => {}
    });
  },
  /**
   * @desc: 调用云函数获取打卡列表并渲染
   * @param {null} null
   * @return: null
   * @apiData: { nickName, avatarUrl, activityTime, description, name, type, clockInTime }
   * @author: youzi
   * @Date: 2020-04-23 10:03:34
   */
  getClockInActivities() {
    wx.cloud
      .callFunction({
        name: 'read-user-clock-in'
      })
      .then(res => {
        console.log('%c read-user-clock-in', 'color: blue', res);
        this.setData({
          activityInfo: res.result
        });
        setTimeout(() => {
          wx.stopPullDownRefresh();
          this.setData({
            show: false
          });
        }, 200);
      })
      .catch(err => {
        console.error(err);
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.startPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
    this.getClockInActivities();
    // this.onReady();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    console.warn(e, 'on reaching btn');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});
