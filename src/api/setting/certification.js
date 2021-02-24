import axios from '@/request/';

const certification = {
  save(formData) {
    // 提交认证
    return axios({
      url: `mall/basic/auth/submit`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData) {
    // 认证详情
    return axios({
      url: `mall/basic/auth/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default certification;