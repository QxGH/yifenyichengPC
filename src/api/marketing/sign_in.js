import request from '@/request/index';

const signIn = {
  init(formData) {
    // 初始化签到
    return request({
      url: `interaction/item/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  save(formData) {
    // 储存活动
    return request({
      url: `interaction/manage/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData) {
    // 签到详情
    return request({
      url: `interaction/info/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  operation(formData) {
    // 签到操作
    return request({
      url: `interaction/manage/operation`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  record(formData) {
    // 活动管理 数据记录
    return request({
      url: `interaction/sign/record`,
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
  signData(formData) {
    // 活动管理 基本数据
    return request({
      url: `interaction/sign/data/general`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  timeData(formData) {
    // 活动管理 签到时间趋势
    return request({
      url: `interaction/sign/data/graphByDay`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default signIn;