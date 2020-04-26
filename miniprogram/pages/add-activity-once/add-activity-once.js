// miniprogram/pages/add-activity-once/add-activity-once.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 存放表单的对象
    formData: {},
    // 表单规则
    rules: [
      {
        name: 'nickName',
        rules: [{ required: true, message: '昵称必填' }]
      },
      {
        name: 'wxid',
        rules: {}
      }
    ],
    showValidateDlg: false,
    contentValidateDlg: '',
    // 打卡标题字符的最大值
    nameMaxLength: 15,
    // 打卡标题当前字符值
    nameLength: 0
  },
  /**
   * @desc: 表单填写时触发的函数
   * @param {object} e 事件参数e
   * @return:
   * @author: youzi
   * @Date: 2020-04-26 18:51:31
   */
  formInputChange(e) {
    const { field } = e.currentTarget.dataset;
    const val = e.detail.value;
    if (field === 'name') {
      this.setData({
        nameLength: val.length,
        [`formData.${field}`]: val
      });
    } else {
      this.setData({
        [`formData.${field}`]: val
      });
    }
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
