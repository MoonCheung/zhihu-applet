import { Block, View, Image, Text, Input, Textarea } from '@tarojs/components';
import util from '@/utils/index';
import Taro from '@tarojs/taro';
import api from '@/api/index';
import './index.scss';

class Index extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isShow: false,
      isShowQues: false,
      historyList: [],
      searchVal: '',
      isActive: 1 /* tab选项 */,
      animationData: {},
      focusList: [],
      recList: [],
      hotList: [],
      footerTip: {
        topic: '去文章列表',
        question: '关注话题',
        column: '去往专栏',
        live: '全部live'
      },
      isLoading: false,
      loadMore: '加载更多'
    };
  }

  showMack = () => {
    let that = this;
    that.setState({
      isShow: true,
      searchVal: ''
    });
  };
  showQuesMask = () => {
    let that = this;
    that.setState({
      isShowQues: true
    });
  };
  hideMask = () => {
    let that = this;
    that.setState({
      isShow: false
    });
  };
  hideQuesMask = () => {
    let that = this;
    that.setState({
      isShowQues: false
    });
  };
  searchTopic = evet => {
    let history = [];
    let that = this;
    Taro.getStorage({
      key: 'searchHistory',
      success: function(res) {
        that.setState({
          historyList: res.state.historyList
        });
      }
    });
    console.log('--- 存储搜索历史 ---');
    evet.detail.value &&
      that.state.historyList.indexOf(evet.detail.value) === -1 &&
      that.setState({
        historyList: that.state.historyList.concat(evet.detail.value)
      });
    Taro.setStorage({
      key: 'searchHistory',
      data: that.state.historyList
    });
    Taro.navigateTo({
      url: '../../pages/searchResult/searchResult?key=' + evet.detail.value,
      complete: function(res) {
        console.log(res, '跳转到搜索结果页');
        that.setState({
          isShow: false
        });
      }
    });
  };
  clearItem = event => {
    let that = this;
    // 获取当前点击的Index
    let index = event.target.dataset.index;
    that.state.historyList.splice(index, 1);
    console.log('删除成功:', that.state.historyList);
    that.setState({
      historyList: that.state.historyList
    });
    Taro.setStorage({
      key: 'searchHistory',
      data: that.state.historyList
    });
  };
  clearAll = event => {
    var that = this;
    Taro.removeStorage({
      key: 'searchHistory',
      success: function(res) {
        console.log(res, '清除成功');
      }
    });
    that.setState({
      historyList: []
    });
  };
  setActive = event => {
    let that = this;
    // 获取当前点击的index
    let index = event.target.dataset.index;
    // 初始化动画数据
    let animation = Taro.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      delay: 0
    });
    animation.left(index * 250 + 'rpx').step();
    // 设置动画
    that.setState({
      isActive: index,
      animationData: animation['export']() // 输出生成样式表
    });
  };
  // 获得关注列表API
  getFocusList = flag => {
    let that = this;
    api.http('focusListApi', {}, res => {
      if (res.errMsg) {
        util.showModel(res.errMsg);
      } else {
        that.setState({
          focusList: res.list
        });
        if (flag) {
          that.setState({
            focusList: res.list.concat(that.state.focusList) // 多个数组会返回新的数组
          });
          Taro.stopPullDownRefresh();
          Taro.hideNavigationBarLoading();
          util.showSuccess(res.list.length + '条新内容');
        }
      }
    });
  };
  getMorefocusList = () => {
    var that = this;
    that.setState({
      isLoading: true,
      loadMore: '正在加载...'
    });
    // 暂时不写
  };
  // 获得推荐列表API
  getRecommendList = flag => {
    console.log('flag:', flag);
    let that = this;
    api.http('recommendListApi', {}, res => {
      if (res.errMsg) {
        util.showModel(res.errMsg);
      } else {
        if (!flag) {
          that.setState({
            recList: res.list
          });
        }
        if (flag) {
          that.setState({
            recList: res.list.concat(that.state.recList)
          });
          console.log('---刷新推荐列表数据---');
          Taro.stopPullDownRefresh();
          Taro.hideNavigationBarLoading();
          util.showSuccess(res.list.length + '条新内容');
        }
      }
    });
  };
  goTitleDetail = event => {
    Taro.navigateTo({
      url:
        '../../pages/titleDetail/titleDetail?id=' +
        event.target.dataset.id +
        '&title=' +
        event.target.dataset.title
    });
  };
  goContentDetail = event => {
    Taro.navigateTo({
      url:
        '../../pages/contentDetail/contentDetail?id=' +
        event.target.dataset.id +
        '&title=' +
        event.target.dataset.title +
        '&avatar=' +
        event.target.dataset.avatar +
        '&comment=' +
        event.target.dataset.comment +
        '&content=' +
        event.target.dataset.content +
        '&like=' +
        event.target.dataset.like
    });
  };
  // 获取更多推荐列表
  getMoreRecList = () => {
    var that = this;
    that.setState({
      isLoading: true,
      loadMore: '正在加载...'
    });
    api.http('recommendListApi', {}, res => {
      !res.errMsg
        ? that.setState({
            recList: that.state.recList.concat(res.list)
          })
        : util.showModel(res.errMsg);
      console.log('---请求更多推荐列表数据---');
      that.setState({
        isLoading: false,
        loadMore: '加载更多'
      });
    });
  };
  // 获取热榜列表API
  getHotList = flag => {
    var that = this;
    api.http('hotListApi', {}, res => {
      if (res.errMsg) {
        util.showModel(res.errMsg);
      } else {
        if (!flag) {
          console.log('---设置数据---');
          that.setState({
            hotList: res.list
          });
        }
        console.log('---请求热门列表数据---');
        if (flag) {
          that.setState({
            hotList: res.list.concat(that.state.hotList)
          });
          console.log('---刷新热门列表数据---');
          Taro.stopPullDownRefresh();
          Taro.hideNavigationBarLoading();
          util.showSuccess(res.list.length + '条新内容');
        }
      }
    });
  };
  // 获取更多热榜列表
  getMoreHotList = () => {
    var that = this;
    that.setState({
      isLoading: true,
      loadMore: '正在加载...'
    });
    api.http('hotListApi', {}, res => {
      !res.errMsg
        ? that.setState({ hotList: that.state.hotList.concat(res.list) })
        : util.showModel(res.errMsg);
      console.log('---请求更多热门列表数据---');
      that.setState({
        isLoading: false,
        loadMore: '加载更多'
      });
    });
  };
  // 监听用户下拉动作
  onPullDownRefresh = () => {
    if (!this.state.isShow && !this.state.isShowQues) {
      Taro.showNavigationBarLoading();
      switch (+this.state.isActive) {
        case 1:
          this.getRecommendList(true);
          break;
        case 2:
          this.getHotList(true);
          break;
        default:
          return;
      }
    }
  };
  //页面上拉触底事件的处理函数
  onReachBottom = () => {
    if (!this.state.isShow && !this.state.isShowQues) {
      switch (+this.state.isActive) {
        case 1:
          this.getMoreRecList();
          break;
        case 2:
          this.getMoreHotList();
          break;
        default:
          return;
      }
    }
  };

  componentDidMount() {
    this.getFocusList();
    this.getRecommendList();
    this.getHotList();
  }

  config = {};

  render() {
    const {
      isShow,
      searchVal,
      historyList,
      isShowQues,
      isActive,
      animationData,
      id,
      focusList,
      isLoading,
      loadMore,
      recList,
      footerTip,
      hotList
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
        {/*  tab标题 begin   */}
        <View className="tab-wrap" onClick={this.setActive}>
          <View className={'tab-item ' + (isActive == 0 ? 'tab-item-active' : '')} data-index="0">
            关注
          </View>
          <View className={'tab-item ' + (isActive == 1 ? 'tab-item-active' : '')} data-index="1">
            推荐
          </View>
          <View className={'tab-item ' + (isActive == 2 ? 'tab-item-active' : '')} data-index="2">
            热榜
          </View>
          <View className="tab-item-line" animation={animationData} />
        </View>
        {/*  tab标题 end   */}
        {/*  tab选项内容begin   */}
        {/* 关注内容 */}
        <View className={'tab-content ' + (isActive == 0 ? 'show' : 'hide')}>
          {focusList.length > 0 && (
            <Block>
              {focusList.map((item, index) => {
                return (
                  <View className="tab-content-focus" key={index}>
                    <View className="content-category">
                      <Image className="category-avatar" src={item.avatar} />
                      <Text className="category-title">{item.category}</Text>
                    </View>
                  </View>
                );
              })}
            </Block>
          )}
          {focusList.length == 0 && (
            <View>
              <Image
                className="to-recommend-img"
                src={require('../../assets/images/to-recommend.png')}
              />
              <View className="to-recommend-title">还没关注的人</View>
              <View className="to-recommend-tip">去【推荐】看看吧</View>
            </View>
          )}
          {focusList.length != 0 && (
            <View className="load-more" onClick={this.getMorefocusList}>
              {isLoading && (
                <Image className="is-loading" src={require('../../assets/images/loading.gif')} />
              )}
              {loadMore}
            </View>
          )}
        </View>
        {/* 推荐内容 */}
        <View className={'tab-content ' + (isActive == 1 ? 'show' : 'hide')}>
          {recList.map((item, index) => {
            return (
              <View className="tab-content-recommend" key={index}>
                <View className="content-category">
                  <Image className="category-avatar" src={item.avatar} />
                  <Text className="category-title">{item.author}</Text>
                </View>
                <View
                  className="recommend-title"
                  data-id={item.id}
                  data-title={item.title}
                  onClick={this.goTitleDetail}>
                  {item.title}
                </View>
                <View
                  className="recommend-content"
                  data-id={item.id}
                  data-title={item.title}
                  data-avatar={item.avatar}
                  data-content={item.fineAnswer.content}
                  data-like={item.fineAnswer.like}
                  data-comment={item.fineAnswer.comment}
                  onClick={this.goContentDetail}>
                  {item.fineAnswer.content}
                </View>
                <View className="recommend-footer">
                  <View className="recommend-footer-text">
                    <Text>
                      {item.fineAnswer.like +
                        (item.from == 'live' ? '感兴趣' : '赞同') +
                        ' · ' +
                        item.fineAnswer.comment +
                        (item.from == 'live' ? '人参与' : '评论')}
                    </Text>
                    {item.from && <Text>{'· ' + footerTip[item.from]}</Text>}
                  </View>
                </View>
              </View>
            );
          })}
          <View className="load-more" onClick={this.getMoreRecList}>
            {isLoading && (
              <Image className="is-loading" src={require('../../assets/images/loading.gif')} />
            )}
            {loadMore}
          </View>
        </View>
        {/* 热榜内容 */}
        <View className={'tab-content ' + (isActive == 2 ? 'show' : 'hide')}>
          {hotList.map((item, index) => {
            return (
              <View className="tab-content-hot" key={index}>
                <Text className={'hot-index ' + (index < 3 ? 'hot-index-hot' : '')}>
                  {index + 1}
                </Text>
                <Text className="hot-title">{item.title}</Text>
                <Image className="hot-image" src={item.image} />
                <View className="hot-footer-text">
                  <Text>{item.comment + '回答 · ' + item.focus + '关注'}</Text>
                </View>
              </View>
            );
          })}
          <View className="load-more" onClick={this.getMoreHotList}>
            {isLoading && (
              <Image className="is-loading" src={require('../../assets/images/loading.gif')} />
            )}
            {loadMore}
          </View>
        </View>
        {/*  tab选项内容end   */}
      </View>
    );
  }
}

export default Index;
