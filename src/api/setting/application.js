/*
 * @Description: 
 * @Date: 2021-02-03 14:25:51
 * @LastEditTime: 2021-02-03 15:51:13
 */
import axios from '@/request/';

const application = {
  details(formData) {
    // 应用详情详情
    return axios({
      url: `mall/application/info/details`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  create(formData) {
    // 应用创建
    return axios({
      url: `mall/application/manage/create`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  status(formData) {
    // 应用状态
    return axios({
      url: `mall/application/manage/status`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  update(formData) {
    // 应用更新
    return axios({
      url: `mall/application/manage/basicUpdate`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default application;