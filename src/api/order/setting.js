import request from '@/request/index';

const setting = {
  addAddress(formData) {
    // 添加退货地址
    return request({
      url: `orders/refund/addressMaintain`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  addressList(formData) {
    // 退货地址 list
    return request({
      url: `orders/refund/addressLists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delAddress(formData) {
    // 退货地址 删除
    return request({
      url: `orders/refund/addressDelete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  setDefaultAddress(formData) {
    // 退货地址 删除
    return request({
      url: `orders/refund/setDefault`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default setting;