import request from '@/request/index';

const coupons = {
  saveCoupons(formData, edit) {
    // 创建优惠券
    return request({
      url: edit ? `marketing/coupon/coupon/updateCoupon` : `marketing/coupon/coupon/create`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData, edit) {
    // 优惠券详情
    return request({
      url: `marketing/coupon/coupon/edit`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  couponsList(formData) {
    // 优惠券列表
    return request({
      url: `marketing/coupon/coupon/businessCouponsList`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  deleteCoupons(formData) {
    // 删除
    return request({
      url: `marketing/coupon/coupon/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  endCoupons(formData) {
    // 结束优惠券
    return request({
      url: `marketing/coupon/coupon/end`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getQrcode(formData) {
    // 获取H5推广码
    return request({
      url: `marketing/coupon/info/qrcode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getWxacode(formData) {
    // 获取H5推广码
    return request({
      url: `marketing/coupon/info/wxacode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default coupons;