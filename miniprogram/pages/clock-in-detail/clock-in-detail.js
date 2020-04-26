// miniprogram/pages/clock-in-detail/clock-in-detail.js
import dateFormat from '../../utils/date-format';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activityInfo: {},
    createTime: '',
    startTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    // 监听getInfoFromListPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    let that = this;
    eventChannel.on('getInfoFromListPage', function (data) {
      let { createTime, activityTime } = data;
      let createDate = dateFormat(createTime);
      let startDate = dateFormat(activityTime.startTime);
      that.setData({
        activityInfo: data,
        createTime: `${createDate.year}${createDate.month}${createDate.date} ${createDate.day} ${createDate.hour}:${createDate.minute}`,
        startTime: `${startDate.year}${startDate.month}${startDate.date} ${startDate.day} ${startDate.hour}:${startDate.minute}`
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});
