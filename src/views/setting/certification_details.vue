<template>
  <div class="paltform-setting certification-details" v-loading="pageLoading">
    <div class="alert-box">
      <i class="el-icon-warning icon"></i>
      <span class="alert-text">已认证通过的信息不可修改，如发生变更请联系星辰客服处理。</span>
    </div>
    <div class="main-title">基本信息</div>
    <div class="tabs-box">
      <div class="form-group-item clearfix">
        <label class="form-label">认证类型：</label>
        <div class="form-ctrl">
          <template v-if="authInfo.type == 1">
            个人认证
          </template>
          <template v-else-if="authInfo.type == 2">
            企业认证
          </template>
        </div>
      </div>
      <div class="form-group-item clearfix" v-if="authInfo.type == 1">
        <label class="form-label">姓名：</label>
        <div class="form-ctrl">{{authInfo.name}}</div>
      </div>
      <div class="form-group-item clearfix" v-if="authInfo.type == 2">
        <label class="form-label">企业名称：</label>
        <div class="form-ctrl">{{authInfo.name}}</div>
      </div>
      <div class="form-group-item clearfix" v-if="authInfo.type == 2">
        <label class="form-label">营业执照号：</label>
        <div class="form-ctrl">{{authInfo.certificate_number}}</div>
      </div>
      <div class="form-group-item clearfix" v-if="authInfo.type == 1">
        <label class="form-label">身份证号码：</label>
        <div class="form-ctrl">{{authInfo.certificate_number}}</div>
      </div>
      <div class="form-group-item clearfix">
        <label class="form-label">联系电话：</label>
        <div class="form-ctrl">{{authInfo.phone}}</div>
      </div>
      <div class="form-group-item clearfix" v-if="authInfo.type == 1">
        <label class="form-label">身份证正反面照片：</label>
        <div class="form-ctrl" style="height: 90px;">
          <div class="pic-uploader">
            <div class="pic-upload-box">
              <img :src="authInfo.certificate_front_image" alt class="img" draggable="false" />
            </div>
          </div>
          <div class="pic-uploader">
            <div class="pic-upload-box">
              <img :src="authInfo.certificate_back_image" alt class="img" draggable="false" />
            </div>
          </div>
        </div>
      </div>
      <div class="form-group-item clearfix" v-if="authInfo.type == 2">
        <label class="form-label">营业执照：</label>
        <div class="form-ctrl" style="height: 90px;">
          <div class="pic-uploader">
            <div class="pic-upload-box">
              <img :src="authInfo.certificate_front_image" alt class="img" draggable="false" />
            </div>
          </div>
        </div>
      </div>
      <div class="main-title" style="margin: 30px 0;">品牌信息</div>
      <div class="form-group-item clearfix">
        <label class="form-label">供货商名称或品牌：</label>
        <div class="form-ctrl">{{authInfo.brand_name}}</div>
      </div>
      <div class="form-group-item clearfix">
        <label class="form-label">品牌证明材料：</label>
        <div class="form-ctrl" style="height: 90px;">
          <template v-for="(item, index) in authInfo.brand_atlas">
            <div class="pic-uploader" :key="index">
              <div class="pic-upload-box">
                <img :src="item" alt class="img" draggable="false" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qiniuUploadFile from "@/api/qiniu/uploadFile";
import uuidV4 from "uuid/v4";
import { getUserRole } from "@/tools/Cookie";
import { mapState, mapMutations } from "vuex"

export default {
  name: "PersonCertificationDetails",
  data() {
    return {
      pageLoading: true,
      authInfo: {}
    };
  },
  computed: {
    ...mapState(['shopInfo'])
  },
  created() {
    if(this.shopInfo) {
      let platformInfo = this.shopInfo;
      this.platformInfo = platformInfo;
      this.mallInfo = platformInfo.mallInfo;
      this.authInfo = platformInfo.authInfo;
      this.status = platformInfo.authInfo.status;
      this.platformName = platformInfo.mallInfo.name;
      this.logo = platformInfo.mallInfo.logo;
      this.pageLoading = false;
    } else {
      this.init();
    }
  },
  methods: {
    ...mapMutations(["CHANGE_SHOP_INFO"]),
    init() {
      this.pageLoading = true;
      let formData = {};
      this.$api.account.info.platformDetails(formData)
      .then(res => {
        if(res.data.code === 0) {
          let resData = res.data.data;
          this.authInfo = resData.authInfo;
          this.CHANGE_SHOP_INFO(resData)
        } else {
          this.$message.warning(res.data.message)
        }
        this.pageLoading = false;
      })
      .catch(err => {
        this.pageLoading = false;
      })
    }
  }
};
</script>

<style>
@import url("./style/setting.min.css");
</style>