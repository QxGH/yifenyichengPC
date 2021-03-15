<template>
  <div class="aside">
    <div class="main-menu">
      <div class="logo-box" @click="toHome" style="cursor: pointer;">
        <div class="svg">
          <Logo></Logo>
        </div>
      </div>
      <div class="aside-main">
        <vuescroll :ops="menuScrollOps">
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical"
            @open="handleOpen"
            @close="handleClose"
            background-color="#132236"
            text-color="#DEDEDE"
            active-text-color="#DEDEDE"
            router
          >
            <template v-for="(item, index) in asideConfig">
              <el-menu-item :data-index="item.path" :index="item.path" :key="index" @click="clickMenuItem(item)" :style="{marginTop: item.title === '资产管理' ? '54px' : '0'}">
                <i :class="item.icon" class="aside-icon" ></i>
                <span>{{item.title}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </vuescroll>
      </div>
    </div>
    <div class="sub-menu" :style="{'left': showSubMenu ? '120px' : '0px'}">
      <vuescroll :ops="menuScrollOps">
        <template v-for="(item, index) in childrenMenu">
          <div class="sub-menu-box" :key="index">
            <div class="logo-box" :class="{'no-border': item.title ? false : true  }">{{item.title}}</div>
            <div class="aside-main">
              <template v-for="(item_, index_) in item.children">
                <div
                  class="sub-menu-item"
                  :class="{'active': childrenActive == item_.path}"
                  :key="index_"
                  @click="chickRouter(item, item_, index_)"
                  :style="{
                    paddingLeft: item_.popover ? '19px' : 0
                  }"
                >
                  <span>{{item_.title}}</span>
                  <template v-if="item_.popover">
                    <el-popover
                      placement="top"
                      width="300"
                      :content="item_.popover"
                      trigger="hover">
                      <i class="el-icon-question c-blue cur-pointer mg-l-5" slot="reference"></i>
                    </el-popover>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </template>
      </vuescroll>
    </div>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import asideConfig from "@/router/asideConfig";
import Logo from "@/components/logo";

export default {
  name: "AsideBar",
  data() {
    return {
      asideConfig,
      defaultActive: "/home",
      showSubMenu: false,
      childrenMenu: [],
      childrenActive: "",
      menuScrollOps: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false
        },
        rail: {},
        bar: {
          background: "#000000",
          opacity: "0",
          onlyShowBarOnScroll: false
        }
      },
    };
  },
  watch: {
    $route(to, from) {
      console.log('roter aside watch')
      this.activeMenu();
    },
  },
  created() {
    this.activeMenu("created");
  },
  components: {
    Logo,
    vuescroll
  },
  methods: {
    activeMenu(type) {
      let path = this.$route.path;
      let meta = this.$route.meta;
      let arr = path.split("/");
      let parentActive = `/${arr[1]}/`; // 父菜单选中
      
      let childrenActive = ""; // 子菜单选中
      for (let item of asideConfig) {
        if (item.path === parentActive && item.children) {
          childrenActive = `/${arr[1]}/${arr[2]}`;
          this.childrenActive = childrenActive; // 设置子级选中
          let childrenMenu = item.children;
          this.childrenMenu = childrenMenu;
          this.showSubMenu = true; // 显示子级菜单
          this.$emit("showSubMenu", true);
          break;
        } else {
          this.$emit("showSubMenu", false);
        }
      };
      if (meta.parentRouter) {
        this.childrenActive = meta.parentRouter;
        // this.childrenMenu = item.children;
        this.showSubMenu = true; // 显示子级菜单
        this.$emit("showSubMenu", true);
      };
      if(parentActive == '/articleManage/') {
        parentActive = '/articleManage'
      }
      this.defaultActive = parentActive;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenuItem(val) {
      let id = val.id;
      for (let item of asideConfig) {
        if (item.id === val.id && val.children && val.children.length > 0) {
          console.log(val.children);
          let childrenMenu = val.children;
          this.childrenMenu = childrenMenu;
          this.showSubMenu = true;
          this.$emit("showSubMenu", true);
          break;
        } else {
          this.showSubMenu = false;
          this.$emit("showSubMenu", false);
        }
      }
    },
    chickRouter(item, item_, index_) {
      // 跳转路由
      if(this.$route.path == item_.path) {
        this.$router.go(0)
      } else {
        this.$router.push(item_.path);
      };
    },
    toHome() {
      this.$router.push('/')
    },
  },
};
</script>
<style lang="scss">
@import "./style/index.scss";
</style>