import Taro from '@tarojs/taro';
import api from './api.config';

const dev = 'development';

//请求http接口
const http = (url, data, fun) => {
  Taro.request({
    method: 'POST',
    url: api[url][dev],
    data: data,
    header: {
      'content-type': 'application/json' //默认值
    },
    success: function(res) {
      console.log(res.errMsg);
      console.log(res.data);
      res.statusCode === 200 ? fun(res.data) : fun(res);
    },
    fail: function(res) {
      console.log(res.statusCode, res.errMsg);
    }
  });
};

module.exports = { http };
