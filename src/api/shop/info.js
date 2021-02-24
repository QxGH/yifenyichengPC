import request from '@/request/index';

const info = {
  infoDetails(formData) {
    // 店铺详情
    return request({
      url: `mall/basic/info/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  basicUpdate(formData) {
    // 店铺详情数据更新
    return request({
      url: `mall/basic/manage/basicUpdate`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default info;