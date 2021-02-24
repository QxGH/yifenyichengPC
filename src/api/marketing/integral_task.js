import request from '@/request/index';

const integralTask = {
  details(formData) {
    // 详情
    return request({
      url: `marketing/integralTask/setting/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  save(formData) {
    // 详情
    return request({
      url: `marketing/integralTask/setting/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default integralTask;