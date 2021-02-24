<template>
  <div class="phone-preview" :style="{width: pageWidth+'px', height: pageHeight+'px'}">
    <div class="preview-header">
      <div class="phone-header-box">
        <div class="state-bar-box clearfix">
          <div class="signal-box">
            <i class="font_family icon-signal v-mid"></i>
            <span class="sketch v-mid"><template v-if="shopInfo && shopInfo.mallInfo">{{shopInfo.mallInfo.name | nameFilter}}</template><template v-else>星辰</template></span>
            <i class="font_family icon-wifi-signal v-mid"></i>
          </div>
          <div class="time-box">{{nowTime}}</div>
          <div class="battery-box">
            <!-- <i class="font_family icon-bluetooth"></i> -->
            <span class="battery-num">100%</span>
            <i class="font_family icon-battery"></i>
          </div>
        </div>
      </div>
      <div class="applets-tab-bar clearfix">
        <span class="back-icon">
          <i class="font_family icon-arrow-left"></i>
        </span>
        <template>
          <p class="page-name">{{pageName}}</p>
        </template>
        <span class="power-icon">
          <i class="font_family icon-applets-power"></i>
        </span>
      </div>
    </div>
    <div class="preview-main">
      <div class="scroll-box">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "IntegralPreview",
  data() {
    return {
      nowTime: "00:00 AM",
      nowTimeLater: ""
    };
  },
  props: {
    pageName: {
      type: String,
      default: ''
    },
    pageWidth: {
      type: Number,
      default: 375
    },
    pageHeight: {
      type: Number,
      default: 667
    }
  },
  created() {
    this.getNowTime();
  },
  computed: {
    ...mapState(['shopInfo'])
  },
  methods: {
    getNowTime() {
      let now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let timeValue = "" + (hours >= 12 ? "PM " : "AM ");
      // this.nowTime = `${hours}:${minutes} ${timeValue}`;
      this.nowTime = `${hours}:${minutes}`;

      this.nowTimeLater = setInterval(() => {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let timeValue = "" + (hours >= 12 ? "PM " : "AM ");
        // this.nowTime = `${hours < 10 ? "0" + hours : hours}:${
        //   minutes < 10 ? "0" + minutes : minutes
        // } ${timeValue}`;
        this.nowTime = `${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }`;
      }, 1000);
    }
  },
  filters: {
    nameFilter(val) {
      let res = val;
      if(res.length > 6) {
        res = res.slice(0, 6);
      };
      return res;
    }
  },
  beforeDestroy() {
    window.clearInterval(this.nowTimeLater);
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>