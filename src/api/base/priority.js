import request from '@/request/index';

const priority = {
  info(formData) {
    // 优先权
    return request({
      url: `mall/basic/info/priority`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default priority;