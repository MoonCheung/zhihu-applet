import Taro from '@tarojs/taro';
import { getFocusData, getRcmdData, getHotData } from '@/api/index';
import { action } from '@/utils/index';
import api from '@/api/api.config';

export default {
  namespace: 'main',
  state: {
    focusList: [], //关注列表
    recList: [], //推荐列表
    hotList: [] //热榜列表
  },
  reducers: {
    getFocusList(state, { payload }) {
      const { focusList } = payload;
      return {
        ...state,
        focusList
      };
    },
    getRecList(state, { payload }) {
      const { recList } = payload;
      return {
        ...state,
        recList
      };
    },
    getRecMore(state, { payload }) {
      const { recMore } = payload;
      const recList = state.recList.concat(recMore);
      console.log(`getRecMore:`, recList);
      return {
        ...state,
        ...payload
      };
    },
    getHotList(state, { payload }) {
      const { hotList } = payload;
      return {
        ...state,
        hotList
      };
    }
  },
  effects: {
    *fetchFocus({ payload }, { call, put }) {
      try {
        const { flag } = payload;
        const result = yield call(getFocusData);
        if (result.errorMsg === 0) {
          if (!flag) {
            let data = result.list;
            yield put(action('getFocusList', { focusList: data }));
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    *fetchRec({ payload }, { call, put }) {
      try {
        const { flag } = payload;
        const result = yield call(getRcmdData);
        if (result.errorMsg === 0) {
          if (!flag) {
            let data = result.list;
            yield put(action('getRecList', { recList: data }));
          }
          // let dataMore = result.list;
          // yield put(action('getRecMore', { recMore: dataMore }));
        }
      } catch (err) {
        console.error(err);
      }
    },
    *fetchHot({ payload }, { call, put }) {
      try {
        const { flag } = payload;
        const result = yield call(getHotData);
        if (result.errorMsg === 0) {
          if (!flag) {
            let data = result.list;
            yield put(action('getHotList', { hotList: data }));
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
};
