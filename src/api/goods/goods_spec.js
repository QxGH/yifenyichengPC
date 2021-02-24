import axios from '@/request/';

const goodsSpec = {
  getAttrList(formData) {
    // 属性组列表
    return axios({
      url: `products/attribute/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  createSpec(formData) {
    // 属性组创建
    return axios({
      url: `products/attribute/create`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  deleteSpec(formData) {
    // 属性值删除
    return axios({
      url: `products/attribute/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  specDetail(formData) {
    // 属性值详情
    return axios({
      url: `products/attribute/detail`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  specEdit(formData) {
    // 属性值创建
    return axios({
      url: `products/attribute/edit`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default goodsSpec;