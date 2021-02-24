import request from '@/request/index';

const writeOff = {
  getDetails(formData) {
    // 核销订单详情
    return request({
      url: `orders/business/verDetail`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  writeOff(formData) {
    // 核销订单
    return request({
      url: `orders/business/verification`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  record(formData) {
    // 核销订单记录
    return request({
      url: `orders/business/verificationRecords`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default writeOff;