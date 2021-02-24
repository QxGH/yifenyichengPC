<template>
  <el-dialog
    title="请完成安全验证"
    :visible.sync="dialogVisible"
    custom-class="slide-verify-dialog"
    width="346px"
    @closed="closeDialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <SlideVerify
      ref="slideblock"
      :imgs="imgs"
      @success="onSuccess"
      @again="onAgain"
      @fulfilled="onFulfilled"
      @fail="onFail"
      @refresh="onRefresh"
      slider-text="向右拖动滑块填充拼图"
      :accuracy="2"
    ></SlideVerify>
  </el-dialog>
</template>

<script>
import SlideVerify from "@/components/slide_verify/";

import img0 from "@/assets/images/slide_verify/bg_img/img.jpg";
import img1 from "@/assets/images/slide_verify/bg_img/img1.jpg";
import img2 from "@/assets/images/slide_verify/bg_img/img2.jpg";
import img3 from "@/assets/images/slide_verify/bg_img/img3.jpg";
import img4 from "@/assets/images/slide_verify/bg_img/img4.jpg";
import img5 from "@/assets/images/slide_verify/bg_img/img5.jpg";

export default {
  name: "SlideVerifyDialog",
  components: {
    SlideVerify
  },
  props: ["verifyType"],
  data() {
    return {
      imgs: [img0, img1, img2, img3, img4, img5],
      dialogVisible: true
    };
  },
  methods: {
    onSuccess() {
      // console.log("验证通过");
      // this.$message.success('验证通过')
      this.$emit("success", this.verifyType);
    },
    onFail() {
      // console.log("验证不通过");
      // this.$message.warning('验证失败')
      this.$emit("fail", false);
    },
    onRefresh() {
      // 点击刷新按钮后的回调函数
      // console.log("点击了刷新小图标");
    },
    onFulfilled() {
      // 刷新成功之后的回调函数
      // this.$message.success('刷新成功！')
    },
    onAgain() {
      // 检测到非人为操作滑动时触发的回调函数
      this.$message.warning("检测到非人为操作！");
      this.refresh();
    },
    refresh() {
      this.$refs.slideblock.reset();
    },
    closeDialog() {
      this.$emit("close", "");
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>