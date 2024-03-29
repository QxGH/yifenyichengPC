import request from '@/request/index';

const qiniu = {
  // 获取 token
  getQiniuToken(formData) {
    return request({
      url: `tools/oss/uploadToken`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default qiniu;