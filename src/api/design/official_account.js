/*
 * @Description: 
 * @Date: 2021-01-04 11:05:56
 * @LastEditTime: 2021-01-15 15:34:21
 */
import axios from '@/request/';

const officialAccount = {
  officialAccountAuth(formData) {
    // 公众号授权
    return axios({
      url: `mall/channel/officialAccount/auth`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  unbind(formData) {
    // 接除公众号授权
    return axios({
      url: `mall/channel/officialAccount/relieveAuth`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  officialAccountList(formData) {
    // 微信公众号列表
    return axios({
      url: `mall/channel/officialAccount/minor/info/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  officialAccountRelieve(formData) {
    // 微信公众号 解除授权
    return axios({
      url: `mall/channel/officialAccount/minor/auth/relieve`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  officialAccountBindUrl(formData) {
    // 微信公众号授权地址
    return axios({
      url: `mall/channel/officialAccount/minor/auth/jumpUrl`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  refreshAuth(formData) {
    // 微信服务号 刷新授权
    return axios({
      url: `mall/channel/officialAccount/authInfoRefresh`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  refreshPublicAccount(formData) {
    // 微信公众号 刷新授权
    return axios({
      url: `mall/channel/officialAccount/minor/auth/refresh`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  
}

export default officialAccount;