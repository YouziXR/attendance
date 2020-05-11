// components/activity-address-info/activity-address-info.js
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
      range: 500
    },
    // 从chooseLocation拿来的具体地址
    absoluteAddr: '',
    // 打卡范围界定
    addrRange: {
      min: 300,
      max: 2000
    },
    // 用于防抖函数的timer
    pureTimer: false,
    // 表单规则
    rules: [
      {
        name: 'coordinate',
        rules: [{ required: true, message: '请选择定位地点' }]
      },
      {
        name: 'range',
        rules: [
          { required: true, message: '请填写打卡范围' },
          {
            message: `打卡范围应该在（300-2000）米`,
            validator: (rule, value, param, models) => {
              // console.warn(rule, value, param, models);
              if (value < 300 || value > 2000) {
                return rule.message;
              }
            }
          }
        ]
      }
    ],
    // 打卡地点相关，false表示不需要填写地点信息
    addressChecked: false,
    addressFooter: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @desc: 表单填写时触发的函数
     * @param {e}
     * @author: youzi
     */
    formInputChange(e) {
      this.data.pureTimer && clearTimeout(this.data.pureTimer);
      this.data.pureTimer = setTimeout(() => {
        const { field } = e.currentTarget.dataset;
        const val = e.detail.value;
        this.setData({
          [`formData.${field}`]: val
        });
      }, 500);
    },

    /**
     * @desc: 指定打卡地点switch变化的函数
     * @param {e} e
     * @author: youzi
     */
    onAddressSwitch(e) {
      const val = e.detail.value;
      this.setData({
        addressChecked: val
      });
      if (val) {
        this.setData({
          addressFooter: `打卡范围（${this.data.addrRange.min}-${this.data.addrRange.max}）米`
        });
      } else {
        this.setData({
          formData: {
            range: 500
          },
          addressFooter: ''
        });
      }
    },

    /**
     * @desc: 点击定位事件，手动调用get-location组件的GetLocation函数
     * @author: youzi
     * @Date: 2020-05-08 11:39:15
     */
    onLocationTap(e) {
      this.selectComponent('#getLocation').GetLocation();
    },

    /**
     * @desc: 组件的locatedEvent触发的函数，接收定位坐标，如果授权失败则会清除打卡的位置信息
     * @param {object} e e.detail保存了位置信息，如果为空对象，则表示授权失败
     * @author: youzi
     */
    onLocatedEvent(e) {
      if (!!Object.keys(e.detail).length) {
        console.log(e.detail);
        wx.chooseLocation({
          success: res => {
            let { name, address, latitude, longitude } = res;
            latitude = Number.parseFloat(latitude);
            longitude = Number.parseFloat(longitude);
            console.log(res);
            this.setData({
              ['formData.coordinate']: {
                latitude,
                longitude
              },
              absoluteAddr: address
            });
          },
          fail: () => {},
          complete: () => {}
        });
      } else {
        this.onAddressSwitch({
          detail: {
            value: false
          }
        });
      }
    },

    /**
     * @desc: 组件外部点击提交时，在组件外手动调用selectComponent来触发这个方法；
     * @backup: 为什么要手动返回promise对象呢，因为如果单纯返回validate这个函数，无法给父组件传递参数，所以选择手动封装一层promise
     * @return {promise}: 返回promise对象，如果不需要填写则返回null，校验成功调用res，失败调用rej，参数分别是表单信息和失败信息；
     * @author: youzi
     * @Date: 2020-04-28 20:26:18
     */
    submitForm() {
      return new Promise((res, rej) => {
        if (!this.data.addressChecked) {
          res(null);
          return null;
        }
        this.selectComponent('#form').validate((valid, err) => {
          valid ? res(this.data.formData) : rej({ errMsg: err[0].message });
        });
      });
    }
  }
});
