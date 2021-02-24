import request from '@/request/index';

const download = {
  list(formData) {
    // 下载管理列表
    return request({
      url: `mall/explorer/download/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delete(formData) {
    // 下载管理 删除
    return request({
      url: `mall/explorer/download/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default download;