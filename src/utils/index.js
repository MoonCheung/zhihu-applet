import Taro from '@tarojs/taro';

const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

/**
 * 显示繁忙提示
 * @param {*} text
 */
const showBusy = text =>
  Taro.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
  });

/**
 * 显示成功提示
 * @param {*} text
 */
const showSuccess = text =>
  Taro.showToast({
    title: text,
    icon: 'success',
    duration: 2000
  });

/**
 * 显示失败提示
 * @param {*} title
 * @param {*} content
 */
const showModel = (title, content) => {
  Taro.hideToast();

  Taro.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};

/**
 * 需通过dispatch函数派发单个
 * @param {*} type 类型
 * @param {*} payload 有效载荷
 */
const action = (type, payload) => ({ type, payload });

/**
 * 异步延时
 * @param {*} timeout
 */
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export { formatTime, showBusy, showSuccess, showModel, action, delay };
