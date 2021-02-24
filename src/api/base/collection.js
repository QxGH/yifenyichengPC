import request from '@/request/index';

const collection = {
  collectionArticle(formData) {
    // 采集微信文章
    return request({
      url: `basic/collection/article`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  collectionState(formData) {
    // 采集微信文章 状态
    return request({
      url: `basic/collection/article/status`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default collection;