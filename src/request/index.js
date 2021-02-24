/*
 * @Description: 
 * @Date: 2021-01-20 18:08:37
 * @LastEditTime: 2021-01-28 16:53:21
 */
// 请求
import axios from 'axios'
import store from 'store'
import { MessageBox, Message } from 'element-ui'
import requestUrl from './requestUrl'
import { AesDecrypt, AesEncrypt } from '@/tools/Crypto'

import {
  getUserToken,
  getStoreToken,
  clearCookie
} from 'tools/Cookie'

const service = axios.create({
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// request interceptor
service.interceptors.request.use(config => {
  config.method = config.method ? config.method : 'get';
  switch (config.method.toLowerCase()) {
    case 'get':
      config.params.source = store.state.requestSource;
      break;
    case 'post':
      config.data.source = store.state.requestSource;
      if (false !== config.secret) config.data = { encrypt: AesEncrypt(JSON.stringify(config.data)) };
      break;
    default:
  };

  config.headers.token = getStoreToken();


  //判断baseURL
  if (config.source === 'base') {
    config.baseURL = requestUrl.baseUrl
  } else if (config.source === 'tools') {
    config.baseURL = requestUrl.toolsUrl
  } else {
    config.baseURL = requestUrl.baseUrl
  };
  return config;
}, error => {
  return Promise.reject(error)
})

// request interceptor
service.interceptors.response.use(response => {
  if (response.status === 200) {
    if (response.data.code == 10001 || response.data.code == 10002 || response.data.code == 10003 || response.data.code == 10004 || response.data.code == 10007) {
      // MessageBox({
      //   title: '提示',
      //   message: '用户授权失败！',
      //   type: 'error',
      //   confirmButtonText: '确定',
      //   callback: action => {
          
      //   }
      // });
      clearCookie();
      let domainURL = store.state.domainURL;
      let link;
      if(process.env.VUE_APP_MODE == 'test') {
        link = 'http://'+domainURL + '/login'
      } else {
        link = 'http://'+domainURL + '/#/login'
      };
      window.location.href = link;
    } else {
      let resData = response.data.data;
      if (resData && resData.hasOwnProperty('encrypt')) {
        let decodeData = JSON.parse(AesDecrypt(resData.encrypt));
        response.data.data = decodeData;
      };
      return Promise.resolve(response)
    }
  } else {
    return Promise.reject(response)
  }
}, error => {
  let errMsg = '网络繁忙，请刷新重试！'
  if(String(error).indexOf('timeout') != '-1') {
    errMsg = '请求超时！'
  };
  if(error.response && error.response.status == 503) {
    errMsg = '哎呀，操作太频繁啦!'
  };
  Message.error(errMsg);
  return Promise.reject(error)
})

export default service
