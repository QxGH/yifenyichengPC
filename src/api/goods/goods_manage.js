import axios from '@/request/';

const goodsManage = {
  attributeLists(formData) {
    // 属性组列表
    return axios({
      url: `products/attribute/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  attributeCreate(formData) {
    // 创建属性组
    return axios({
      url: `products/attribute/create`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  abilityCreate(formData) {
    // 创建属性值信息
    return axios({
      url: `products/ability/create`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  submitGoods(formData) {
    // 商品创建/编辑
    return axios({
      url: `products/product/maintain`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getGoodsList(formData) {
    // 商品库 列表
    return axios({
      url: `products/product/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delGoods(formData) {
    // 商品删除
    return axios({
      url: `products/product/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getGoodsDetails(formData) {
    // 商品库 列表
    return axios({
      url: `products/product/detail`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  uploadCard(formData) {
    // 新建、编辑商品 上传核销码
    return axios({
      url: `products/product/importCardNumber`,
      method: 'post',
      source: 'base',
      data: formData,
      secret: false,
      headers: {'Content-Type': 'multipart/form-data'}
    });
  },
  shelf(formData) {
    // 商品上下架
    return axios({
      url: `products/product/shelves`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getWxCode(formData) {
    // 获取商品小程序码
    return axios({
      url: `products/product/wxacode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getQrcode(formData) {
    // 获取商品二维码
    return axios({
      url: `products/product/qrcode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getActivityStock(formData) {
    // 获取商品活动占用库存
    return axios({
      url: `products/product/productCount`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  extendLink(formData, method) {
    // 商品推广 - 获取推广链接
    let obj = {
      url: `products/product/wechatChannelsExtendLink`,
      method,
      source: 'base',
    };
    if(method == 'get') {
      let time = new Date().getTime();
      obj.params = {
        ...formData,
        _random: time
      };
    } else if (method == 'post') {
      obj.data = formData
    };
    return axios(obj);
  }
}

export default goodsManage;