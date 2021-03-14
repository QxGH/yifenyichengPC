import request from '@/request/index';

const banner = {
  list(formData) {
    // 轮播列表
    return request({
      url: `control/website/carousel/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData) {
    // 轮播详情
    return request({
      url: `control/website/carousel/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  save(formData) {
    // 轮播保存
    return request({
      url: `control/website/carousel/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  status(formData) {
    // 轮播 status
    return request({
      url: `control/website/carousel/status`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delete(formData) {
    // 轮播 delete
    return request({
      url: `control/website/carousel/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default banner;