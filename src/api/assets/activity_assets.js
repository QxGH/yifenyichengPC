import request from '@/request/index';

const activityAssets = {
  acountDetails(formData) {
    // 账号资产详情
    return request({
      url: `fund/activityAccount/account/info`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  assetsList(formData) {
    // 入账 出账列表
    return request({
      url: `fund/activityAccount/record/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  recharge(formData) {
    // 充值 发起
    return request({
      url: `fund/activityAccount/recharge`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  rechargeDetails(formData) {
    // 充值 发起后 详情
    return request({ 
      url: `fund/activityAccount/recharge/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  rechargeSettingDetails(formData) {
    // 充值手续费 详情
    return request({
      url: `fund/setting/system/info`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default activityAssets;