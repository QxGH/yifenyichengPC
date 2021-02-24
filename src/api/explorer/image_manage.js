import axios from '@/request/';

const imageManage = {
  getGroupList(formData) {
    // 分组列表
    return axios({
      url: `mall/explorer/group/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  getExplorerList(formData) {
    // 资源列表
    return axios({
      url: `mall/explorer/item/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  groupSave(formData) {
    // 分组 新建、编辑
    return axios({
      url: `mall/explorer/group/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  upload(formData) {
    // 上传
    return axios({
      url: `mall/explorer/item/save`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  deleteImage(formData) {
    // 删除图片
    return axios({
      url: `mall/explorer/item/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  deleteGroup(formData) {
    // 删除分组
    return axios({
      url: `mall/explorer/group/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  moveImage(formData) {
    // 移动分组
    return axios({
      url: `mall/explorer/item/move`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default imageManage;