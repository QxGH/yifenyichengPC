import axios from '@/request/';

const goodsCategory = {
  categoryList(formData) {
    // 分类表
    return axios({
      url: `products/category/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  categorySubList(formData) {
    // 子分类列表
    return axios({
      url: `products/subclass/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  categoryCreate(formData) {
    // 分类创建
    return axios({
      url: `products/category/create`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  categoryEdit(formData) {
    // 分类编辑
    return axios({
      url: `products/category/edit`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  categoryChildEdit(formData) {
    // 分类编辑
    return axios({
      url: `products/subclass/edit`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  childCategoryCreate(formData) {
    // 子分类创建
    return axios({
      url: `products/subclass/create`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  categoryDel(formData) {
    // 分类删除
    return axios({
      url: `products/category/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  childCategoryDel(formData) {
    // 分类删除
    return axios({
      url: `products/subclass/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  categoryDetails(formData) {
    // 分类详情
    return axios({
      url: `products/category/detail`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  categoryChildDetails(formData) {
    // 分类详情
    return axios({
      url: `products/subclass/detail`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default goodsCategory;