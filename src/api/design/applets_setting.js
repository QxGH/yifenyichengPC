import axios from '@/request/';

const appletsSetting = {
  appletsAuth(formData) {
    // 小程序授权
    return axios({
      url: `mall/channel/miniProgram/auth`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  cancelAuth(formData) {
    // 取消小程序授权
    return axios({
      url: `mall/channel/miniProgram/relieveAuth`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getCategory(formData) {
    // 小程序类目获取
    return axios({
      url: `mall/channel/miniProgram/info`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  authInfoRefresh(formData) {
    // 小程序授权信息刷新
    return axios({
      url: `mall/channel/miniProgram/authInfoRefresh`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  testerList(formData) {
    // 小程序体验者列表
    return axios({
      url: `mall/channel/miniProgram/tester/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  addTester(formData) {
    // 添加小程序体验者列表
    return axios({
      url: `mall/channel/miniProgram/tester/bind`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  unBindTester(formData) {
    // 解绑小程序体验者列表
    return axios({
      url: `mall/channel/miniProgram/tester/unBind`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  uploadCode(formData) {
    // 更新小程序代码
    return axios({
      url: `mall/channel/miniProgram/uploadCode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  submitAudit(formData) {
    // 提交审核小程序代码
    return axios({
      url: `mall/channel/miniProgram/submitAudit`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  undoAudit(formData) {
    // 撤回审核小程序代码
    return axios({
      url: `mall/channel/miniProgram/undoAudit`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  auditStatus(formData) {
    // 审核状态存储
    return axios({
      url: `mall/channel/miniProgram/auditStatus`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  releaseCode(formData) {
    // 小程序代码发布
    return axios({
      url: `mall/channel/miniProgram/releaseCode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default appletsSetting;