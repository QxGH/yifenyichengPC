import request from '@/request/index';

const area = {
  info(formData) {
    // 优先权
    return request({
      url: `basic/address/pcas/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default area;