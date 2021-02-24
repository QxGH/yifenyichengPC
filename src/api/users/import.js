import request from '@/request/index';

const userImport = {
  list(formData) {
    // 导入列表
    return request({
      url: `users/user/import/batch/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  import(formData) {
    // 导入
    return request({
      url: `users/user/import/batch`,
      method: 'post',
      source: 'base',
      data: formData,
      secret: false
    });
  },
  details(formData) {
    // 导入
    return request({
      url: `users/user/import/batch/rows`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  deleteBatch(formData) {
    // 删除批次
    return request({
      url: `users/user/import/batch/batchDelete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  deleteRecord(formData) {
    // 删除记录
    return request({
      url: `users/user/import/batch/rowDelete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default userImport;