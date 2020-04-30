// components/activity-basic-info/activity-basic-info.js
import dateFormat from '../../utils/date-format';

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  // properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    // 存放表单的对象
    formData: {},
    // 表单规则
    rules: [
      {
        name: 'name',
        rules: [{ required: true, message: '打卡标题必填' }]
      }
    ],
    // 错误提示文字，也用来判断是否显示错误提示框
    error: '',
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
  observers: {},
  lifetimes: {
    ready() {
      this.initDataOnLoad();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
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
     * @desc: 组件外部点击提交时，在组件外手动调用selectComponent来触发这个方法
     * @param {null}
     * @return:
     * @author: youzi
     * @Date: 2020-04-28 20:26:18
     */
    submitForm() {
      this.selectComponent('#form').validate((valid, err) => {
        if (!valid) {
          console.error(err);
          const firstError = Object.keys(err);
          if (firstError.length) {
            this.setData({
              error: err[firstError[0]].message
            });
          }
        } else {
          wx.showToast({
            title: '校验通过'
          });
        }
      });
    }
  }
});
