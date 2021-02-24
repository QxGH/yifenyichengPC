import request from '@/request/index';

const list = {
  getList(formData) {
    // 订单列表
    return request({
      url: `orders/business/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  exportList(formData) {
    // 订单列表导出
    return request({
      url: `orders/business/lists`,
      method: 'get',
      source: 'base',
      params: formData
    });
  },
  details(formData) {
    // 订单详情
    return request({
      url: `orders/business/detail`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  marketDetails(formData) {
    // 供货市场 订单详情
    return request({
      url: `market/orders/detail`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default list;