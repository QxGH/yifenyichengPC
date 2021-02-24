import request from '@/request/index';

const deliver = {
  logistics(formData) {
    // 物流公司
    return request({
      url: `basic/express/express/index`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  index(formData) {
    // 订单发货
    return request({
      url: `orders/business/ship`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }, 
  refund(formData) {
    // 订单退款
    return request({
      url: `orders/business/refund`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  agreeRefundGoods(formData) {
    // 物流订单 退货退款
    return request({
      url: `orders/refund/agreeRefundGoods`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  confirmRefundGoods(formData) {
    // 确认已收货并退款 
    return request({
      url: `orders/refund/businessOptions`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  refusedRefund(formData) {
    // 拒绝退款
    return request({
      url: `orders/refund/refusedRefund`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default deliver;