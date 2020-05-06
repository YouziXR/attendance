// components/activity-basic-info/activity-basic-info.js
import dateFormat from '../../utils/date-format';

Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^pure/
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
    formData: {
      addrRange: 500
    },
    // 用于防抖函数的timer
    pureTimer: false,
    // 表单规则
    rules: [
      {
        name: 'name',
        rules: [{ required: true, message: '打卡标题必填' }]
      },
      {
        name: 'activityTime',
        rules: {
          message: '开始时间应该小于结束时间',
          validator: (rule, value, param, models) => {
            console.warn(rule, value, param, models);
          }
        }
      }
    ],
    // 打卡地点相关
    addressChecked: false,
    addressFooter: '',
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
     * @version: 版本迭代，思考了之后还是把这个函数改造成了防抖函数
     * @param {object} e 事件参数e
     * @author: youzi
     * @Date: 2020-04-26 18:51:31
     */
    formInputChange(e) {
      this.data.pureTimer && clearTimeout(this.data.pureTimer);
      this.data.pureTimer = setTimeout(() => {
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
      }, 500);
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
     * @desc: 指定打卡地点switch变化的函数
     * @param {object} e
     * @return: null
     * @author: youzi
     * @Date: 2020-05-06 16:40:06
     */
    onAddressChange(e) {
      const val = e.detail.value;
      this.setData({
        addressChecked: val
      });
      if (val) {
        this.setData({
          addressFooter: '打卡范围（300-2000）米'
        });
      } else {
        this.setData({
          addressFooter: ''
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
      let that = this;
      this.selectComponent('#form').validate((valid, err) => {
        if (!valid) {
          console.error(err);
          const errMsg = err[0].message;
          if (err.length) {
            that.setData({
              error: errMsg
            });
          }
        } else {
          wx.showToast({
            title: '校验通过'
          });
        }
      });
      console.log(this.data.formData);
    }
  }
});
