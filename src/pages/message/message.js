import { Block, ScrollView, View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import withWeapp from '@tarojs/with-weapp';
import util from '@/utils/index';
import api from '@/api/index';
import './message.scss';

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '' /* 以上登录模块 */,
    scorllTop: 0,
    messageHeader: '',
    messageList: []
  };
  // 获取用户消息列表API
  getUserCenterList = () => {
    var that = this;
    api.http('messageListApi', {}, res => {
      if (res.errMsg) {
        util.showModel(res.errMsg);
      } else {
        console.log('---请求消息列表---');
        that.setData({
          messageHeader: res.data.messageHeader || '',
          messageList: res.data.messageList || []
        });
      }
    });
  };
  onScroll = event => {
    var that = this;
    that.setData({
      scorllTop: event.detail.scrollTop
    });
  };

  componentWillMount(options = this.$router.params || {}) {}

  componentDidMount() {
    this.getUserCenterList();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentWillUnmount() {}

  onPullDownRefresh = () => {};
  onReachBottom = () => {};
  onShareAppMessage = () => {};
  config = {};

  render() {
    const { messageHeader, scorllTop, messageList } = this.state;
    return (
      <ScrollView
        className="message-scroll-view"
        scrollY="true"
        onScroll={this.onScroll}
      >
        <View className="message-bar">
          <View className="message-bar-title">消息</View>
          <Image
            className="message-bar-icon"
            src={require('../../assets/images/msg-set.png')}
          />
        </View>
        <View className="message-header">
          <Image
            className="message-header-icon"
            src={require('../../assets/images/msg-header.png')}
          />
          <View className="message-header-info">
            <View className="message-header-title">私信</View>
            <View className="message-header-content">{messageHeader}</View>
          </View>
        </View>
        {/*  通知列表   */}
        <View className="message-notice">
          <View className="message-notice-title">通知列表</View>
        </View>
        {scorllTop >= 80 && (
          <View className="message-notice message-notice-fixed">
            <View className="message-notice-title">通知列表</View>
          </View>
        )}
        <View className="message-list">
          {messageList.map((item, index) => {
            return (
              <View className="message-list-item" key={index}>
                <Image className="message-list-avatar" src={item.avatar} />
                <View
                  className={
                    'message-list-detail ' +
                    (index === messageList.length - 1
                      ? 'message-list-noline'
                      : '')
                  }
                >
                  {item.isAnswer ? (
                    <View>
                      {item.nickname + '的提问等您来回答:'}
                      <Text decode="true" className="message-list-title">
                        {'&nbsp;' + item.title}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      {item.nickname + '的回答:'}
                      <Text decode="true" className="message-list-title">
                        {'&nbsp;' + item.title}
                      </Text>
                    </View>
                  )}
                  <Image
                    className="message-list-icon"
                    src={
                      item.isAnswer
                        ? '../../assets/images/is-answer.png'
                        : '../../assets/images/answer.png'
                    }
                  />
                  <View className="message-list-time">
                    {item.time + '小时'}
                  </View>
                </View>
              </View>
            );
          })}
          <View className="message-list-nomore">没有更多了~</View>
        </View>
      </ScrollView>
    );
  }
}

export default _C;