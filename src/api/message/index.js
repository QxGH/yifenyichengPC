import request from '@/request/index';

const message = {
  list(formData) {
    // 文章列表
    return request({
      url: `control/website/message/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  operation(formData) {
    // 留言操作
    return request({
      url: `control/website/message/operation`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default message;