import request from '@/request/index';

const message = {
  rules(formData) {
    // 充值规则
    return request({
      url: `message/sms/recharge/rules`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  recharge(formData) {
    // 发起充值
    return request({
      url: `message/sms/recharge`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  info(formData) {
    // 详情
    return request({
      url: `message/sms/account/info`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  list(formData) {
    // 记录列表
    return request({
      url: `message/sms/recharge/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  signModify(formData) {
    // 修改签名
    return request({
      url: `message/sms/account/signModify`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  mallPhoneModify(formData) {
    // 修改手机号
    return request({
      url: `message/sms/account/mallPhoneModify`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  tableRule(formData) {
    // table list
    return request({
      url: `message/rule`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  tableRuleSwitch(formData) {
    // 状态切换
    return request({
      url: `message/rule/switch`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  threshold(formData) {
    // 阈值调整
    return request({
      url: `message/rule/threshold`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default message;