/*
 * @Description: 
 * @Date: 2021-01-13 10:55:13
 * @LastEditTime: 2021-02-04 18:03:50
 */
import Cookies from 'js-cookie'
import { AesDecrypt } from './Crypto'
import store from '@/store'

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IiIsImF1ZCI6ImxvY2FsaG9zdCIsImp0aSI6IiJ9.eyJpc3MiOiIiLCJhdWQiOiJsb2NhbGhvc3QiLCJqdGkiOiIiLCJpYXQiOjE1OTI3OTcwMTYsIm5iZiI6MTU5Mjc5NzAxNiwiZXhwIjoxNTkzNDAxODE2LCJyb2xlIjoiYnVzaW5lc3MiLCJiaWQiOjEsImJ0b2tlbiI6ImI2NzhhMTQwYjFiZjkwNWRlNjkwNTc1ZmMyMGM3OTZlIiwibmFtZSI6Im1hc3RlciIsInBob25lIjoiMTM4MDAwMDAwMDAiLCJydW5uaW5nTW9kZSI6ImRldmVsb3AifQ.bnJZxhToIixhsFmwGcp4tqgwILFm6cwtd-vIU4CZzNw';
const userRoles = 'I4Fg5kU8zOsLuraQqTUdHP75seZPaukeSoefCyTG91kRIhohvAqesNhC9fU7KLdPfoqUJk7OgkBPXMUNTGx/cP4yIYe9m7c0e7c3yn7hOrg7WHiPGWQR5grYGKDvdeL0Z81S8asGGYaDKLrBDQScYoeNuI+7Zh6BXYkAZOu35p4=';
const storeToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IiIsImF1ZCI6InhpbmdjaGVuLmNuIiwianRpIjoiIn0.eyJpc3MiOiIiLCJhdWQiOiJ4aW5nY2hlbi5jbiIsImp0aSI6IiIsImlhdCI6MTYwNTgzODQ2NiwibmJmIjoxNjA1ODM4NDY2LCJleHAiOjE2MzcyODgwNjYsInJvbGUiOiJidXNpbmVzcyIsImJpZCI6MSwiYnRva2VuIjoiYjY3OGExNDBiMWJmOTA1ZGU2OTA1NzVmYzIwYzc5NmUiLCJuYW1lIjoibWFzdGVyIiwicGhvbmUiOiIxMzgwMDAwMDAwMCIsInJ1bm5pbmdNb2RlIjoiZGV2ZWxvcCIsInNwZWNpYWxQZXJtaXNzaW9uIjp0cnVlLCJpbmR1c3RyeUlkIjoxLCJtaWQiOjEsIm10b2tlbiI6ImQzM2NlYmExOWUwZWMyNmFhMWI5YjExZjMyMWMxMDEzIiwiY3VycmVudEJ0b2tlbiI6ImI2NzhhMTQwYjFiZjkwNWRlNjkwNTc1ZmMyMGM3OTZlIiwiaXNPd25lciI6dHJ1ZSwicm9sZXMiOlsibWFzdGVyIl0sInN3aXRjaFRpbWUiOjE2MDU4Mzg0NjgsInNvdXJjZSI6InBjIn0.oesPFDyhcGRpjAYt1o6M2sgdKQEHSXkLKLoVsThN7PQ';
// const storeToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IiIsImF1ZCI6InhpbmdjaGVuLmNuIiwianRpIjoiIn0.eyJpc3MiOiIiLCJhdWQiOiJ4aW5nY2hlbi5jbiIsImp0aSI6IiIsImlhdCI6MTYxMjM0MTI5NiwibmJmIjoxNjEyMzQxMjk2LCJleHAiOjE2MTI5NDYwOTYsInJvbGUiOiJidXNpbmVzcyIsImJpZCI6MiwiYnRva2VuIjoiOTY5MmVmZDIxN2I3ODVkYzdkYTY1YjE3Y2JhZTJiYzQiLCJuYW1lIjoiMTc2OTEzNDg0NTkiLCJwaG9uZSI6IjE3NjkxMzQ4NDU5IiwicnVubmluZ01vZGUiOiJkZXZlbG9wIiwiaW5kdXN0cnlJZCI6MSwibWlkIjoyLCJtdG9rZW4iOiI5Yzk4N2ZjMGZiNjJiMTk5MjFlMmIyMTZhOGQ3Yzk0ZiIsImN1cnJlbnRCdG9rZW4iOiI5NjkyZWZkMjE3Yjc4NWRjN2RhNjViMTdjYmFlMmJjNCIsImlzT3duZXIiOnRydWUsInJvbGVzIjpbIm1hc3RlciJdLCJzd2l0Y2hUaW1lIjoxNjEyMzQxMjk4LCJzb3VyY2UiOiJwYyJ9.LjB7ytgZoaiiokpGrFeatRb2smbpR5Ee4Sif1F2y_1I'
const userPriority = {"priority":true,"priorityType":1,"function":{"product":{"setting":{"userProductHomeButtonConfig":true}},"marketing":{"coupon":true},"mall":{"setting":{"application":true}},"interaction":{"common":{"item":{"status":true},"prize":{"third":true}}}}};

// 获取 token
const getUserToken = () => {
  let token = Cookies.get('userToken');
  if(token) {
    // 有 token 直接返回
    return token;
  } else {
    // 开发模式
    if (process.env.VUE_APP_MODE == 'dev') {
      return userToken;
    };
    return ''
  };
}

// 获取 角色权限
const getUserRole = () => {
  let roles = Cookies.get('userRoles');
  // 开发模式 
  if (process.env.VUE_APP_MODE == 'dev') {
    roles = userRoles;
  };
  
  if (roles) {
    return JSON.parse(AesDecrypt(roles, true))
  } else {
    if (process.env.VUE_APP_MODE != 'dev') {
      return ['master'];
    } else {
      return []
    }
  }
}

// 获取用户的信息
const getUserInfo = () => {
  return Cookies.getJSON('userInfo') || '';
}

// 获取店铺信息
const getStoreInfo = () => {
  return Cookies.getJSON('storeInfo') || '';
}

const getStoreToken = () => {
  let token = Cookies.getJSON('storeToken');
  if(token) {
    return token;
  } else {
    // 开发模式
    if (process.env.VUE_APP_MODE == 'dev') {
      return storeToken;
    };
    return ''
  };
}

const getChromeVersionNoTips = () => {
  if (process.env.VUE_APP_MODE == 'dev') {
    return 1;
  };
  return Cookies.getJSON('chromeVersionNoTips') || '';
};

const getPriority = () => {
  if (process.env.VUE_APP_MODE == 'dev') {
    return userPriority;
  };
  return Cookies.getJSON('priority') || '';
}

// 清除cookie信息
const clearCookie = () => {
  Cookies.remove('userToken', { path: '/', domain: store.state.domainURL });
  Cookies.remove('userRoles', { path: '/', domain: store.state.domainURL });
  Cookies.remove('userInfo', { path: '/', domain: store.state.domainURL });
  Cookies.remove('storeInfo', { path: '/', domain: store.state.domainURL });
  Cookies.remove('storeToken', { path: '/',domain: store.state.domainURL });
  Cookies.remove('chromeVersionNoTips', { path: '/',domain: store.state.domainURL });
  Cookies.remove('priority', { path: '/',domain: store.state.domainURL });
  localStorage.removeItem('xc_user_info');
  localStorage.removeItem('xc_shop_info');
  localStorage.removeItem('noTipAppletsSetting');
}

export {
  getUserToken,
  getUserRole,
  getUserInfo,
  getStoreInfo,
  clearCookie,
  getStoreToken,
  getChromeVersionNoTips,
  getPriority
}