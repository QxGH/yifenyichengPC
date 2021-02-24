<!--
 * @Description: 
 * @Date: 2021-02-24 17:06:15
 * @LastEditTime: 2021-02-24 17:26:04
-->
<template>
  <div
    class="common-header"
  >
    <div class="header-main-box clearfix">
      <div 
        class="pull-left" 
        :style="{'opacity': isHome ? opacity.create : 1}"
      >
        <template v-if="userLogoUrl">
          <!-- <el-image
          style="width: auto; height: 40px; vertical-align: middle;"
          :src="userLogoUrl"
          fit="fill"
          ></el-image>-->
          <img
            :src="userLogoUrl"
            draggable="false"
            @click="toHome"
            height="40"
            width="auto"
            alt
            class="cursor-pointer"
            style="vertical-align: middle;"
          />
        </template>
        <template v-else>
          <div 
            class="login-box pull-left cursor-pointer flex-box" 
            style="align-items: center;"
            @click="toHome"
          >
            <div class="svg">
              <Logo></Logo>
            </div>
            <img
              class="name"
              draggable="false"
              src="https://cdn.xingchen.cn/a470a275-49fe-4c4d-9a6c-e3177d5c9be0"
              alt
            />
            <i class="dot"></i>
            <span class="slogan">专注用户运营的技术服务商</span>
          </div>
        </template>
      </div>
      
    </div>
  </div>
</template>

<script>

export default {
  name: "CommonHeader",
};
</script>

<style lang="scss">
@import './style/index.scss'
</style>