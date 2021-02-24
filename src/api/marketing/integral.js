import request from '@/request/index';

const integral = {
  addGoods(formData) {
    // 添加商品
    return request({
      url: `marketing/livePlayer/room/create`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  integralGoodsLists(formData) {
    // 积分商品列表
    return request({
      url: `marketing/activity/product/information/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  deleteGoods(formData) {
    // 删除活动商品
    return request({
      url: `marketing/activity/product/instance/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  save(formData) {
    // 储存活动
    return request({
      url: `marketing/integralMall/setting/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData) {
    // 储存活动
    return request({
      url: `marketing/integralMall/setting/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  goodsDetails(formData) {
    // 获取二维码
    return request({
      url: `marketing/activity/product/information/detail`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getWxacode(formData) {
    // 获取微信路径
    return request({
      url: `marketing/integralMall/setting/wxacode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getQrcode(formData) {
    // 获取H5路径
    return request({
      url: `marketing/integralMall/setting/qrcode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  setIntegralAlias(formData) {
    // 设置积分别名
    return request({
      url: `marketing/integralMall/setting/setIntegralAlias`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  setIntegralDate(formData) {
    // 设置积分过期时间
    return request({
      url: `marketing/integralMall/setting/setExpireDate`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default integral;