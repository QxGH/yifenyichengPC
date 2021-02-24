import request from '@/request/index';

const live = {
  createLive(formData) {
    // 创建直播间
    return request({
      url: `marketing/livePlayer/room/create`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  liveList(formData) {
    // 直播间列表
    return request({
      url: `marketing/livePlayer/room/lists`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  refreshLiveList(formData) {
    // 刷新直播间列表
    return request({
      url: `marketing/livePlayer/room/refresh`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  shareLive(formData) {
    // 分享直播间
    return request({
      url: `marketing/livePlayer/room/wxacode`,
      method: 'post',
      source: 'base',
      data: formData
    });
  },
  deleteLive(formData) {
    // 删除直播间
    return request({
      url: `marketing/livePlayer/room/delete`,
      method: 'post',
      source: 'base',
      data: formData
    });
  }
}

export default live;