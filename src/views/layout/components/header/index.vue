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
            <img :src="userInfo_.avatar" v-if="userInfo_.avatar" draggable="false" alt class="avatar" />
            <img src="https://cdn.xingchen.cn/FkLXnVm3LglH3i7MUfSL709M4FAm" v-else alt draggable="false" class="avatar" />
            <span class="name">{{userInfo_.nickname ? userInfo_.nickname : userInfo_.phone }}</span>
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

    <!-- chrome version start -->
    <el-dialog
      title="温馨提示"
      :visible.sync="chromeTipsDialog"
      width="440px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
      custom-class="chrome-tips-dialog"
      @closed="chromeTipsDialogClosed"
    >
      <div class="dialog-body">
        <div class="flex-box">
          <div class="icon-box">
            <i class="el-icon-warning warning-icon"></i>
          </div>
          <div class="flex-1 lh-24 text-left" style="padding-left: 5px;">
            你正在使用的浏览器版本过低，将不能正常浏览和使用平台。
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div>
          <button type="button" class="dialog-btn cancel-btn" @click="chromeTipsDialog = false">
            <span class="v-mid text">取消</span>
          </button>
          <button type="button" class="dialog-btn confirm-btn" @click="toDownChrome">
            <ChromeLogoSvg class="v-mid"></ChromeLogoSvg>
            <span class="v-mid mg-l-5 text">使用谷歌浏览器</span>
          </button>
        </div>
        <div class="mg-t-20">
          <el-checkbox v-model="noChromeTips" size="mini">
            <span class="c-999">不再提示</span>
          </el-checkbox>
        </div>
      </span>
    </el-dialog>
    <!-- chrome version end -->

  </div>
</template>

<script>
import Cookies from "js-cookie";
import { getChromeVersionNoTips, clearCookie } from "@/tools/Cookie";
import { mapState, mapMutations } from "vuex";
import ChromeLogoSvg from '@/components/chrome_logo'

export default {
  name: "headerBar",
  data() {
    return {
      userInfo_: {},
      isHome: true,
      shopName: '文章管理',
      breadcrumb: '',
      noTipAppletsSettingFlag: true, // 不再提示绑定小程序
      chromeTipsDialog: false,
      noChromeTips: false
    };
  },
  watch: {
    $route(to, from) {
      this.setBeadcrumb();
    },
  },
  components: {
    ChromeLogoSvg
  },
  computed: {
    ...mapState(['userInfo', 'priority', 'serviceQrcodeImage', 'iframeURL', 'domainURL'])
  },
  created() {
    this.getChromeSupportVersion();
    if(this.userInfo) {
      this.userInfo_ = this.userInfo;
    } else {
      this.getUserDetails();
    };
    this.setBeadcrumb();
  },
  methods: {
    ...mapMutations(["CHANGE_SHOP_INFO", "CHANGE_USER_INFO"]),
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
    getUserDetails() {
      let formData = {};
      this.$api.account.info.infoDetails(formData).then(res => {
        if (res.data.code === 0) {
          let userInfo = res.data.data;
          this.userInfo_ = userInfo;
          this.CHANGE_USER_INFO(userInfo);
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },
    getChromeSupportVersion() {
      let formData = {};
      this.$api.base
        .chromeVersion.version(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.minSupportVersion = res.data.data.minSupportVersion;
          } else {
            this.minSupportVersion = 81;
          };
          this.showChromeVersionTips()
        })
        .catch(err => {
          this.minSupportVersion = 81;
          this.showChromeVersionTips()
        });
    },
    showChromeVersionTips() {
      let chromeVersionNoTips = getChromeVersionNoTips(); // 是否不再提示chrome版本 1-不再提示
      if(chromeVersionNoTips != 1) {
        let chromeVersion = this.getChromeVersion();
        if (!chromeVersion || chromeVersion < 80) {
          this.chromeTipsDialog = true;
        };
      };
    },
    getChromeVersion() {
      let userAgent = navigator.userAgent;
      if(userAgent.indexOf("Chrome") > -1) {
        if(userAgent.indexOf("QIHU") > -1 || userAgent.indexOf("360EE") > -1 || userAgent.indexOf("360SE") > -1) {
          // 360浏览器
          return false
        };
        if(userAgent.indexOf("QQBrowser") > -1 || userAgent.indexOf("TencentTraveler") > -1) {
          // QQ浏览器
          return false
        };
        // if(userAgent.indexOf("Edg") > -1) {
        //   // chrome版edge
        //   return false
        // };
        if(userAgent.indexOf("SE") > -1 && userAgent.indexOf("MetaSr") > -1) {
          // 搜狗浏览器
          return false
        };
        if(userAgent.indexOf("UCWEB") > -1) {
          // UC浏览器
          return false
        };
        let arr = userAgent.split(' ');
        let chromeVersion = '';
        for (let i = 0; i < arr.length; i++) {
          if (/chrome/i.test(arr[i])) {
            chromeVersion = arr[i]
          };
        };
        if (chromeVersion) {
          return Number(chromeVersion.split('/')[1].split('.')[0]);
        } else {
          return false;
        };
      } else {
        return false;
      };
    },
    chromeTipsDialogClosed() {
      if(this.noChromeTips) {
        let domainURL = "." + this.domainURL;
        Cookies.set("chromeVersionNoTips", 1, { domain: domainURL });
      }
    },
    toDownChrome() {
      let googleChromeWindow = window.open();
      googleChromeWindow.location.href = 'https://www.google.cn/chrome/'
    },
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>