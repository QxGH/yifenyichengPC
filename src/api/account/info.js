import request from '@/request/index';

const info = {
  infoDetails(formData) {
    // 账号详情
    return request({
      url: `business/account/info/details`,
      method: 'post',
      source: 'base',
      data: formData,
      tokenType: 'user'
    });
  },
  platformDetails(formData) {
    // 平台详情
    return request({
      url: `mall/basic/info/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default info;