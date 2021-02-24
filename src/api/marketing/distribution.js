import request from '@/request/index';

const distribution = {
  settingDetails(formData) {
    // 分销配置详情
    return request({
      url: `marketing/distribution/setting/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  settingSave(formData) {
    // 分销配置保存
    return request({
      url: `marketing/distribution/setting/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  saveApply(formData) {
    // 分销员招募设置存储
    return request({
      url: `marketing/distribution/setting/saveApply`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  distributorList(formData) {
    // 分销员列表
    return request({
      url: `marketing/distribution/distributor/manage/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  distributorDetails(formData) {
    // 分销员详情
    return request({
      url: `marketing/distribution/distributor/info/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  customerLists(formData) {
    // 分销员详情 - 绑定客户列表
    return request({
      url: `marketing/distribution/distributor/info/customerLists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  subLists(formData) {
    // 分销员详情 - 下级列表
    return request({
      url: `marketing/distribution/distributor/info/distributorLists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  searchDistributor(formData) {
    // 分销员详情 - 搜索分销员
    return request({
      url: `marketing/distribution/distributor/info/distributorByPhone`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  changeSuperior(formData){
    // 分销员 上级修改
    return request({
      url: `marketing/distribution/distributor/manage/userSuperiorModify`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  operation(formData){
    // 分销员 操作（禁启用、清退）
    return request({
      url: `marketing/distribution/distributor/manage/operation`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  goodsSettingSave(formData) {
    // 分销商品设置 保存
    return request({
      url: `marketing/distribution/setting/activityProductSave`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  goodsSettingDetails(formData) {
    // 分销商品设置 详情
    return request({
      url: `marketing/distribution/setting/activityProductItems`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getDistributionAddGoods(formData) {
    // 可添加 分销商品  列表
    return request({
      url: `marketing/distribution/product/optionalList`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  addDistributionGoods(formData) {
    // 添加 分销商品
    return request({
      url: `marketing/distribution/product/add`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delDistributionGoods(formData) {
    // 删除 分销商品
    return request({
      url: `marketing/distribution/product/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getDistributionGoods(formData) {
    // 分销商品列表
    return request({
      url: `marketing/distribution/product/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  setRebateRatio(formData) {
    // 设置返佣级别 提成
    return request({
      url: `marketing/distribution/product/setRebateRatio`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  auditList(formData) {
    // 分销员审核列表
    return request({
      url: `marketing/distribution/distributor/audit/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  auditOperation(formData) {
    // 分销员审核列表  审核操作
    return request({
      url: `marketing/distribution/distributor/audit/operation`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  saveProduct(formData) {
    // 存储（新上架商品自动参与分销状态）
    return request({
      url: `marketing/distribution/setting/saveProduct`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  auditCount(formData) {
    // 存储（分销员 - 未审核分销员数量
    return request({
      url: `marketing/distribution/distributor/audit/count`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  performanceOrder(formData) {
    // 详情 -  收益订单
    return request({
      url: `marketing/distribution/rebate/performance/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getWxacode(formData) {
    // 获取小程序码
    return request({
      url: `marketing/distribution/setting/wxacode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getQrcode(formData) {
    // 获取二维码
    return request({
      url: `marketing/distribution/setting/qrcode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  achievementList(formData) {
    // 业绩报表
    return request({
      url: `marketing/distribution/distributor/manage/performance`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  withdrawList(formData) {
    // 提现报表
    return request({
      url: `marketing/distribution/distributor/withdraw/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  agreePay(formData) {
    // 同意提现
    return request({
      url: `marketing/distribution/distributor/withdraw/agreePay`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  sendBack(formData) {
    // 拒绝提现
    return request({
      url: `marketing/distribution/distributor/withdraw/sendBack`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  saveDistributorLevel(formData) {
    // 分销员等级配置
    return request({
      url: `marketing/distribution/setting/saveDistributorLevel`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getDistributorLevel(formData) {
    // 获取分销员等级
    return request({
      url: `marketing/distribution/setting/distributorLevel`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default distribution;