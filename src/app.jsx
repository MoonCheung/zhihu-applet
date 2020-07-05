import Taro, { Component } from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';
import Index from '@/pages/index/index';
import './app.scss';

class App extends Component {
  componentWillMount() {
    this.$app.globalData = this.globalData;
  }

  // 在组件挂载之后立即调用
  componentDidMount() {}

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

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById('app'));
