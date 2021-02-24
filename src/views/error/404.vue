<template>
  <div class="not-found">
    <div class="img-box">
      <img src="https://cdn.xingchen.cn/FhLUQsgOY14C550BNAVhykn7CZz3" draggable="false" alt="" class="img">
    </div>
    <div class="tips">
      很抱歉，您要访问的页面不存在
    </div>
    <div class="btn-box">
      <button class="back-btn btn" @click="goback">返回首页</button>
      <button class="refresh-btn btn" @click="goback_1">返回上一页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goback() {
      this.$router.push('/')
    },
    refresh() {
      location.reload()
    },
    goback_1() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
@import url('./style/error.min.css');
</style>