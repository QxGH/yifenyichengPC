import request from '@/request/index';

const virtualOrder = {
  getList(formData) {
    // 虚拟直充列表
    return request({
      url: `orders/business/rechargeList`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData) {
    // 虚拟直充详情
    return request({
      url: `orders/business/detail`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }

  // orders/business/detail
}

export default virtualOrder;