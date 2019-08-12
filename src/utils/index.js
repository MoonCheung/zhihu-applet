import Taro from '@tarojs/taro';

const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

<<<<<<< HEAD
  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
=======
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
>>>>>>> update pages
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

// 显示繁忙提示
const showBusy = text =>
  Taro.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
  });

// 显示成功提示
const showSuccess = text =>
  Taro.showToast({
    title: text,
    icon: 'success'
  });

// 显示失败提示
const showModel = (title, content) => {
  Taro.hideToast();

  Taro.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};

module.exports = { formatTime, showBusy, showSuccess, showModel };
