/*
 * @Description: API接口
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-08-19 14:36:42
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-08-21 16:54:55
 */

// TODO：暂时不写searchResult这个API接口

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
