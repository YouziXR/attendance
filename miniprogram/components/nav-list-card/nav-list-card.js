// components/nav-list-card/nav-list-card.js
Component({
  options: {
    addGlobalClass: true,
    // 以_pure开头的数据为纯数据
    pureDataPattern: /^_pure/
  },
  /**
   * 组件的属性列表
   */
  properties: {
    activityInfo: {
      type: Object,
      value: {}
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    // 跳转到打卡详情页面
    navUrl: '../clock-in-detail/clock-in-detail'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapNav() {
      // console.warn('onTapNav', this.data.activityInfo);
      this.triggerEvent('myevent', this.data.activityInfo, { bubbles: true });
      /*  wx.navigateTo({
        url: this.data.navUrl,
        success: res => {
          res.eventChannel.emit('getInfoFromListPage', this.data.activityInfo);
        },
        fail: () => {},
        complete: () => {}
      }); */
    }
  },
  observers: {
    /**
     * 监听父组件传入的活动信息变化的函数
     * @param {object} info 活动信息
     * @return: null
     * @author: youzi
     * @Date: 2020-04-21 11:57:20
     */
    activityInfo: function (info) {
      // 活动状态，可选值：未开始，进行中，已结束
      console.warn('%c activityInfo', 'color:blue', info);
      let activityStatus;
      let { startTime, endTime } = info;
      let now = new Date().getTime();
      if (now < startTime) {
        activityStatus = '未开始';
      } else if (now >= startTime && now <= endTime) {
        activityStatus = '进行中';
      } else {
        activityStatus = '已结束';
      }
      this.setData({
        /* url: info.url,
        activityTitle: info.activityTitle,
        time: info.time,
        activityStatus: info.activityStatus */
        ...info,
        activityStatus
      });
    }
  }
});
