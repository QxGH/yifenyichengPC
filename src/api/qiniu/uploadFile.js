import qiniuApi from '@/api/qiniu'
import * as qiniu from "qiniu-js";
import { Message } from 'element-ui'

/*
* @file 文件
* @key 文件名
* @progress 进度
* @success 成功
* @fail 失败
*/
const uploadFile = (file, key, progress, success, fail) => {
  getToken().then(res => {
    if (res.data.code === 0) {
      let tokenData = res.data.data;
      upload(tokenData.uptoken, tokenData.domain, file, key, progress, success, fail);
    } else {
      Message.warning(res.data.message);
    }
  });
};

const upload = (uptoken, domain, file, key, progress, success, fail) => {
  let config = {
    useCdnDomain: true,
    region: null
  };
  let putExtra = {
    fname: file.name,
    params: {}
  };
  let observe = {
    next(res) {
      // next: 接收上传进度信息，res 参数是一个带有 total 字段的 object，包含loaded、total、percent三个属性，提供上传进度信息。
      // console.log('next')
      // console.log("已上传大小，单位为字节：" + res.total.loaded);
      // console.log("本次上传的总量控制信息，单位为字节：" + res.total.size);
      // console.log("当前上传进度，范围：0～100：" + res.total.percent);
      // self.uploadPercentage = parseInt(res.total.percent);
      progress(res)
    },
    error(err) {
      fail(err)
    },
    complete(res) {
      success(res)
    }
  };
  self.uploadLoading = true;
  let observable = qiniu.upload(file, key, uptoken, putExtra, config);
  let subscription = observable.subscribe(observe);
};

const getToken = () => {
  return new Promise((resolve, reject) => {
    let formData = {
      bucket: "xingchenyun"
    };
    qiniuApi.getQiniuToken(formData)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default uploadFile;