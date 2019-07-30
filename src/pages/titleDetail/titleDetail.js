import { Block, View, Image, Text, Input, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import util from '@/utils/index';
import api from '@/api/index';
import './titleDetail.scss';

class TitleDetail extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isShow: false,
      isShowQues: false,
      historyList: [],
      searchVal: '',
      questionTitle: '',
      isLoading: false,
      loadMore: '加载更多'
    };
  }

  componentWillMount(options = this.$router.params || {}) {
    let that = this;
    that.setState({
      questionTitle: options.title
    });
  }
  // 获取详情列表API
  getDetailList = () => {
    let that = this;
    api.http('titleDetailApi', {}, res => {
      // console.log(res.data); //用来查看接口数据
      if (res.errMsg) {
        util.showModel(res.errMsg);
      } else {
        console.log('---请求提问详细列表---');
        that.setState({
          title: res.data.title || '',
          describe: res.data.describe || '',
          answerNumber: res.data.answerNumber || '',
          answerList: res.data.answerList || ''
        });
      }
    });
  };
  onPullDownRefresh = () => {
    Taro.stopPullDownRefresh();
  };

  componentDidMount() {
    this.getDetailList();
  }

  config = {};

  render() {
    const {
      isShow,
      searchVal,
      historyList,
      isShowQues,
      questionTitle,
      describe,
      answerNumber,
      answerList
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
        {/*  标题详情页   */}
        <View className="title-detail-wrap">
          <View className="title-detail">
            <View className="title-detail-title">{questionTitle}</View>
            <View className="title-detail-describe">{describe}</View>
          </View>
          <View className="title-answer-middle">
            <View className="title-answer-number">{answerNumber + '个回答'}</View>
            <View className="title-answer-sort">默认排序</View>
          </View>
          <View className="title-answer-list">
            {answerList.map((item, index) => {
              return (
                <View className="title-answer-item" key={index}>
                  <Image className="title-answer-avatar" src={item.avatar} />
                  <View className="title-answer-nickname">{item.nickname}</View>
                  <View className="title-answer-content">{item.content}</View>
                  <View className="title-answer-footer">
                    {item.like + '赞同 · ' + item.comment + '评论 · ' + item.time}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        {/*  标题详情页end   */}
      </View>
    );
  }
}

export default TitleDetail;
