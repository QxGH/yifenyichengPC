import axios from '@/request/';

const base = {
  save(formData) {
    // 商品设置、订单设置、用户协议设置 储存
    return axios({
      url: `mall/basic/setting/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData) {
    // 商品设置、订单设置、用户协议设置 获取
    return axios({
      url: `mall/basic/setting/get`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default base;