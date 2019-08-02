import { Block, View, Image, Text, Input, Textarea, ScrollView } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtActivityIndicator, AtLoadMore } from 'taro-ui';
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
      isActive: 1 /* tabs标签页 */,
      focusList: [],
      recList: [],
      hotList: [],
      footerTip: {
        topic: '去文章列表',
        question: '关注话题',
        column: '去往专栏',
        live: '全部live'
      },
      scrollY: true,
      // 拖动上下滚动
      dragStyle: {
        top: 0 + 'px'
        // bottom: 0 + 'px'
      },
      //下拉样式
      downPullStyle: {
        height: 0 + 'px'
      },
      downPullText: '下拉刷新',
      //上拉样式
      // upPullStyle: {
      //   height: 0 + 'px'
      // },
      // upPullText: '上拉加载更多',
      creState: {},
      pullState: 0, //刷新状态 0不做操作 1刷新 -1加载更多
      status: 'more'
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
  setActive = index => {
    let that = this;
    // 获取当前点击的index索引值
    that.setState({
      isActive: index
    });
  };
  // 还原初始设置
  reduction = () => {
    let time = 0.5;
    let that = this;
    that.setState({
      dragStyle: {
        top: 0 + 'px',
        // bottom: 0 + 'px',
        transition: `all ${time}s`
      },
      // upPullStyle: {
      //   height: 0 + 'px',
      //   transition: `all ${time}s`
      // },
      downPullStyle: {
        height: 0 + 'px',
        transition: `all ${time}s`
      },
      pullState: 0,
      scrollY: true
    });
    setTimeout(() => {
      that.setState({
        dragStyle: {
          top: 0 + 'px'
          // bottom: 0 + 'px'
        },
        // upPullStyle: {
        //   height: 0 + 'px'
        // },
        downPullStyle: {
          height: 0 + 'px'
        },
        downPullText: '下拉刷新',
        upPullText: '上拉加载更多'
      });
    }, time * 1000);
  };
  touchStart = e => {
    console.log(`touchStart`);
    let that = this;
    that.setState({
      creState: e.touches[0]
    });
  };
  touchMove = e => {
    console.log(`touchMove`);
    e.stopPropagation();
    let that = this;
    let move = e.touches[0]; //移动时的位置
    let deviationX = 0.3; //左右偏移量(超过这个偏移量不执行下拉操作)
    let deviationY = 70; //拉动长度（低于这个值的时候不执行）
    let maxY = 100; //拉动的最大高度

    let start_x = that.state.creState.clientX;
    let start_y = that.state.creState.clientY;
    let move_x = move.clientX;
    let move_y = move.clientY;

    //得到偏移数值
    let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
    //当偏移数值大于设置的偏移数值时则不执行操作
    if (dev < deviationX) {
      console.log(`下拉操作`, move_y - start_y);
      console.log(`上拉操作`, start_y - move_y);
      //拖动倍率
      let dragY = Math.abs(move_y - start_y) / 3.5;
      console.log(`dragY`, dragY);
      //下拉操作
      if (move_y - start_y > 0) {
        if (dragY >= deviationY) {
          this.setState({
            pullState: 1,
            downPullText: '释放刷新'
          });
        } else {
          this.setState({
            pullState: 0,
            downPullText: '下拉刷新'
          });
        }
        if (dragY >= maxY) {
          dragY = maxY;
        }
        this.setState({
          dragStyle: {
            top: dragY + 'px'
          },
          downPullStyle: {
            height: dragY + 'px'
          },
          scrollY: false
        });
      }
      // 上拉操作
      // if (start_y - move_y > 0) {
      //   if (dragY >= deviationY) {
      //     this.setState({
      //       pullState: -1,
      //       upPullText: '释放加载更多'
      //     });
      //   } else {
      //     this.setState({
      //       pullState: 0,
      //       upPullText: '上拉加载更多'
      //     });
      //   }
      //   if (dragY >= maxY) {
      //     dragY = maxY;
      //   }
      //   this.setState({
      //     dragStyle: {
      //       top: -dragY + 'px'
      //     },
      //     upPullStyle: {
      //       height: dragY + 'px'
      //     },
      //     scrollY: false
      //   });
      // }
    }
  };
  touchEnd = () => {
    console.log(`touchEnd`);
    let that = this;
    that.reduction();
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
  // 暂时写
  // getMorefocusList = () => {
  //   let that = this;
  //   that.setState({
  //     isLoading: true,
  //     loadMore: '正在加载...'
  //   });
  // };
  // 获得推荐列表API
  getRecommendList = flag => {
    // console.log('flag:', flag); //undefined
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

  // 获取更多推荐列表
  getMoreRecList = () => {
    let that = this;
    that.setState({
      status: 'loading'
    });
    setTimeout(() => {
      api.http('recommendListApi', {}, res => {
        !res.errorMsg
          ? that.setState({ recList: that.state.recList.concat(res.list) })
          : util.showModel(res.errMsg);
        that.setState({
          status: 'more'
        });
      });
    }, 500);
  };
  // 获取热榜列表API
  getHotList = flag => {
    // let that = this;
    // api.http('hotListApi', {}, res => {
    //   if (res.errMsg) {
    //     util.showModel(res.errMsg);
    //   } else {
    //     if (!flag) {
    //       console.log('---设置数据---');
    //       that.setState({ hotList: res.list });
    //     }
    //     if (flag) {
    //       that.setState({
    //         hotList: res.list.concat(that.state.hotList)
    //       });
    //       console.log('---刷新热门列表数据---');
    //       Taro.stopPullDownRefresh();
    //       Taro.hideNavigationBarLoading();
    //       util.showSuccess(res.list.length + '条新内容');
    //     }
    //   }
    // });
    console.log('滚动到顶部事件');
  };
  // 获取更多热榜列表
  getMoreHotList = () => {
    // let that = this;
    // that.setState({
    //   status: 'loading'
    // });
    // setTimeout(() => {
    //   api.http('hotListApi', {}, res => {
    //     !res.errorMsg
    //       ? that.setState({ hotList: that.state.hotList.concat(res.list) })
    //       : util.showModel(res.errMsg);
    //     that.setState({
    //       status: 'more'
    //     });
    //   });
    // }, 500);
    console.log('滚动到底部事件');
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
      focusList,
      recList,
      footerTip,
      hotList,
      scrollY,
      dragStyle,
      downPullStyle,
      downPullText
      // upPullStyle,
      // upPullText
    } = this.state;
    const tabList = [{ title: '关注' }, { title: '推荐' }, { title: '热榜' }];
    const upperThreshold = 50;
    const lowerThreshold = 50;
    const scrollAnimation = true;
    return (
      <View className="container">
        <View className="search-wrap">
          {/* 搜索栏 */}
          <View className="search-input" onClick={this.showMack}>
            <Image className="search-input-icon" src={require('../../assets/images/search.png')} />
            <Text className="search-input-text">搜索内容提问</Text>
          </View>
          {/* 提问 */}
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
        {/*  tabs标签页 begin   */}
        <AtTabs className="tab-wrap" current={isActive} tabList={tabList} onClick={this.setActive}>
          <AtTabsPane current={isActive} index={0}>
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
              {/* {focusList.length != 0 && (
                <View className="load-more" onClick={this.getMorefocusList}>
                  {isLoading && (
                    <Image
                      className="is-loading"
                      src={require('../../assets/images/loading.gif')}
                    />
                  )}
                  {loadMore}
                </View>
              )} */}
            </View>
          </AtTabsPane>
          {/* 推荐内容 */}
          <AtTabsPane current={isActive} index={1}>
            <ScrollView
              scrollY
              className={'tab-container ' + (isActive == 1 ? 'show' : 'hide')}
              upperThreshold={upperThreshold}
              lowerThreshold={lowerThreshold}
              onScrollToUpper={this.getRecommendList}
              onScrollToLower={this.getMoreRecList}
              scrollWithAnimation>
              <View className="tab-content">
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
              </View>
            </ScrollView>
          </AtTabsPane>
          {/* 热榜内容 */}
          <AtTabsPane current={isActive} index={2}>
            <View className="dragUpdatePage">
              <View className="downDragBox" style={downPullStyle}>
                <AtActivityIndicator content={downPullText}></AtActivityIndicator>
              </View>
              <ScrollView
                style={dragStyle}
                scrollY={scrollY}
                className={'tab-container ' + (isActive == 2 ? 'show' : 'hide')}
                onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd}
                upperThreshold={upperThreshold}
                lowerThreshold={lowerThreshold}
                onScrollToUpper={this.getHotList}
                onScrollToLower={this.onReachBottom}
                scrollWithAnimation={scrollAnimation}>
                <View className="tab-content">
                  {/* {hotList.map((item, index) => {
                  return (
                    <View className="at-row tab-content-hot" key={index}>
                      <View className="at-col at-col-1">
                        <Text className={'hot-index ' + (index < 3 ? 'hot-index-hot' : '')}>
                          {index + 1}
                        </Text>
                      </View>
                      <View className="at-col at-col-8 at-col--wrap">
                        <Text className="hot-title">{item.title}</Text>
                        <View className="hot-footer-text">
                          <Text>{item.comment + '回答 · ' + item.focus + '关注'}</Text>
                        </View>
                      </View>
                      <View className="at-col at-col-3">
                        <Image className="hot-image" src={item.image} />
                      </View>
                    </View>
                  );
                })} */}
                  <View style={{ backgroundColor: 'red', color: 'white', height: '30vh' }}>A</View>
                  <View style={{ backgroundColor: 'blue', color: 'white', height: '30vh' }}>B</View>
                  <View style={{ backgroundColor: 'green', color: 'white', height: '30vh' }}>
                    C
                  </View>
                  <View style={{ backgroundColor: 'orange', color: 'white', height: '30vh' }}>
                    D
                  </View>
                </View>
                <AtLoadMore
                  onClick={this.onReachBottom}
                  status={this.state.status}
                  moreText="查看数据"
                  loadingText="正在加载数据"
                  noMoreText="没有更多了"
                  noMoreTextStyle={{
                    boder: 'none'
                  }}
                  moreBtnStyle={{
                    boder: 'none'
                  }}
                />
              </ScrollView>
              {/* <View className="upDragBox" style={upPullStyle}>
                <AtActivityIndicator content={upPullText}></AtActivityIndicator>
              </View> */}
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

export default Index;
