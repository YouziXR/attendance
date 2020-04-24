import unshiftPrefix from 'unshift-prefix';
/**
 * @desc: 格式化日期的公共方法
 * @param {date} date 日期对象，毫秒数，可识别的日期字符串都可以
 * @author: youzi
 * @Date: 2020-04-24 15:49:58
 */
const dateFormat = date => {
  let d = new Date(date);
  let days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return {
    year: d.getFullYear() + '年',
    month: unshiftPrefix(d.getMonth() + 1, 1, '0') + '月',
    date: unshiftPrefix(d.getDate(), 1, '0') + '日',
    day: days[d.getDay()],
    hour: unshiftPrefix(d.getHours(), 1, '0'),
    minute: unshiftPrefix(d.getMinutes(), 1, '0'),
    second: unshiftPrefix(d.getSeconds(), 1, '0')
  };
};
export default dateFormat;
