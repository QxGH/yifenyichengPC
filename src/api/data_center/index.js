import request from '@/request/index';

const dataCenter = {
  // 快速搭建平台
  start(formData) {
    return request({
      url: `dataCenter/standard/basic/start`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  platform(formData) {
    // 平台数据
    return request({
      url: `dataCenter/standard/basic/platform`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  remind(formData) {
    // 重要提醒
    return request({
      url: `dataCenter/standard/basic/remind`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  defaultImage(formData) {
    // 默认图片 核销端小程序
    return request({
      url: `mall/basic/info/defaultImage`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default dataCenter;