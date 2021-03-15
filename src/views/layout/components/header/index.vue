<template>
  <div class="header clearfix">
    <div
      class="current-menu"
      style="font-size: 20px; font-weight: bold;"
      v-if="isHome"
    >{{shopName}}</div>
    <div class="current-menu" v-else>{{breadcrumb}}</div>
    <div class="pull-right d-flex-lr">
      <el-popover popper-class="header-dropdown" placement="bottom" width="300" trigger="hover">
        <div class="user-info" slot="reference">
          <div>
            <span class="name">{{ userName ? userName : '' }}</span>
            <i class="icon el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="logout-box" @click="command('logout')">
          <label class="item-title pull-left">退出登录</label>
          <div class="item-details pull-right">
            <i class="icon el-icon-switch-button"></i>
          </div>
        </div>
      </el-popover>
    </div>

  </div>
</template>

<script>
import { clearCookie } from "@/tools/Cookie";

export default {
  name: "headerBar",
  data() {
    return {
      isHome: true,
      shopName: '文章管理',
      breadcrumb: '',
      userName: ''
    };
  },
  watch: {
    $route(to, from) {
      this.setBeadcrumb();
    },
  },
  created() {
    this.userName = localStorage.getItem('yfyc_name');
    this.setBeadcrumb();
  },
  methods: {
    setBeadcrumb() {
      // 设置面包屑
      let path = this.$route.path;
      let routeName = this.$route.name;
      let params = this.$route.params;
      console.log("🚀 ~ file: index.vue ~ line 278 ~ setBeadcrumb ~ path", this.$route)
      let breadcrumb = this.$route.meta.breadcrumb;
      if(path == '/home' || path.indexOf('/helpCenter') != '-1') {
        this.isHome = true;
      } else {
        this.isHome = false;
      };

      // 创建统一活动
      if(routeName == 'CreateInteractiveGame') {
        let type = Number(params.type);
        switch(type) {
          case 10004:
            breadcrumb = '大转盘';
            break;
        }
      }
      this.breadcrumb = breadcrumb ? breadcrumb : '';

      this.showHelpAndSearch = false;
    },
    command(event) {
      switch (event) {
        case "logout":
          this.logout();
          break;
      }
    },
    logout() {
      clearCookie();
      this.$router.push({
        name: 'Login'
      })
    },
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>