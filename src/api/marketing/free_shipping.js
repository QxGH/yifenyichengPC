import request from '@/request/index';

const freeShipping = {
  list(formData) {
    // 满包邮 列表
    return request({
      url: `marketing/freeShipping/info/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  save(formData) {
    // 满包邮 保存
    return request({
      url: `marketing/freeShipping/manage/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delete(formData) {
    // 满包邮 删除
    return request({
      url: `marketing/freeShipping/manage/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData) {
    // 满包邮 详情
    return request({
      url: `marketing/freeShipping/info/detail`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default freeShipping;