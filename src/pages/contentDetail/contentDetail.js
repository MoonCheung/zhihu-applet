import { Block, View, Image, Text, Input } from '@tarojs/components';
import SearchInput from '@/components/searchInput/index';
import Taro from '@tarojs/taro';
import './contentDetail.scss';

class ContentDetail extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isShow: false,
      searchVal: '', // 空值, 以上搜索输入框状态
      isShowQues: false,
      questionTitle: '',
      contentDetail: '',
      like: '',
      time: '',
      comment: ''
    };
  }

  componentWillMount(options = this.$router.params || {}) {
    let that = this;
    that.setState({
      questionTitle: options.title,
      contentDetail: options.content,
      like: options.like,
      time: options.time,
      comment: options.comment
    });
  }

  componentDidMount() {}

  componentDidShow() {}

  onPullDownRefresh = () => {
    Taro.stopPullDownRefresh();
  };

  config = {
    navigationBarTitleText: '详情'
  };

  showMack = () => {
    let that = this;
    that.setState({
      isShow: true,
      searchVal: ''
    });
  };

  hideMask = () => {
    let that = this;
    that.setState({
      isShow: false
    });
  };

  showQuesMask = () => {
    let that = this;
    that.setState({
      isShowQues: true
    });
  };

  hideQuesMask = () => {
    let that = this;
    that.setState({
      isShowQues: false
    });
  };

  render() {
    const {
      isShow,
      searchVal,
      isShowQues,
      questionTitle,
      contentDetail,
      like,
      time,
      comment
    } = this.state;
    return (
      <View className="container">
        <View className="search-wrap">
          {/* 搜索栏 */}
          <SearchInput
            show={isShow}
            value={searchVal}
            showMack={this.showMack.bind(this)}
            hideMask={this.hideMask.bind(this)}
          />
          {/* 提问 */}
          <View className="search-button">
            <Image className="search-button-icon" src={require('../../assets/images/edit.png')} />
            <Text className="search-button-text" onClick={this.showQuesMask}>
              提问
            </Text>
          </View>
        </View>
        {/*  提问   */}
        <View className={'question-mask ' + (isShowQues ? 'show' : 'hide')}>
          <View className="question-input-wrap">
            <View className="question-title-wrap">
              <View className="question-mask-cancel" onClick={this.hideQuesMask}>
                取消
              </View>
              <Text className="mask-title">提问</Text>
              <View className="question-mask-next">下一步</View>
            </View>
            <Input
              className="question-mask-input"
              placeholderStyle="color: #cdcdcd"
              placeholder="输入问题并以问号结尾"
              type="text"
            />
            <Textarea
              className="quesion-mask-text"
              placeholderStyle="color: #cdcdcd"
              placeholder="问题描述(选填)"
              autoFocus="true"
            />
          </View>
        </View>
        {/*  提问end   */}
        {/*  内容详情页   */}
        <View className="content-detail">
          <View className="content-detail-title">{questionTitle}</View>
          <View className="content-detail-answer">
            {contentDetail}
            <View className="content-detail-bottom">
              <View>编辑于{time}</View>
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
