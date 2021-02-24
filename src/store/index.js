/*
 * @Description: 
 * @Date: 2021-01-20 18:08:37
 * @LastEditTime: 2021-02-02 14:53:25
 */
import Vue from 'vue'
import Vuex from 'vuex'
import modulesCommon from './modules/common'
import modulesRegion from './modules/region'

Vue.use(Vuex)

const state = {
  requestSource: 'pc',
  shopInfo: null,
  userInfo: null,
  domainURL: process.env.VUE_APP_MODE == 'prod' ? 'xingchen.cn' : process.env.VUE_APP_MODE == 'test' ? 'test.xingchen.cn' : 'localhost',
  iframeURL: process.env.VUE_APP_MODE == 'prod' ? 'xingchen.cn' : 'test.xingchen.cn',
  serviceQrcodeImage: {}, // 首页用 客服二维码 核销端二维码
  hasDownlaod: false, // 下载管理新增下载
};
const mutations = {
  CHANGE_SHOP_INFO(state, val) {
    state.shopInfo = val;
  },
  CHANGE_USER_INFO(state, val) {
    state.userInfo = val;
  },
  CHANGE_SERVICE_QRCODE_IMAGE(state, val) {
    state.serviceQrcodeImage = val;
  },
  CHANGE_DOWNLOAD_STATUS(state, val) {
    state.hasDownlaod = val;
  }
};
const actions = {};

export default new Vuex.Store({
  modules: {
    modulesCommon,
    modulesRegion
  },
  state,
  mutations,
  actions
})
