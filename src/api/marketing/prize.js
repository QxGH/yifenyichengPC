import request from '@/request/index';

const prize = {
  lists(formData) {
    // 活动奖品 列表
    return request({
      url: `interaction/prize/info/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  edit(formData) {
    // 活动奖品 编辑
    return request({
      url: `interaction/prize/info/edit`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delete(formData) {
    // 活动奖品 删除
    return request({
      url: `interaction/prize/info/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  updateStock(formData) {
    // 活动奖品 修改库存
    return request({
      url: `interaction/prize/info/updateStock`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  updateField(formData) {
    // 活动奖品 修改奖品信息： 图片 名字
    return request({
      url: `interaction/prize/info/updateField`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  updateArea(formData) {
    // 活动奖品 修改区域
    return request({
      url: `interaction/prize/info/updateAreaSet`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  updateStatus(formData) {
    // 活动奖品 是否启用
    return request({
      url: `interaction/prize/info/updateUseful`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  productLists(formData) {
    // 活动奖品 商品库商品列表
    return request({
      url: `interaction/prize/productList/productLists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  virtualLists(formData) {
    // 活动奖品 跃程虚拟商品列表
    return request({
      url: `interaction/prize/productList/virtualLists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  marketLists(formData) {
    // 活动奖品 供货市场商品列表
    return request({
      url: `interaction/prize/productList/marketLists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default prize;