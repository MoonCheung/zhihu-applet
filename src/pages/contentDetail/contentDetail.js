import { Block, View, Image, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './contentDetail.scss';

class ContentDetail extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isShow: false,
      isShowQues: false,
      historyList: [],
      searchVal: '',
      questionTitle: '',
      contentDetail: ''
    };
  }

  componentWillMount(options = this.$router.params || {}) {
    let that = this;
    that.setState({
      questionTitle: options.title,
      contentDetail: options.content,
      like: options.like,
      comment: options.comment
    });
  }

  componentDidMount() {}

  componentDidShow() {}

  onPullDownRefresh = () => {
    Taro.stopPullDownRefresh();
  };
  onReachBottom = () => {};
  onShareAppMessage = () => {};
  config = {};

  render() {
    const {
      isShow,
      searchVal,
      historyList,
      questionTitle,
      contentDetail,
      like,
      comment
    } = this.state;
    return (
      <View className="container">
        <View className="search-wrap">
          <View className="search-input" onClick={this.showMack}>
            <Image className="search-input-icon" src={require('../../assets/images/search.png')} />
            <Text className="search-input-text">搜索内容提问</Text>
          </View>
          <View className="search-button">
            <Image className="search-button-icon" src={require('../../assets/images/edit.png')} />
            <Text className="search-button-text" onClick={this.showQuesMask}>
              提问
            </Text>
          </View>
        </View>
        {/*  隐藏搜索或者提问蒙层  */}
        <View className={'search-mask ' + (isShow ? 'show' : 'hide')}>
          <View className="search-input-wrap">
            <Image className="search-mask-icon" src={require('../../assets/images/search.png')} />
            <Input
              className="search-mask-input"
              type="text"
              confirmType="search"
              value={searchVal}
              autoFocus={isShow}
              focus={isShow}
              placeholderStyle="color:#cdcdcd"
              placeholder="搜索想知道内容"
              onConfirm={this.searchTopic}
            />
            <Text className="search-mask-cancel" onClick={this.hideMask}>
              取消
            </Text>
          </View>
          {historyList.length > 0 && (
            <View className="search-history">
              <View className="search-history-title">搜索历史</View>
              {historyList.map((item, index) => {
                return (
                  <View className="search-item" key={index.id}>
                    <Image
                      className="search-icon-time"
                      src={require('../../assets/images/time.png')}
                    />
                    <Text className="search-item-text">{item}</Text>
                    <Image
                      className="search-icon-del"
                      data-index={index}
                      onClick={this.clearItem}
                      src={require('../../assets/images/del-item.png')}
                    />
                  </View>
                );
              })}
              {historyList.length > 1 && (
                <View className="search-clear-all" onClick={this.clearAll}>
                  <Image
                    className="search-del-all"
                    src={require('../../assets/images/del-all.png')}
                  />
                  <Text className="search-del-text">清空搜索历史</Text>
                </View>
              )}
            </View>
          )}
        </View>
        {/*  搜索end  */}
        {/*  内容详情页   */}
        <View className="content-detail">
          <View className="content-detail-title">{questionTitle}</View>
          <View className="content-detail-answer">
            {contentDetail}
            <View className="content-detail-bottom">
              <View>编辑于2018-01-18</View>
              <View>著作权归作者所有</View>
            </View>
          </View>
        </View>
        <View className="content-detail-footer">
          <View className="content-footer-item">
            <Image className="content-footer-image" src={require('../../assets/images/like.png')} />
            <View className="content-footer-text">{'赞同' + like}</View>
          </View>
          <View className="content-footer-item">
            <Image
              className="content-footer-image"
              src={require('../../assets/images/thanks.png')}
            />
            <View className="content-footer-text">感谢作者</View>
          </View>
          <View className="content-footer-item">
            <Image
              className="content-footer-image"
              src={require('../../assets/images/collect.png')}
            />
            <View className="content-footer-text">收藏</View>
          </View>
          <View className="content-footer-item">
            <Image
              className="content-footer-image"
              src={require('../../assets/images/comment-detail.png')}
            />
            <View className="content-footer-text">{'评论' + comment}</View>
          </View>
        </View>
        {/*  内容详情页end   */}
      </View>
    );
  }
}

export default ContentDetail;
