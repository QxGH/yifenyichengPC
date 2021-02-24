import axios from '@/request/';

const exquisiteTemplate = {
  getTemplateList(formData) {
    // 模板列表
    return axios({
      url: `design/template/library/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  useTemplate(formData) {
    // 使用模板
    return axios({
      url: `design/template/library/use`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default exquisiteTemplate;