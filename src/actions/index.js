/*
 * @Description: 派发单个函数
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-08-19 17:03:54
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-08-19 23:39:44
 */

import { action } from '@/utils/index';

export const fetchFocus = payload => action('main/fetchFocus', payload);

export const fetchRec = payload => action('main/fetchRec', payload);

export const fetchHot = payload => action('main/fetchHot', payload);
