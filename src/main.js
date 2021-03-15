import Vue from 'vue'
import vuescroll from 'vuescroll';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

import '@/assets/iconfont/iconfont.css'

import api from './api'
Vue.prototype.$api = api;

import App from './App.vue'
import router from './router'
import store from './store'
import routerBeforeEach from '@/router/beforeEach'

Vue.use(vuescroll); // install the vuescroll 
Vue.prototype.$vuescrollConfig = {
  vuescroll: {},
  scrollPanel: {
    scrollingX: false
  },
  rail: {},
  bar: {
    background: "#000000",
    opacity: "0.2",
    onlyShowBarOnScroll: false
  }
};

Vue.use(ElementUI);


Vue.config.productionTip = false

/* Router 全局前置守卫 */
router.beforeEach(routerBeforeEach)
router.afterEach((to,from,next) => {
  let scrollMain = document.getElementById('main-wrap');
  if(scrollMain) {
    document.getElementById('main-wrap').scrollTo(0, 0)
  }
});

import "../public/static/UE/ueditor.config";
import "../public/static/UE/ueditor.all";
import "../public/static/UE/lang/zh-cn/zh-cn";
import "../public/static/UE/ueditor.parse.min";

import UE from '@/components/ueditor'
Vue.use(UE);

// 解决vuex刷新数据丢失
// window.addEventListener("beforeunload", () => {
//   localStorage.setItem("xingchen_pc_stateInfo", JSON.stringify(store.state));
// });
// if (localStorage.getItem("xingchen_pc_stateInfo")) {
//   store.replaceState(
//     Object.assign(
//       {},
//       store.state,
//       JSON.parse(localStorage.getItem("xingchen_pc_stateInfo"))
//     )
//   );
// };
// localStorage.removeItem("xingchen_pc_stateInfo");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
