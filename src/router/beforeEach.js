/*
 * @Description: 
 * @Date: 2021-01-20 18:08:37
 * @LastEditTime: 2021-02-24 11:20:57
 */
import { getUserToken, clearCookie } from 'tools/Cookie'

const befroeEach = (to, from, next) => {
  // console.log('befroeEach')
  // console.log(to)
  // let scrollMain = document.getElementById('main-wrap');
  // if(scrollMain) {
  //   document.getElementById('main-wrap').scrollTo(0, 0)
  // }
  

  let userToken = getUserToken();

  let whiteList = ['/404', '/login']; // 白名单不需要 token
  if (whiteList.indexOf(to.path) != -1) {
    next();
  } else if(!userToken) {
    clearCookie();
    next('/login');
  } else {
    next();
  };
};


export default befroeEach;