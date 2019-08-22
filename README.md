<!--
 * @Description: my project
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-08-10 14:25:12
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-08-22 15:20:40
 -->

# zhihu-applet

[![GitHub stars](https://img.shields.io/github/stars/MoonCheung/zhihu-applet?style=flat-square)](https://github.com/MoonCheung/zhihu-applet/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/MoonCheung/zhihu-applet?style=flat-square)](https://github.com/MoonCheung/zhihu-applet/issues)
[![GitHub forks](https://img.shields.io/github/forks/MoonCheung/zhihu-applet?style=flat-square)](https://github.com/MoonCheung/zhihu-applet/network)
[![GitHub license](https://img.shields.io/github/license/MoonCheung/zhihu-applet?style=flat-square)](https://github.com/MoonCheung/zhihu-applet/blob/master/LICENSE)

该仿知乎小程序基于 `Taro` + `Taro-UI` 进行构建应用程序开发 <br/>
该仿知乎小程序的 API 接口数据来自 Mock 服务器([yapi](https://hellosean1025.github.io/yapi/))部署后能运行,而且页面代码来自[微信仿知乎小程序](https://github.com/gxt19940130/demos/tree/master/weChatApp)

## 项目技术栈

前端技术: Taro + Taro-router
UI 组件库: Taro-ui
前端脚手架: Taro-cli

该项目采用前后端分离技术，前端使用 Taro 二次开发来自 React 框架，暂时不使用相关状态管理，而且 API 接口从 Mock 服务器获取返回数据得到渲染，方便项目配置以及代码管理

## 实现功能

### 首页: 主要功能

- [x] 顶部切换标签页
- [x] 自定义下拉刷新
- [x] 触底上拉加载更多
- [x] 可复用搜索栏组件

### 想法: 主要功能

- [x] 顶部轮播图
- [x] 单个及全部关注
- [x] 滑动 tab 条吸顶
- [x] 文字超出被折叠

### 市场: 主要功能

- [x] 顶部轮播图
- [x] 横向滑动图片列表
- [x] 触底上拉加载更多

### 消息: 主要功能

- [x] 滑动列表 tab 条吸顶
- [x] 从 Mock 返回假数据排版

### 我的: 主要功能

- [x] 从 Mock 返回假数据排版

## 执行命令

### installing

```bash
# 克隆项目
git clone https://github.com/MoonCheung/zhihu-applet.git

# 进入目录
cd zhihu-applet

# 执行yarn命令会进行安装
yarn
```

### Run the application

```bash
# 指定平台的开发时构建微信小程序
yarn dev:weapp

# 指定平台的打包构建
yarn build:weapp
```

> Demo 用于学习交流, 喜欢的话，请点击`Star` ,转载请注明出处
