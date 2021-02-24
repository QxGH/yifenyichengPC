<template>
  <!-- layout -->
  <div class="layout">
    <el-container>
      <el-aside :width="showSubMenu ? '240px' : '120px'">
        <AsideBar @showSubMenu="showSubMenuHandle"></AsideBar>
      </el-aside>
      <el-container>
        <el-header style="height: 56px;">
          <Header></Header>
        </el-header>
        <el-main>
          <div class="main-container" ref="mainContainer">
            <div class="main-wrap" id="main-wrap">
              <router-view />
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
const log = console.log;
import AsideBar from "./components/aside";
import Header from "./components/header";

export default {
  name: "layout",
  data() {
    return {
      showSubMenu: false
    };
  },
  components: {
    AsideBar,
    Header
  },
  methods: {
    showSubMenuHandle(val) {
      this.showSubMenu = val;
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>