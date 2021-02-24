import axios from '@/request/';

const market = {
  supplyDetails(formData) {
    // 供货商信息
    return axios({
      url: `market/business/info/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default market;