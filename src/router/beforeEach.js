/*
 * @Description: 
 * @Date: 2021-01-20 18:08:37
 * @LastEditTime: 2021-02-24 11:20:57
 */
import Cookies from 'js-cookie'
import { getUserToken, getUserRole, getStoreToken, clearCookie } from 'tools/Cookie'
import store from "@/store";

const toPlatform_ = () => {
  let domainURL = store.state.domainURL;
  Cookies.remove('storeInfo', { path: '/', domain: domainURL });
  Cookies.remove("storeToken", { path: "/", domain: domainURL });
  let link;
  if(process.env.VUE_APP_MODE == 'test') {
    link = 'http://'+domainURL + '/platform'
  } else {
    link = 'http://'+domainURL + '/#/platform'
  };
  window.location.href = link;
  console.log('toPlatform_')
}

const befroeEach = (to, from, next) => {
  // console.log('befroeEach')
  // console.log(to)
  // let scrollMain = document.getElementById('main-wrap');
  // if(scrollMain) {
  //   document.getElementById('main-wrap').scrollTo(0, 0)
  // }
  
  let roles = getUserRole().roles;
  if(!roles) {
    toPlatform_();
  };
  let userToken = getUserToken();

  let whiteList = ['/403', '/404', '/login'];
  let toIndexPath = ['/', '/home']; // 不需要 role
  
  if (whiteList.indexOf(to.path) != -1) {
    next();
  } else if (userToken) {
    let storeToken = getStoreToken();
    if (storeToken) {
      if (to.meta.roles.length == 0 || arrHas(to.meta.roles, roles) || toIndexPath.indexOf(to.path) != -1) {
        // 判断路由权限
        next();
      } else {
        next('/404')
      }
    } else {
      toPlatform_();
    }
  } else {
    clearCookie();
    let domainURL = store.state.domainURL;
    let link;
    if(process.env.VUE_APP_MODE == 'test') {
      link = 'http://'+domainURL + '/login'
    } else {
      link = 'http://'+domainURL + '/#/login'
    };
    window.location.href = link;  
  }
};

const arrHas = (roles, userRoles) => {
  if(!userRoles) {
    return false;
  };
  for (let item of roles) {
    if (userRoles.includes(item)) {
      return true
    }
  }
  return false
}

export default befroeEach;