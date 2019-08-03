module.exports = {
  output: 'api',
  template: 'axios',
  projects: [
    {
      id: '59127536acb959185b0c62b9',
      name: 'mock', // 生成到 api/mock 目录下
      white: [
        '/focusList',
        '/titleDetail',
        '/messageList',
        '/marketList',
        '/recHotList',
        '/recFocusList',
        '/discusstList',
        '/userList',
        '/recommendList',
        '/hotList'
      ]
    }
  ]
};
