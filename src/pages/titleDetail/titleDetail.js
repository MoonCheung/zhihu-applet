import { Block, View, Image, Text, Input, Textarea } from '@tarojs/components';
import SearchInput from '@/components/searchInput/index';
import Taro from '@tarojs/taro';
import util from '@/utils/index';
import api from '@/api/index';
import './titleDetail.scss';

class TitleDetail extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isShow: false,
      searchVal: '', // 空值，以上搜索输入框状态
      isShowQues: false,
      questionTitle: ''
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
        that.setState({
          title: res.data.title || '',
          describe: res.data.describe || '',
          answerNumber: res.data.answerNumber || '',
          answerList: res.data.answerList || ''
        });
      }
    });
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

  onPullDownRefresh = () => {
    Taro.stopPullDownRefresh();
  };

  componentDidMount() {
    this.getDetailList();
  }

  config = {
    navigationBarTitleText: '头条详情'
  };

  render() {
    const { isShow, searchVal, isShowQues, questionTitle, describe, answerNumber, answerList } = this.state;
    return (
      <View className="container">
        <View className="search-wrap">
          {/* 搜索栏 */}
          <SearchInput
            ref="searchRef"
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
