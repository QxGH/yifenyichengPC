import axios from '@/request/';

const myTemplate = {
  getTemplateList(formData) {
    // 模板列表
    return axios({
      url: `design/template/template/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  saveTemplate(formData) {
    // 保存模板
    return axios({
      url: `design/template/template/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  delTemplate(formData) {
    // 删除模板
    return axios({
      url: `design/template/template/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  release(formData) {
    // 发布
    return axios({
      url: `design/template/template/release`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  mobileUrl(formData) {
    // 移动端地址
    return axios({
      url: `mall/basic/info/mobileUrl`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
}

export default myTemplate;