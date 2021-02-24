import request from '@/request/index';

const common = {
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
    // 活动详情
    return request({
      url: `interaction/info/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  operation(formData) {
    // 活动操作
    return request({
      url: `interaction/manage/operation`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  codeStatistic(formData) {
    // 活动密码统计
    return request({
      url: `interaction/code/info/statistics`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  codeList(formData) {
    // 活动密码列表
    return request({
      url: `interaction/code/info/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  importCode(formData) {
    // 活动密码导入文件
    return request({
      url: `interaction/code/import`,
      method: 'post',
      source: 'base',
      data: formData,
      secret: false
    });
  },
  editCode(formData) {
    // 活动密码修改
    return request({
      url: `interaction/code/manage/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  deleteCode(formData) {
    // 活动密码删除
    return request({
      url: `interaction/code/manage/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  deleteBatchCode(formData) {
    // 活动密码批量删除
    return request({
      url: `interaction/code/batch/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  aotoCreateCode(formData) {
    // 活动密码自动生成
    return request({
      url: `interaction/code/manage/generate`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  codeWxQrcode(formData) {
    // 活动密码 微信二维码
    return request({
      url: `interaction/code/info/wxacode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  codeH5Qrcode(formData) {
    // 活动密码 微信二维码
    return request({
      url: `interaction/code/info/qrcode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  batchExportCode(formData) {
    // 活动密码 批量导出
    return request({
      url: `interaction/code/batch/export`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default common;