import request from '@/request/index';

const info = {
  changePwd(formData) {
    // 修改密码
    return request({
      url: `control/account/manage/modifyPassword`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default info;