// miniprogram/pages/add-activity-once/add-activity-once.js
import dateFormat from '../../utils/date-format';

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
    nameLength: 0,
    // 打卡日期时间
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: ''
  },
  /**
   * @desc: 表单填写时触发的函数
   * @param {object} e 事件参数e
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
   * @desc: 时间日期选择器触发时的函数
   * @param {type}
   * @return:
   * @author: youzi
   * @Date: 2020-04-27 19:45:58
   */
  onDateTimeChange(e) {
    const { field } = e.currentTarget.dataset;
    const val = e.detail.value;
    this.setData({
      [field]: val
    });
    if (field.includes('end')) {
      this.setData({
        ['formData.activityTime.endTime']: this.data.endDate + ' ' + this.data.endTime
      });
    } else {
      this.setData({
        ['formData.activityTime.startTime']: this.data.startDate + ' ' + this.data.startTime
      });
    }
  },
  /**
   * @desc: load时初始化数据
   * @param {type}
   * @author: youzi
   * @Date: 2020-04-27 16:13:30
   */
  initDataOnLoad() {
    let d = new Date();
    let nowDate = dateFormat(d);
    let laterDate = dateFormat(d.getTime() + 2 * 24 * 60 * 60 * 1000);
    let startDate = `${nowDate.year}-${nowDate.month}-${nowDate.date}`,
      startTime = `${nowDate.hour}:${nowDate.minute}`,
      endDate = `${laterDate.year}-${laterDate.month}-${laterDate.date}`,
      endTime = startTime;
    this.setData({
      startDate,
      startTime,
      endDate,
      endTime,
      ['formData.activityTime.startTime']: startDate + ' ' + startTime,
      ['formData.activityTime.endTime']: endDate + ' ' + endTime
    });
  },
  /**
   * @desc:
   * @param {type}
   * @return:
   * @author: youzi
   * @Date: 2020-04-28 20:49:42
   */
  submitForm(e) {
    console.log('tapDialogButton');

    // this.selectComponent('#activityBasicInfo').submitForm();
    const err = this.selectComponent('#activityBasicInfo').submitForm()
    console.log(err);
    if (err) {
      
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initDataOnLoad();
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
