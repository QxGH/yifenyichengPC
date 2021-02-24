import request from '@/request/index';

const verifier = {
  list(formData) {
    // 核销员列表
    return request({
      url: `mall/shop/verifier/info/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  save(formData) {
    // 新建 编辑 核销员
    return request({
      url: `mall/shop/verifier/manage/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  changeStatus(formData) {
    // 禁用 启用 核销员
    return request({
      url: `mall/shop/verifier/manage/status`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delUser(formData) {
    // 删除核销员
    return request({
      url: `mall/shop/verifier/manage/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData) {
    // 核销员详情
    return request({
      url: `mall/shop/verifier/info/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default verifier;