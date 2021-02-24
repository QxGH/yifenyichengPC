<template>
  <div class="paltform-setting" v-loading="pageLoading">
    <el-tabs v-model="tabsActive" class="paltform-setting-tabs" type="card" @tab-click="tabsChange">
      <el-tab-pane label="平台信息" name="1"></el-tab-pane>
      <el-tab-pane label="用户使用协议" name="2"></el-tab-pane>
    </el-tabs>
    <div class="tabs-box">
      <template v-if="tabsActive === '1'">
        <div class="form-group-item clearfix">
          <label class="form-label">平台名称：</label>
          <div class="form-ctrl">
            <template v-if="isEditName">
              <el-input
                v-model="platformName"
                placeholder="请输入平台名称"
                size="small"
                maxlength="30"
                show-word-limit
                @keyup.enter.native="changePlatformName"
                @input="platformName=platformName.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g,'')"
                style="width: 240px;"
              ></el-input>
              <button class="grey-text-btn" @click="cancelPlatformName">取消</button>
              <button class="blue-text-btn" @click="changePlatformName">确定</button>
            </template>
            <template v-else>
              <span class="v-top lh-32">{{platformName}}</span>
              <button class="blue-text-btn" @click="isEditName = true">修改</button>
            </template>
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">平台编号：</label>
          <div class="form-ctrl">
            {{mallInfo.identifier}}
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label" style="height: 80px;">平台标志：</label>
          <div class="form-ctrl">
            <div class="logo-uploader" @click="checkLogoPic">
              <div class="upload-box">
                <img v-if="logo" draggable="false" class="img" :src="logo" />
                <span class="change-tips">更换图片</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="form-group-item clearfix">
          <label class="form-label">平台认证：</label>
          <div class="form-ctrl">
            <template v-if="status == 1">
              <span class="v-top">未认证</span>
              <button class="blue-text-btn v-top" @click="toCertification">去认证</button>
            </template>
            <template v-else-if="status == 2">
              <span class="v-top">{{authInfo.type == 2 ? '企业认证' : '个人认证'}}</span>
              <button class="blue-text-btn v-top" @click="lookCertification">查看</button>
            </template>
            <template v-else-if="status == 3">
              <span class="v-top">未认证</span>
              <button class="blue-text-btn v-top">官方审核中</button>
            </template>
            <template v-else-if="status == 4">
              <span class="v-top" style="margin-right: 15px;">未认证</span>
              <el-popover
                placement="top-start"
                width="300"
                trigger="hover"
                :content="authInfo.reject_reason"
              >
                <i slot="reference" class="el-icon-warning reject-icon"></i>
              </el-popover>
              <button class="red-text-btn v-top">审核被驳回</button>
              <button class="blue-text-btn v-top" @click="toCertification">重新提交</button>
            </template>
          </div>
        </div> -->
         <div class="form-group-item clearfix">
          <label class="form-label">店铺别名：</label>
          <div class="form-ctrl">
            <span class="v-mid">{{mallInfo.alias}}</span>
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">店铺地址：</label>
          <div class="form-ctrl">
            <span class="v-mid">{{mallInfo.mobile_url}}</span>
            <button class="blue-text-btn v-top" @click="copyH5Link">复制店铺地址</button>
            <button class="blue-text-btn v-top" style="padding-left: 0;" @click="copyPayDir">复制支付授权目录</button>
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">平台创建时间：</label>
          <div class="form-ctrl">{{mallInfo.created_at}}</div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">客服电话：</label>
          <div class="form-ctrl">
            <template v-if="isEditPhone">
              <el-input
                v-model="platformPhone"
                placeholder="请输入客户电话"
                size="small"
                maxlength="20"
                @keyup.enter.native="changePlatformPhone"
                @input="platformPhone=platformPhone.replace(/^0(0+)|[^\d]+/g,'')"
                style="width: 240px;"
              ></el-input>
              <button class="grey-text-btn" @click="cancelPlatformPhone">取消</button>
              <button class="blue-text-btn" @click="changePlatformPhone">确定</button>
            </template>
            <template v-else>
              <span class="v-mid lh-32">{{platformPhone ? platformPhone : '暂未设置'}}</span>
              <button class="blue-text-btn v-top" @click="isEditPhone = true">修改</button>
            </template>
          </div>
        </div>
        
      </template>
      <template v-if="tabsActive === '2'">
        <div>
          是否开启用户使用协议：
          <el-radio-group v-model="openAgreement">
            <el-radio :label="2">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </div>
        <p class="agreement-tips">用户注册协议将在小程序/H5用户个人中心显示，买家可点击查看。</p>
        <div class="ue-box">
          <UE :richText="UeRichText" :width="900" :height="360" @callback="ueChange"></UE>
        </div>
        <div class="agreement-btn-box">
          <!-- <el-button type="primary" class="normal-btn" @click="submit" :loading="submitLoading">确定</el-button> -->
        </div>
      </template>
      <div class="footer-box" v-if="tabsActive === '2'">
        <el-button type="primary" class="normal-btn" @click="submit" :loading="submitLoading">确定</el-button>
      </div>
    </div>
    <ImageManage :limit="1" @checkedImage="checkedImageHandle" v-if="showImageManage" @close="closeImageManage"></ImageManage>
  </div>
</template>

<script>
import qiniuUploadFile from "@/api/qiniu/uploadFile";
import uuidV4 from "uuid/v4";
import { getUserRole } from "@/tools/Cookie";
import ImageManage from "@/components/image_manage";
import { mapState, mapMutations } from 'vuex'

export default {
  name: "PlatformSetting",
  data() {
    return {
      platformInfo: {},
      mallInfo: {},
      authInfo: {},
      pageLoading: true,
      submitLoading: false,
      showImageManage: false,
      tabsActive: "1",
      isEditName: false, // 是否为编辑名称状态
      platformName: "",
      logo: "",
      openAgreement: 1,
      UeRichText: "",
      agreeMent: "", // 用户协议
      status: '',
      isEditPhone: false,
      platformPhone: ''
    };
  },
  components: {
    ImageManage
  },
  computed: {
    ...mapState(['shopInfo'])
  },
  created() {
    this.init();
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
          this.platformInfo = resData;
          this.CHANGE_SHOP_INFO(resData);
          this.mallInfo = resData.mallInfo;
          this.authInfo = resData.authInfo;
          this.status = resData.authInfo.status ? resData.authInfo.status : 1;
          this.platformName = resData.mallInfo.name;
          this.logo = resData.mallInfo.logo;
          this.platformPhone = resData.mallInfo.service_phone;
        } else {
          this.$message.warning(res.data.message)
        }
        this.pageLoading = false;
      })
      .catch(err => {
        this.pageLoading = false;
      })
    },
    init2() {
      this.pageLoading = true;
      let formData = {
        fields: ['user_usage_agreement_status', 'user_usage_agreement']
      };
      this.$api.setting.base.details(formData)
      .then(res => {
        if(res.data.code === 0) {
          let resData = res.data.data;
          this.openAgreement = resData.user_usage_agreement_status
          this.agreeMent = resData.user_usage_agreement
          this.UeRichText = resData.user_usage_agreement
        } else {
          this.$message.warning(res.data.message)
        }
        this.pageLoading = false;
      })
      .catch(err => {
        this.pageLoading = false;
      })
    },
    checkLogoPic() {
      // 选择logo
      this.showImageManage = true;
    },
    checkedImageHandle(val) {
      this.showImageManage = false;
      if(val.length > 0) {
        // this.logo= val[0].src;
        let logo = val[0].src
        this.changePlatformInfo('logo', logo)
      };
    },
    closeImageManage(val) {
      this.showImageManage = false;
    },
    submit() {
      this.submitLoading = true;
      let formData = {
        fields: {
          user_usage_agreement_status: this.openAgreement,
          user_usage_agreement: this.agreeMent
        }
      };
      this.$api.setting.base.save(formData)
      .then(res => {
        if(res.data.code === 0) {
          this.$message.success(res.data.message)
        } else {
          this.$message.warning(res.data.message)
        }
        this.submitLoading = false;
        this.init2();
      })
      .catch(err => {
        this.submitLoading = false;
      })
    },
    tabsChange(val) {
      if(val.name == '2') {
        this.init2()
      }
    },
    cancelPlatformName() {
      this.platformName = this.platformInfo.mallInfo.name;
      this.isEditName = false;
    },
    changePlatformName() {
      // console.log(this.platformName);
      if(this.platformName.length < 2) {
        this.$message.warning('平台名称应最少设置两个字!')
        return
      };
      this.isEditName = false;
      this.changePlatformInfo('name', this.platformName)
    },
    cancelPlatformPhone() {
      this.platformPhone = this.platformInfo.mallInfo.service_phone;
      this.isEditPhone = false;
    },
    changePlatformPhone() {
      // console.log(this.platformName);
      if(this.platformPhone == '') {
        this.$message.warning('请输入客服电话!')
        return
      };
      this.isEditPhone = false;
      this.changePlatformInfo('service_phone', this.platformPhone)
    },
    changePlatformInfo(type, val) {
      this.pageLoading = true;
      let formData = {};
      if(type == 'name') {
        formData = {
          name: val
        }
      };
      if(type == 'logo') {
        formData = {
          logo: val
        }
      }
      if(type == 'service_phone') {
        formData = {
          service_phone: val
        }
      }
      this.$api.shop.info.basicUpdate(formData)
      .then(res => {
        if(res.data.code === 0) {
          this.$message.success('修改成功！')
        } else {
          this.$message.warning(res.data.message)
        };
        this.pageLoading = false;
        this.init()
      })
      .catch(err => {
        this.pageLoading = false;
      })
    },
    copyH5Link() {
      let link = this.mallInfo.mobile_url;
      this.$copyText(link).then(
        e => {
          this.$message.success("复制成功！");
        },
        e => {
          this.$message.warning("复制失败！");
        }
      );
    },
    copyPayDir() {
      let link = this.mallInfo.mobile_url_parse.wxpay_auth_dir;
      this.$copyText(link).then(
        e => {
          this.$message.success("复制成功！");
        },
        e => {
          this.$message.warning("复制失败！");
        }
      );
    },
    ueChange(val) {
      this.agreeMent = val;
    },
    toCertification() {
      this.$router.push('/setting/certification')
    },
    lookCertification() {
      this.$router.push('/setting/certificationDetails')
    }
  }
};
</script>

<style>
@import url("./style/setting.min.css");
</style>