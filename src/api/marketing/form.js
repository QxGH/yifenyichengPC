import request from '@/request/index';

const form = {
  save(formData) {
    // 表单 保存
    return request({
      url: `marketing/form/form/post`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }, 
  list(formData) {
    // 表单 列表
    return request({
      url: `marketing/form/form/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delete(formData) {
    // 表单 删除
    return request({
      url: `marketing/form/form/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData) {
    // 表单 详情
    return request({
      url: `marketing/form/form/detail`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  data(formData) {
    // 表单 数据
    return request({
      url: `marketing/form/form/getFormUserElems`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getWxacode(formData) {
    // 获取小程序码
    return request({
      url: `marketing/form/info/wxacode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getQrcode(formData) {
    // 获取二维码
    return request({
      url: `marketing/form/info/qrcode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default form;