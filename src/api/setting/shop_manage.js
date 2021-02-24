import axios from '@/request/';

const shopManage = {
  getShopList(formData) {
    // 店铺列表
    return axios({
      url: `mall/shop/info/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  createShop(formData) {
    // 创建店铺
    return axios({
      url: `mall/shop/manage/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  deleteShop(formData) {
    // 删除店铺
    return axios({
      url: `mall/shop/manage/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  shopDetails(formData) {
    // 店铺详情
    return axios({
      url: `mall/shop/info/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default shopManage;