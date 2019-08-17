import { action, delay } from '@/utils/index';
import { http } from '@/api/index';

export default {
  namespace: 'home',
  state: {
    focusList: [], //关注列表
    recList: [], //推荐列表
    hotList: [] //热榜列表
  },
  reducers: {
    save(state, { payload }) {
      //保存数据到state
      return { ...state, ...payload };
    }
  },
  effects: {
    *load({ payload }, { all, call, put }) {
      let { data } = yield call(http, {
        url: 'recommendListApi',
        data: {}
      });
      console.log(`effects:`, data);
      yield call(delay, 2000);
      yield put(action('save', { recList: data }));
    }
  }
};
