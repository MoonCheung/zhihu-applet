import { Block } from '@tarojs/components';
import 'taro-ui/dist/style/index.scss';
import Taro from '@tarojs/taro';
import './app.scss';

class App extends Taro.Component {
  componentWillMount() {
    this.$app.globalData = this.globalData;
  }

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
      navigationBarTitleText: '知小乎',
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
          text: '更多',
          iconPath: 'assets/images/more.png',
          selectedIconPath: 'assets/images/more-light.png'
        }
      ]
    }
  };

  render() {
    return null;
  }
}

export default App;
Taro.render(<App />, document.getElementById('app'));
