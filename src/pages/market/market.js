import {
  Block,
  View,
  Image,
  Text,
  Input,
  Swiper,
  SwiperItem,
  ScrollView
} from '@tarojs/components';
import { AtRate } from 'taro-ui';
import Taro from '@tarojs/taro';
import util from '@/utils/index';
import api from '@/api/index';
import './market.scss';

class Market extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      indicatorDots: false,
      autoplay: true,
      circular: true,
      interval: 5000,
      duration: 500 /* 以上滑块视图容器 */,
      bannerList: [],
      iconList: [],
      adInfo: {},
      newsList: [],
      lessonList: [],
      partList: [],
      specialList: [],
      bookList: [],
      scrollBanner: [],
      guessList: [] /* 以上数据接口 */,
      scoreList: [0, 1, 2, 3, 4] /* 评分星星 */
    };
  }

  // 获取市场列表API
  getMarketList = () => {
    let that = this;
    api.http('marketListApi', {}, res => {
      if (res.errMsg) {
        util.showModel(res.errMsg);
      } else {
        console.log('---请求市场列表---');
        that.setState({
          bannerList: res.bannerList || [],
          iconList: res.iconList || [],
          adInfo: res.adInfo || {},
          newsList: res.newsList || [],
          lessonList: res.lessonList || [],
          partList: res.partList || [],
          specialList: res.specialList || [],
          bookList: res.bookList || [],
          scrollBanner: res.scrollBanner || [],
          guessList: res.guessList || []
        });
      }
    });
  };
  getMoreMarketList = () => {
    let that = this;
    that.state.guessList.length < 50 &&
      api.http('marketListApi', {}, res => {
        !res.errMsg
          ? that.setState({
              guessList: that.state.guessList.concat(res.guessList)
            })
          : util.showModel(res.errMsg);
      });
  };

  componentWillMount(options = this.$router.params || {}) {}

  componentDidMount() {
    this.getMarketList();
  }

  componentDidShow() {}

  onPullDownRefresh = () => {
    Taro.stopPullDownRefresh();
  };
  onReachBottom = () => {
    this.getMoreMarketList();
  };
  onShareAppMessage = () => {};
  config = {
    navigationBarTitleText: '市场'
  };

  render() {
    const {
      isShow,
      searchVal,
      historyList,
      indicatorDots,
      circular,
      autoplay,
      interval,
      duration,
      bannerList,
      iconList,
      adInfo,
      newsList,
      lessonList,
      partList,
      specialList,
      bookList,
      scrollBanner,
      guessList,
      scoreList
    } = this.state;
    return (
      <View className="container">
        <View className="search-wrap">
          <View className="search-input" onClick={this.showMack}>
            <Image className="search-input-icon" src={require('../../assets/images/search.png')} />
            <Text className="search-input-text">搜索内容提问</Text>
          </View>
          <View className="search-button">
            <Image
              className="search-button-icon"
              src={require('../../assets/images/message.png')}
            />
          </View>
        </View>
        {/*  隐藏搜索或者提问蒙层  */}
        {/* <View className={'search-mask ' + (isShow ? 'show' : 'hide')}>
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
                  <View className="search-item" key={index}>
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
        </View> */}
        {/*  搜索end  */}
        {/*  滑块视图容器   */}
        <Swiper
          className="market-swiper-wrap"
          indicatorDots={indicatorDots}
          circular={circular}
          autoplay={autoplay}
          interval={interval}
          duration={duration}>
          {bannerList.map((item, index) => {
            return (
              <Block key={index}>
                <SwiperItem className="market-swiper">
                  <View className="market-swiper-item">
                    <Image src={item.src} className="market-swiper-img" />
                  </View>
                </SwiperItem>
              </Block>
            );
          })}
        </Swiper>
        {/*  滑块视图容器end   */}
        {/*  icon图标列表   */}
        <View className="market-icon-list">
          {iconList.map((item, index) => {
            return (
              <View className="market-icon-item" key={index}>
                <Image className="market-icon-img" src={item.icon} />
                <View className="market-icon-text">{item.title}</View>
              </View>
            );
          })}
        </View>
        {/*  banner广告  */}
        <View className="market-ad">
          <Image className="market-ad-img" src={adInfo.src} />
        </View>
        {/*  新闻列表   */}
        <View className="market-news-list">
          <View className="market-news-header">每日新知</View>
          {newsList.map((item, index) => {
            return (
              <View className="market-news-item" key={item.id}>
                <Image className="market-news-icon" src={require('../../assets/images/play.png')} />
                <View className="market-news-title">{item.keyword + ' : ' + item.title}</View>
                <View className="market-news-time">{item.time}</View>
              </View>
            );
          })}
          <View className="market-news-footer">
            <View className="market-news-btn">
              <Image
                className="market-news-img"
                src={require('../../assets/images/play-color.png')}
              />
              <View className="market-news-text">免费播放全部</View>
            </View>
            <View className="market-news-more">查看更多>></View>
          </View>
        </View>
        {/*  私家课视频   */}
        <View className="market-video">
          <View className="market-video-header">
            <Image className="market-video-icon" src={require('../../assets/images/video.png')} />
            <View className="market-video-text">私家课</View>
          </View>
          <View className="market-video-list">
            {lessonList.map(item => {
              return (
                <View className="market-video-item" key={item.id}>
                  <Image className="market-video-img" src={item.image} />
                  <View className="market-video-area">
                    <View className="market-video-title">{item.title}</View>
                    <View className="market-video-into">{item.nickname}</View>
                    <View className="market-video-price">
                      {item.time.toFixed(1) + '小时 ' + item.speak + '讲 ' + '¥' + item.price}
                    </View>
                  </View>
                  <View className="market-video-play">
                    <Image
                      className="market-play-btn"
                      src={require('../../assets/images/video-circle.png')}
                    />
                    <View className="market-play-text">试听</View>
                  </View>
                </View>
              );
            })}
          </View>
          <View className="market-vidoe-footer">查看更多>></View>
        </View>
        {/*  部分广告   */}
        <View className="market-part">
          <View className="market-part-left">
            <View className="market-part-title">{partList[0].title}</View>
            <Image className="market-part-img" src={partList[0].image} />
          </View>
          <View className="market-part-right">
            <View className="market-part-top">
              <View className="market-part-text">
                <View className="market-part-title">{partList[1].title}</View>
                <View className="market-part-tip">{partList[1].tip}</View>
              </View>
              <Image className="market-part-img" src={partList[1].image} />
            </View>
            <View className="market-part-bottom">
              <View className="market-part-text">
                <View className="market-part-title">{partList[2].title}</View>
                <View className="market-part-tip">{partList[2].tip}</View>
              </View>
              <Image className="market-part-img" src={partList[2].image} />
            </View>
          </View>
        </View>
        {/*  课程特邀嘉宾   */}
        <View className="market-lesson">
          <View className="market-lesson-header">
            <Image
              className="market-lesson-icon"
              src={require('../../assets/images/file-header.png')}
            />
            <View className="market-lesson-text">课程 · 特邀嘉宾</View>
          </View>
          <View className="market-lesson-list">
            {specialList.map(item => {
              return (
                <View className="market-lesson-item" key={item.id}>
                  <Image className="market-lesson-image" src={item.image} />
                  <View className="market-lesson-info">
                    <View className="market-lesson-title">{item.title}</View>
                    <View className="market-lesson-nickname">{item.nickname}</View>
                    <View className="market-lesson-actprice">{'¥' + item.price * 0.5}</View>
                    <View className="market-lesson-price">{'¥' + item.price}</View>
                  </View>
                </View>
              );
            })}
            <View className="market-lesson-more">查看更多>></View>
          </View>
        </View>
        {/*  新书抢先看  */}
        <View className="market-book">
          <View className="market-book-header">
            <Image className="market-book-icon" src={require('../../assets/images/book.png')} />
            <View className="market-book-text">新书抢先看</View>
          </View>
          <View className="market-book-list">
            {bookList.map(item => {
              return (
                <View className="market-book-item" key={item.id}>
                  <Image className="market-book-img" src={item.image} />
                  <View className="market-book-name">{item.name}</View>
                  <View className="market-book-actprice">{'¥' + item.price * 0.5}</View>
                  <View className="market-book-price">{'¥' + item.price}</View>
                </View>
              );
            })}
            <View className="market-book-more">查看更多>></View>
          </View>
        </View>
        {/*  滚动视图banner  */}
        <View className="market-banner">
          <ScrollView className="market-scroll-view" scrollX="true">
            {scrollBanner.map(item => {
              return (
                <View
                  className={
                    'market-banner-item ' + (index == scrollBanner.length - 1 ? 'last-item' : '')
                  }
                  key={item.id}>
                  <Image className="market-banner-img" src={item.src} />
                </View>
              );
            })}
          </ScrollView>
        </View>
        {/*  猜您喜欢   */}
        <View className="market-guess">
          <View className="market-guess-header">
            <Image className="market-guess-icon" src={require('../../assets/images/guess.png')} />
            <View className="market-guess-text">猜您喜欢</View>
          </View>
          <View className="market-guess-list">
            {guessList.map(item => {
              return (
                <View className="market-guess-item" key={item.id}>
                  <View className="market-guess-info">
                    <View className="market-guess-title">{item.title}</View>
                    <View className="market-guess-nickname">{item.nickname}</View>
                    {(item.bestAnswer || item.auth) && (
                      <View className="market-guess-wrap">
                        {item.bestAnswer && (
                          <Image
                            className="market-info-icon market-icon-best"
                            src={require('../../assets/images/best-icon.png')}
                          />
                        )}
                        {item.auth && (
                          <Image
                            className="market-info-icon market-icon-auth"
                            src={require('../../assets/images/auth-icon.png')}
                          />
                        )}
                      </View>
                    )}
                    {/* 星星评价 */}
                    <View className="market-guess-number">
                      <Text decode={true}>&nbsp;{item.number + '人参与'}</Text>
                    </View>
                    <View className="market-guess-score">
                      <AtRate className="market-score-item" size="15" value={item.score} />
                      <View className="market-guess-price">{'¥' + item.price}</View>
                    </View>
                  </View>
                  {/* TODO: 该标签删除 */}
                  <Image className="market-guess-img" src={item.image} />
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}

export default Market;
