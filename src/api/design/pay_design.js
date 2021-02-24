import axios from '@/request/';

const paySetting = {
  details(formData) {
    // 支付详情
    return axios({
      url: `payments/channel/wechat/config/details`,
      method: 'post',
      source: 'tools',
      data: formData
    });
  },
  save(formData) {
    // 支付配置
    return axios({
      url: `payments/channel/wechat/config/save`,
      method: 'post',
      source: 'tools',
      data: formData,
      secret: false
    });
  },
  setMethods(formData) {
    // 支付配置 开关
    return axios({
      url: `payments/channel/basic/setMethod`,
      method: 'post',
      source: 'tools',
      data: formData,
      secret: false
    });
  },
  methodsDetails(formData) {
    // 支付配置 开关 详情
    return axios({
      url: `payments/channel/basic/details`,
      method: 'post',
      source: 'tools',
      data: formData,
      secret: false
    });
  }
}

export default paySetting;