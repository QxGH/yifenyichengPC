<template>
  <div class="shop-setting">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
      <el-form-item label="是否显示门店图：" prop="showImg">
        <el-radio-group v-model="form.showImg">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
        <p class="form-tips">
          门店图用于在商品详情、全部门店、门店列表组件展示
          <el-link type="primary" :underline="false" @click="previewDialog = true">预览效果</el-link>
        </p>
      </el-form-item>
    </el-form>
    <div class="footer-box">
      <el-button type="primary" class="normal-btn" @click="submitHandle" :loading="submitLoading">确定</el-button>
    </div>
    <el-dialog
      :visible.sync="previewDialog"
      center
      custom-class="shop-setting-preview-dialog"
      width="1000px">
      <div class="dialog-body">
        <div class="item">
          <p class="item-title">显示门店图效果</p>
          <img src="https://cdn.xingchen.cn/FpKT_L-UiRrVKiWVASTeloGlbhjv" class="img" draggable="false" alt="">
        </div>
        <div class="item">
          <p class="item-title">不显示门店图效果</p>
          <img src="https://cdn.xingchen.cn/FnOiuQK1LGetdJidLkIKa2aqvcOP" class="img" draggable="false" alt="">
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewDialog = false" class="normal-btn">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ShopSetting",
  data() {
    return {
      previewDialog: false,
      submitLoading: false,
      rules: {
        showImg: [
          { required: true, message: '请选择是否显示门店图', trigger: 'change' }
        ]
      },
      form: {
        showImg: 2
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.pageLoading = true;
      let formData = {
        fields: ['shop_picture_show_status']
      };
      this.$api.setting.base.details(formData)
      .then(res => {
        if(res.data.code === 0) {
          let resData = res.data.data;
          console.log("init -> resData", resData)
          this.form.showImg = resData.shop_picture_show_status
        } else {
          this.$message.warning(res.data.message)
        }
        this.pageLoading = false;
      })
      .catch(err => {
        this.pageLoading = false;
      })
    },
    submitHandle() {
      this.submitLoading = true;
      let formData = {
        fields: {
          shop_picture_show_status: this.form.showImg,
        }
      };
      this.$api.setting.base.save(formData)
      .then(res => {
        if(res.data.code === 0) {
          this.$message.success(res.data.message)
        } else {
          this.$message.warning(res.data.message)
        };
        this.submitLoading = false;
      })
      .catch(err => {
        this.submitLoading = false;
      })
    }
  }
};
</script>

<style lang="scss">
  .shop-setting {
    padding: 16px 16px 76px;
    position: relative;
    min-height: 100%;
    .form-tips {
      line-height: 20px;
      color: #999;
    }
    .footer-box {
      position: absolute;
      height: 50px;
      padding-top: 9px;
      bottom: 0;
      left: 0;
      z-index: 99;
      width: 100%;
      background: #fff;
      text-align: center;
      box-shadow: 0 -2px 6px rgba(0,0,0,0.05);
    }
  }
  .shop-setting-preview-dialog {
    .dialog-body {
      display: flex;
      justify-content: space-around;
      .item {
        width: 375px;
      }
      .item-title {
        text-align: center;
        font-size: 16px;
        margin-bottom: 20px;
      }
      .img {
        width: 375px;
        height: 667px;
        display: block;
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
      }
    }
  }
</style>