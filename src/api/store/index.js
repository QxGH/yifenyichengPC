import request from '@/request/index';

const message = {
  list(formData) {
    // 门店列表
    return request({
      url: `control/website/shop/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  save(formData) {
    // 门店存储
    return request({
      url: `control/website/shop/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData) {
    // 门店详情
    return request({
      url: `control/website/shop/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  status(formData) {
    // 门店状态
    return request({
      url: `control/website/shop/status`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delete(formData) {
    // 门店删除
    return request({
      url: `control/website/shop/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default message;