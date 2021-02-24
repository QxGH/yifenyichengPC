import request from '@/request/index';

const goods = {
  goodsList(formData) {
    // 活动商品列表
    return request({
      url: `marketing/activity/product/instance/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  createGoods(formData) {
    // 关联活动商品
    return request({
      url: `marketing/activity/product/instance/create`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  editGoods(formData) {
    // 编辑关联活动商品
    return request({
      url: `marketing/activity/product/instance/edit`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delGoods(formData) {
    // 删除活动商品
    return request({
      url: `marketing/livePlayer/goods/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  refreshGoods(formData) {
    // 刷新活动商品
    return request({
      url: `marketing/livePlayer/goods/refreshState`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  submitAudit(formData) {
    // 活动商品提交审核
    return request({
      url: `marketing/livePlayer/goods/submitAudit`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  resetAudit(formData) {
    // 活动商品撤回审核
    return request({
      url: `marketing/livePlayer/goods/resetAudit`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  liveGoodsList(formData) {
    // 通过审核得商品
    return request({
      url: `marketing/livePlayer/goods/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  addGoods(formData) {
    // 关联通过审核得商品
    return request({
      url: `marketing/livePlayer/room/addGoods`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  goodsIdLists(formData) {
    // 已关联通过审核得商品
    return request({
      url: `marketing/livePlayer/room/goodsIdLists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default goods;