import request from '@/request/index';

const helpCenter = {
  articeList(formData) {
    // 文字列表
    return request({
      url: `college/help/article/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getPageQuestion(formData) {
    // 当前页面问题
    return request({
      url: `college/help/pageRelation/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  cateList(formData) {
    // 分类列表
    return request({
      url: `college/help/category/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default helpCenter;