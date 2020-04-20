// miniprogram/pages/participate-clock-in/participate-clock-in.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:
      'https://wx.qlogo.cn/mmopen/vi_32/reRVI0fwEMx4A3AgOAegicXlib635ic0v71HKCShUldKvkgMQdDibzlHicXicMTk2T8P23ibd3ko6Cia51Pg8sII18sA1g/132',
    title: '1',
    timeStart: null,
    status: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      timeStart: new Date()
    });
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
  onPullDownRefresh: function () {},

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
