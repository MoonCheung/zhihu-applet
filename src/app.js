import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';
import { Provider } from '@tarojs/redux';
import Index from '@/pages/index/index';
import models from '@/models/index';
import dva from '@/utils/dva';
import './app.scss';

const dvaApp = dva.createApp({
  initialState: {},
  models: models
});

const store = dvaApp.getStore();

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/findMore/findMore',
      'pages/market/market',
      'pages/message/message',
      'pages/userCenter/userCenter',
      'pages/searchResult/searchResult',
      'pages/titleDetail/titleDetail',
      'pages/contentDetail/contentDetail'
    ],
    window: {
      backgroundColor: '#FFF',
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#FFF',
      navigationBarTitleText: '知乎',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
    tabBar: {
      backgroundColor: '#fff',
      color: '#999',
      selectedColor: '#1E8AE8',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'assets/images/home.png',
          selectedIconPath: 'assets/images/home-light.png'
        },
        {
          pagePath: 'pages/findMore/findMore',
          text: '想法',
          iconPath: 'assets/images/find.png',
          selectedIconPath: 'assets/images/find-light.png'
        },
        {
          pagePath: 'pages/market/market',
          text: '市场',
          iconPath: 'assets/images/market.png',
          selectedIconPath: 'assets/images/market-light.png'
        },
        {
          pagePath: 'pages/message/message',
          text: '消息',
          iconPath: 'assets/images/msg.png',
          selectedIconPath: 'assets/images/msg-light.png'
        },
        {
          pagePath: 'pages/userCenter/userCenter',
          text: '我的',
          iconPath: 'assets/images/me.png',
          selectedIconPath: 'assets/images/me-light.png'
        }
      ]
    }
  };

  componentWillMount() {
    this.$app.globalData = this.globalData;
  }

  // 在组件挂载之后立即调用
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
