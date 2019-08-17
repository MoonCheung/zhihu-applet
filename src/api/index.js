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
      // res.errMsg 打印出request:ok
      // res.data 打印出从mock服务器获取数据
      res.statusCode === 200 ? fun(res.data) : fun(res);
    },
    fail: function(res) {
      console.log(res.statusCode, res.errMsg);
    }
  });
};

module.exports = { http };
