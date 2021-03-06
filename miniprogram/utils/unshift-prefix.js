/**
 * @desc: 如果数据小于10，就往数据前缀添加前缀
 * @param {number} num
 * @param {number} count 次数，默认一次
 * @param {any} prefix 前缀，默认前缀为字符串0
 * @return: 拼装后的字符串
 * @author: youzi
 * @Date: 2020-04-24 16:54:19
 */
const unshiftPrefix = (num, count = 1, prefix = '0') => {
  if (typeof num !== 'number' && typeof count !== 'number' && count <= 0) {
    return new Error('param type error');
  }
  let zeroAry = new Array(count);
  zeroAry.fill(prefix);
  return num <= 9 ? zeroAry.join('') + num : num.toString();
};
export default unshiftPrefix;
