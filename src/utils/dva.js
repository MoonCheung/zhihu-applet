import { create } from 'dva-core';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';

let app;
let store;
let dispatch;

function createApp(opt) {
  // 在 action 被 dispatch 时触发，用于注册 redux 中间件。
  opt.onAction = [createLogger()];
  app = create(opt);
  // 配置 hooks 或者注册插件。
  app.use(createLoading({}));

  if (!global.registered) opt.models.forEach(model => app.model(model));
  global.registered = true;

  // 启动应用
  app.start();
  // 实例化 store
  store = app._store;
  // 获取store存储状态
  app.getStore = () => store;

  // 派发给每个函数
  dispatch = store.dispatch;
  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  }
};
