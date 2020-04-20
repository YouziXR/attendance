// components/nav-list-card/nav-list-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatarUrl: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    timeStart: {
      type: Date
    },
    timeEnd: {
      type: Date
    },
    status: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {}
});
