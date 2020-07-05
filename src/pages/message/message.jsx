import Taro from '@tarojs/taro';
import { ScrollView, View, Image, Text } from '@tarojs/components';
import { getMessageData } from '@/api/index';
import { AtAvatar } from 'taro-ui';
import './message.scss';

class Message extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      scorllTop: 0,
      messageHeader: '',
      messageList: []
    };
  }

  // 获取用户消息列表API
  getUserCenterList = () => {
    let that = this;
    getMessageData()
      .then(res => {
        if (res.errorMsg == '0') {
          that.setState({
            messageHeader: res.data.messageHeader || '',
            messageList: res.data.messageList || []
          });
        }
      })
      .catch(err => {
        console.error(`请求接口失败:`, err);
      });
  };
  onScroll = event => {
    let that = this;
    that.setState({
      scorllTop: event.detail.scrollTop
    });
  };

  // componentWillMount(options = this.$router.params || {}) {}

  componentDidMount() {
    this.getUserCenterList();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentWillUnmount() {}

  onPullDownRefresh = () => {};
  onReachBottom = () => {};
  onShareAppMessage = () => {};
  config = {
    navigationBarTitleText: '消息'
  };

  render() {
    const { messageHeader, scorllTop, messageList } = this.state;
    return (
      <ScrollView className="message-scroll-view" scrollY="true" onScroll={this.onScroll}>
        <View className="message-bar">
          <AtAvatar
            className="message-avatar"
            circle
            size="small"
            openData={{ type: 'userAvatarUrl' }}></AtAvatar>
          <Image className="message-bar-icon" src={require('../../assets/images/msg-set.png')} />
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
          {messageList.map(item => {
            return (
              <View className="message-list-item" key={item.id}>
                <Image className="message-list-avatar" src={item.avatar} />
                <View className="message-list-detail">
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
                        ? require('../../assets/images/is-answer.png')
                        : require('../../assets/images/answer.png')
                    }
                  />
                  <View className="message-list-time">{item.time + '小时前'}</View>
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

export default Message;
