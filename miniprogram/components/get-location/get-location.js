// components/get-location/get-location.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    showeDlg: false,
    contenteDlg: '您拒绝了位置授权，将无法使用定位功能，点击确定重新获取授权'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @desc: getLocation方法
     * @author: youzi
     * @Date: 2020-05-08 14:21:42
     */
    GetLocation() {
      wx.getLocation({
        type: 'gcj02',
        altitude: true
      })
        .then(res => {
          const latitude = res.latitude;
          const longitude = res.longitude;
          this.trigger({
            latitude,
            longitude
          });
        })
        .catch(err => {
          console.error(err);
          if (err.errMsg.includes('auth')) {
            this.setData({
              showeDlg: true
            });
          } else {
            wx.showToast({
              title: err.errMsg,
              icon: 'none'
            });
            this.trigger();
          }
        });
    },

    /**
     * @desc: 对话框按钮点击事件
     * @author: youzi
     * @Date: 2020-05-08 15:30:27
     */
    tapDialogButton(e) {
      // e.detail.index===1表示点击了确定
      if (!!e.detail.index) {
        console.log('click yes');
        wx.openSetting({
          success: res => {
            if (res.authSetting['scope.userLocation']) {
              this.setData({
                showeDlg: false
              });
              this.GetLocation();
            } else {
              this.setData({
                showeDlg: false
              });
              wx.showToast({
                title: '您没有授权位置信息',
                icon: 'none'
              });
              this.trigger();
            }
          },
          fail: e => {
            console.error(e);
            this.trigger();
          }
        });
      } else {
        this.setData({
          showeDlg: false
        });
        this.trigger();
      }
    },

    /**
     * @desc: 触发冒泡事件到组件外部，标识是否成功获取到用户定位
     * @param {object} args 传到外部的参数，如果为默认值就表示获取失败，否则会携带坐标信息
     * @author: youzi
     * @Date: 2020-05-08 16:17:20
     */
    trigger(args = {}) {
      this.triggerEvent('locatedevent', args);
    }
  }
});
