import request from '@/request/index';

const manage = {
  list(formData) {
    // 用户列表
    return request({
      url: `users/user/info/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  changeIntegral(formData) {
    // 改动积分
    return request({
      url: `users/fund/change/quick`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  userDetails(formData) {
    // 用户详情
    return request({
      url: `users/user/info/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  integralChangeList(formData) {
    // 用户积分变动详情
    return request({
      url: `users/fund/change/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default manage;