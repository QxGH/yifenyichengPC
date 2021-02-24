import request from '@/request/index';

const bulkDelivery = {
  batchShip(formData) {
    // 上传批量发货
    return request({
      url: `orders/business/batchShip`,
      method: 'post',
      source: 'base',
      data: formData,
      secret: false
    });
  },
  batchShipLists(formData) {
    // 批量发货记录
    return request({
      url: `orders/business/batchShipLists`,
      method: 'post',
      source: 'base',
      data: formData,
      secret: false
    });
  }
}

export default bulkDelivery;