import request from '@/request/index';

export default function(formData) {
  return request({
    url: `control/login`,
    method: 'post',
    source: 'base',
    data: formData
  });
};