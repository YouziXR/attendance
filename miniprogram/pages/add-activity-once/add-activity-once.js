// miniprogram/pages/add-activity-once/add-activity-once.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 错误提示文字，也用来判断是否显示错误提示框
    error: '',
    // 传给后台的活动信息
    activityInfo: {}
  },

  /**
   * @desc: 提交按钮事件，触发各组件的校验函数submitForm，当组件抛出错误时，catch之后调用mp-toptops提示用户，并结束本函数的运行。
   * @backup: 逻辑上采用异步函数同步化来写，所有校验函数都会返回promise对象，当前一个函数reject时，就不会继续执行下一个了；值得注意的是，有些组件可以返回为null，表示不需要填写这一项。
   * @param {e}
   * @author: youzi
   * @Date: 2020-04-28 20:49:42
   */
  async submitForm(e) {
    try {
      await this.selectComponent('#activityBasicInfo')
        .submitForm()
        .then(res => {
          console.warn(res);
          this.setData({
            ['activityInfo.basicInfo']: {
              ...res
            }
          });
        });
      await this.selectComponent('#activityAddressInfo')
        .submitForm()
        .then(res => {
          console.warn(res);
          if (res !== null) {
            this.setData({
              ['activityInfo.addressInfo']: {
                ...res
              }
            });
          }
        });
    } catch (err) {
      console.error(err);
      this.setData({
        error: err.errMsg
      });
      return;
    }
    console.log('?');
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
