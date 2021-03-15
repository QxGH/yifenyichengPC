import axios from '@/request/';

const setting = {
  save(formData) {
    // 设置储存
    return axios({
      url: `control/website/setting/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  details(formData) {
    // 设置详情
    return axios({
      url: `control/website/setting/get`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default setting;