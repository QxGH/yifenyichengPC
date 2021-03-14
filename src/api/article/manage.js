import request from '@/request/index';

const manage = {
  list(formData) {
    // 文章列表
    return request({
      url: `control/website/article/article/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  save(formData) {
    // 文章保存
    return request({
      url: `control/website/article/article/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData) {
    // 文章详情
    return request({
      url: `control/website/article/article/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  operation(formData) {
    // 文章操作
    return request({
      url: `control/website/article/article/operation`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default manage;