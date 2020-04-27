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
    year: d.getFullYear() + '',
    month: unshiftPrefix(d.getMonth() + 1),
    date: unshiftPrefix(d.getDate()),
    day: days[d.getDay()],
    hour: unshiftPrefix(d.getHours()),
    minute: unshiftPrefix(d.getMinutes()),
    second: unshiftPrefix(d.getSeconds())
  };
};
export default dateFormat;
