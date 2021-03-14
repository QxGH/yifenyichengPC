/*
 * @Description: 
 * @Date: 2021-01-20 18:08:37
 * @LastEditTime: 2021-02-24 11:20:57
 */
import Cookies from 'js-cookie'
import { getUserToken, clearCookie } from 'tools/Cookie'
import store from "@/store";
import Router from '@/router'

const befroeEach = (to, from, next) => {
  // console.log('befroeEach')
  // console.log(to)
  // let scrollMain = document.getElementById('main-wrap');
  // if(scrollMain) {
  //   document.getElementById('main-wrap').scrollTo(0, 0)
  // }
  
  let roles = [];

  let userToken = getUserToken();

  let whiteList = ['/403', '/404', '/login'];
  
  if(!userToken) {
    clearCookie();
    Router.push('/login');
  } else {
    next();
  };
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