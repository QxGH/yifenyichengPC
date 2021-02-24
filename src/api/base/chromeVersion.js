import request from '@/request/index';

const chromeVersion = {
  version(formData) {
    // chrome 版本
    return request({
      url: `basic/sundry/browser/chrome`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default chromeVersion;