const base = 'https://mock.ikmoons.com/mock/11/applet';
const api = {
  // 关注列表API
  focusListApi: {
    development: `${base}/focusList`
  },
  // 推荐列表API
  recommendListApi: {
    development: `${base}/recommendList`
  },
  // 热榜列表API
  hotListApi: {
    development: `${base}/hotList`
  },
  // 没找到
  // searchApi: {
  //   development: `${base}/zhixiaohu/home/searchResult`
  // },
  // 用户列表API
  userListApi: {
    development: `${base}/userList`
  },
  // 讨论列表API
  discussListApi: {
    development: `${base}/discusstList`
  },
  // 推荐关注列表API
  recFocusListApi: {
    development: `${base}/recFocusList`
  },
  // 推荐热门列表API
  recHotListApi: {
    development: `${base}/recHotList`
  },
  // 市场列表API
  marketListApi: {
    development: `${base}/marketList`
  },
  // 用户消息列表API
  messageListApi: {
    development: `${base}/messageList`
  },
  // 详情列表API
  titleDetailApi: {
    development: `${base}/titleDetail`
  }
};

module.exports = api;
