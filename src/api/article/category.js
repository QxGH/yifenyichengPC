import request from '@/request/index';

const category = {
  list(formData) {
    // 分类列表
    return request({
      url: `control/website/article/category/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  save(formData) {
    // 分类保存
    return request({
      url: `control/website/article/category/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  operation(formData) {
    // 分类操作
    return request({
      url: `control/website/article/category/operation`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default category;