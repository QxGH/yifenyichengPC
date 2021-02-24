import request from '@/request/index';

const activity = {
  list(formData) {
    // 活动列表
    return request({
      url: `interaction/item`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  manageList(formData) {
    // 活动管理列表
    return request({
      url: `interaction/info/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  baseData(formData) {
    // 活动数据
    return request({
      url: `interaction/data/basic/general`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  dataGraph(formData) {
    // 活动趋势数据
    return request({
      url: `interaction/data/basic/dataGraph`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  locationData(formData) {
    // 地理位置 数据
    return request({
      url: `interaction/data/basic/location`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  dayLotteryGraph(formData) {
    // 日抽奖时间趋势数据 数据
    return request({
      url: `interaction/data/basic/dayLotteryGraph`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  channelList(formData) {
    // 渠道列表
    return request({
      url: `interaction/channel/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  channelSave(formData) {
    // 渠道 保存
    return request({
      url: `interaction/channel/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  channelDel(formData) {
    // 渠道 删除
    return request({
      url: `interaction/channel/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  channelWxCode(formData) {
    // 渠道 小程序码
    return request({
      url: `interaction/channel/wxacode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  channelH5Code(formData) {
    // 渠道 H5码
    return request({
      url: `interaction/channel/qrcode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  previewH5Code(formData) {
    // 预览 H5码
    return request({
      url: `interaction/info/qrcode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  previewWxCode(formData) {
    // 预览 wx码
    return request({
      url: `interaction/info/wxacode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  userList(formData) {
    // 活动管理 参与用户
    return request({
      url: `interaction/user/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  changeUserStatus(formData) {
    // 活动管理 参与用户 禁用启用
    return request({
      url: `interaction/user/status`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  userWinnerRecord(formData) {
    // 用户中奖记录
    return request({
      url: `interaction/order/winnerRecord/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  winnerRecord(formData) {
    // 中奖记录
    return request({
      url: `interaction/order/winnerRecord/businessLists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  joinRecord(formData) {
    // 中奖记录
    return request({
      url: `interaction/answer/record`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  searchData(formData) {
    // 搜索数据
    return request({
      url: `interaction/item/searchData`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  extendLink(formData, method) {
    // 商品推广 - 获取推广链接
    let obj = {
      url: `interaction/info/wechatChannelsExtendLink`,
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
    return request(obj);
  },
  paizeTypeList(formData) {
    // 奖品列表
    return request({
      url: `interaction/info/prizeTypeItems`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default activity;