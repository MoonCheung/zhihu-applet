/*
 * @Description: API接口
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-08-19 14:36:42
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-08-20 22:03:30
 */

import api from './api.config';

// 关注列表API
export function getFocusData() {
  return api.post({
    url: '/focusList'
  });
}

// 推荐列表API
export function getRcmdData() {
  return api.post({
    url: '/recommendList'
  });
}

// 热榜列表API
export function getHotData() {
  return api.post({
    url: '/hotList'
  });
}

// 用户列表API
export function getUserData() {
  return api.post({
    url: '/userList'
  });
}

// 讨论列表API
export function getDiscusstData() {
  return api.post({
    url: '/discusstList'
  });
}

// 推荐关注列表API
export function getRecFocusData() {
  return api.post({
    url: '/recFocusList'
  });
}

// 推荐热门列表API
export function getRecHotData() {
  return api.post({
    url: '/recHotList'
  });
}

// 市场列表API
export function getMarketData() {
  return api.post({
    url: '/marketList'
  });
}

// 用户消息列表API
export function getMessageData() {
  return api.post({
    url: '/messageList'
  });
}

// 详情列表API
export function getTitleDetlData() {
  return api.post({
    url: '/titleDetail'
  });
}

// const api = {
//   // 关注列表API
//   focusListApi: `${BASE}/focusList`,
//   // 推荐列表API
//   recommendListApi: `${BASE}/recommendList`,
//   // 热榜列表API
//   hotListApi: `${BASE}/hotList`,
//   // 没找到
//   // searchApi:`${BASE}/zhixiaohu/home/searchResult`,
//   // 用户列表API
//   userListApi: `${BASE}/userList`,
//   // 讨论列表API
//   discussListApi: `${BASE}/discusstList`,
//   // 推荐关注列表API
//   recFocusListApi: `${BASE}/recFocusList`,
//   // 推荐热门列表API
//   recHotListApi: `${BASE}/recHotList`,
//   // 市场列表API
//   marketListApi: `${BASE}/marketList`,
//   // 用户消息列表API
//   messageListApi: `${BASE}/messageList`,
//   // 详情列表API
//   titleDetailApi: `${BASE}/titleDetail`
// };
