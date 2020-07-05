import Taro from '@tarojs/taro';
import {
  Block,
  View,
  Image,
  Text,
  ScrollView,
  Swiper,
  SwiperItem,
  Navigator
} from '@tarojs/components';
import { getDiscusstData, getRecFocusData, getRecHotData } from '@/api/index';
import { showSuccess } from '@/utils/index';
import { AtAvatar } from 'taro-ui';
import './findMore.scss';

class FindMore extends Taro.Component {
  // 构造器函数
  constructor() {
    super(...arguments);
    this.state = {
      indicatorDots: false,
      autoplay: true,
      circular: true,
      interval: 5000,
      duration: 200 /* 以上轮播滑块视图 */,
      discussList: [],
      recFocusList: [],
      focusList: [],
      hotFocusList: [],
      recHotList: [],
      showIndex: [],
      scrollTop: 0
    };
  }

  // 获取讨论列表API
  getDiscussList = () => {
    let that = this;
    getDiscusstData()
      .then(res => {
        if (res.errorMsg == '0') {
          that.setState({
            discussList: res.discussList || []
          });
        }
      })
      .catch(err => {
        console.error(`请求接口失败:`, err);
      });
  };
  // 获取推荐关注列表API
  getRecFocusList = () => {
    let that = this;
    getRecFocusData()
      .then(res => {
        if (res.errorMsg == '0') {
          that.setState({
            recFocusList: res.recFocusList || []
          });
        }
      })
      .catch(err => {
        console.error(`请求接口失败:`, err);
      });
  };

  // 单个关注方法
  focusIt = event => {
    let that = this;
    let index = event.target.dataset.index;
    that.state.focusList[index] = !that.state.focusList[index];
    that.setState({
      focusList: that.state.focusList
    });
    showSuccess('关注成功');
  };

  // 全部关注方法
  focusAll = () => {
    let that = this;
    const query = Taro.createSelectorQuery();
    query
      .selectAll('.find-focus-btn')
      .boundingClientRect(function(rects) {
        rects.forEach(function(rect) {
          let index = rect.dataset.index;
          that.state.focusList[index] = !that.state.focusList[index];
          that.setState({
            focusList: that.state.focusList
          });
          showSuccess('关注成功');
        });
      })
      .exec();
  };

  // 单个热榜关注方法
  hotFocus = event => {
    let that = this;
    let index = event.target.dataset.index;
    that.state.hotFocusList[index] = !that.state.hotFocusList[index];
    that.setState({
      hotFocusList: that.state.hotFocusList
    });
    showSuccess('关注成功');
  };

  // 获取推荐热门列表API
  getRecHotList = () => {
    let that = this;
    getRecHotData()
      .then(res => {
        if (res.errorMsg == '0') {
          that.setState({
            recHotList: res.hotList || []
          });
        }
      })
      .catch(err => {
        console.error(`请求接口失败:`, err);
      });
  };
  toggleShow = event => {
    let that = this;
    let index = event.target.dataset.index;
    that.state.showIndex[index] = !that.state.showIndex[index];
    that.setState({
      showIndex: that.state.showIndex
    });
  };

  // componentWillMount(options = this.$router.params || {}) {}

  componentDidMount() {
    this.getDiscussList();
    this.getRecFocusList();
    this.getRecHotList();
  }

  onScroll = event => {
    let that = this;
    that.setState({
      scrollTop: event.detail.scrollTop
    });
  };
  onPullDownRefresh = () => {
    Taro.stopPullDownRefresh();
  };
  onReachBottom = () => {};

  config = {
    navigationBarTitleText: '想法'
  };

  render() {
    const {
      indicatorDots,
      autoplay,
      circular,
      interval,
      duration,
      discussList,
      recFocusList,
      focusList,
      scrollTop,
      recHotList,
      hotFocusList,
      showIndex
    } = this.state;
    return (
      <Block>
        <View className="find-header-wrap">
          <AtAvatar
            className="find-userinfo-avatar"
            circle
            size="small"
            openData={{ type: 'userAvatarUrl' }}></AtAvatar>
          <Navigator url="/pages/index/index" open-type="switchTab">
            <Text className="find-header-rec">推荐</Text>
          </Navigator>
        </View>
        <ScrollView className="scroll-view" scrollY onScroll={this.onScroll}>
          <Swiper
            className="find-swiper-wrap"
            indicatorDots={indicatorDots}
            autoplay={autoplay}
            circular={circular}
            interval={interval}
            duration={duration}>
            {discussList.map((item, index) => (
              <Block key={index}>
                <SwiperItem className="find-swiper">
                  <View className="find-swiper-item">
                    <View className="find-swiper-dis">
                      消息提示:
                      <Text className="find-swiper-number">{item.number + '人正在讨论'}</Text>
                    </View>
                    <View className="find-swiper-title">{item.title}</View>
                    <View className="find-swiper-tip">{item.tip}</View>
                    <Image className="find-swiper-img" src={item.image} />
                  </View>
                </SwiperItem>
              </Block>
            ))}
          </Swiper>
          {/*  关注列表   */}
          <View className="find-focus-list">
            <View className="find-focus-title">关注有趣的人，收货更多好想法</View>
            {recFocusList.map((item, index) => (
              <View className="find-focus-item" key={index.id}>
                <Image className="find-focus-avatar" src={item.avatar} />
                <View className={'find-focus-info ' + (index === 3 ? 'last' : '')}>
                  <Text className="find-focus-nickname">{item.nickname}</Text>
                  <View className="find-icon-wrap">
                    {item.bestAnswer && (
                      <Image
                        className="find-focus-icon find-icon-best"
                        src={require('../../assets/images/best-icon.png')}
                      />
                    )}
                    {item.auth && (
                      <Image
                        className="find-focus-icon find-icon-auth"
                        src={require('../../assets/images/auth-icon.png')}
                      />
                    )}
                  </View>
                  <View className="find-focus-introduce">{item.introduce}</View>
                  {!focusList[index] && (
                    <View className="find-focus-btn" data-index={index} onClick={this.focusIt}>
                      关注
                    </View>
                  )}
                  {focusList[index] && (
                    <View className="find-focus-btn has-focus" data-index={index}>
                      已关注
                    </View>
                  )}
                </View>
              </View>
            ))}
            <View className="find-focus-control">
              <View className="find-focus-button find-focus-refresh" onClick={this.getRecFocusList}>
                换一批
              </View>
              <View className="find-focus-button find-focus-all" onClick={this.focusAll}>
                全部关注
              </View>
            </View>
          </View>
          {/*  关注列表end   */}
          {/*  最近热门  */}
          <View className="find-hot-list">
            {scrollTop >= 460 && (
              <View className="find-hot-header fixed">
                <View className="find-hot-title">最新热门</View>
              </View>
            )}
            <View className="find-hot-header">
              <View className="find-hot-title">最新热门</View>
            </View>
            {recHotList.map((item, index) => (
              <View className="find-hot-item" key={index.id}>
                <Image className="find-hot-avatar" src={item.avatar} />
                <View className="find-hot-info">
                  <Text className="find-focus-nickname find-hot-nickname">{item.nickname}</Text>
                  <View className="find-icon-wrap">
                    {item.bestAnswer && (
                      <Image
                        className="find-focus-icon find-icon-best"
                        src={require('../../assets/images/best-icon.png')}
                      />
                    )}
                    {item.auth && (
                      <Image
                        className="find-focus-icon find-icon-auth"
                        src={require('../../assets/images/auth-icon.png')}
                      />
                    )}
                  </View>
                  <View className="find-focus-introduce">{'发布于' + item.time}</View>
                  {!hotFocusList[index] && (
                    <View className="find-hot-btn" data-index={index} onClick={this.hotFocus}>
                      关注
                    </View>
                  )}
                  {hotFocusList[index] && (
                    <View className="find-hot-btn has-focus" data-index={index}>
                      已关注
                    </View>
                  )}
                  <View className="find-control-more">
                    <Image
                      className="find-control-image"
                      src={require('../../assets/images/more-control.png')}
                    />
                  </View>
                </View>
                <View className={'find-hot-content ' + (!showIndex[index] ? 'text-overflow' : '')}>
                  {item.content}
                </View>
                {!showIndex[index] && (
                  <View className="find-show-all" data-index={index} onClick={this.toggleShow}>
                    展开全文
                  </View>
                )}
                {showIndex[index] && (
                  <View className="find-show-all" data-index={index} onClick={this.toggleShow}>
                    收起全文
                  </View>
                )}
                <View className="find-hot-footer">
                  <Image
                    className="find-hot-img"
                    src={require('../../assets/images/forward.png')}
                  />
                  <Text className="find-hot-text">{item.forward}</Text>
                  <Image
                    className="find-hot-img"
                    src={require('../../assets/images/comment.png')}
                  />
                  <Text className="find-hot-text">{item.comment}</Text>
                  <Image className="find-hot-img" src={require('../../assets/images/praise.png')} />
                  <Text className="find-hot-text">{item.praise}</Text>
                </View>
              </View>
            ))}
          </View>
          <View className="find-footer">
            看看我们为您推荐的内容吧(づ￣3￣)づ╭❤
            <Navigator url="/pages/index/index" open-type="switchTab">
              <View className="find-footer-btn">立即查看</View>
            </Navigator>
          </View>
          {/*  最近热门end  */}
        </ScrollView>
        {/*  </view>   */}
      </Block>
    );
  }
}

export default FindMore;
