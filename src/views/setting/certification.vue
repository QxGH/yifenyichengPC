<template>
  <!-- 个人认证 -->
  <div class="certification" v-loading="pageLoading">
    <el-tabs v-model="tabsActive" @tab-click="tabsChange" class="paltform-setting-tabs" type="card" :disabled="status == 3">
      <el-tab-pane label="个人认证" name="1"></el-tab-pane>
      <el-tab-pane label="企业认证" name="2"></el-tab-pane>
    </el-tabs>
    <el-form :model="form" :rules="formRules" ref="form" label-width="130px">
      <div class="item-title">
        <span class="main-title">基本信息</span>
        <span class="sub-title">信息仅用作证实供货商真实性，星辰不会透露任何信息给他人。</span>
      </div>
      <template v-if="tabsActive == '1'">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" class="max-width-640"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="idCardNo">
          <el-input v-model="form.idCardNo" placeholder="请输入身份证号码" class="max-width-640"></el-input>
        </el-form-item>
      </template>
      <template v-if="tabsActive == '2'">
        <el-form-item label="企业名称：" prop="enterpriseName">
          <el-input v-model="form.enterpriseName" placeholder="请输入企业名称" class="max-width-640"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号：" prop="licenseNumber">
          <el-input v-model="form.licenseNumber" placeholder="请输入营业执照号" class="max-width-640"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="联系电话：" prop="tel">
        <el-input v-model="form.tel" placeholder="请输入联系电话" class="max-width-640"></el-input>
        <p class="form-tips">信息仅用作证实供货商真实性，星辰不会透露任何信息给他人，请保持电话畅通。</p>
      </el-form-item>
      <template v-if="tabsActive == '1'">
        <el-form-item label="身份证正反面：" prop="idCardPic">
          <el-upload
            class="pic-uploader"
            action
            :show-file-list="false"
            :before-upload="beforeCardFrontUpload"
            accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp"
          >
            <div class="pic-upload-box">
              <img v-if="form.idCardPicFront" :src="form.idCardPicFront" alt class="img" draggable="false" />
              <span v-else class="upload-tips">+上传身份证人像面照片</span>
            </div>
          </el-upload>
          <el-upload
            class="pic-uploader"
            action
            :show-file-list="false"
            :before-upload="beforeCardBackUpload"
            accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp"
          >
            <div class="pic-upload-box">
              <img v-if="form.idCardPicBack" :src="form.idCardPicBack" alt class="img" draggable="false" />
              <span v-else class="upload-tips">+上传身份证国徽面照片</span>
            </div>
          </el-upload>
          <p class="form-tips">请上传身份证照片，1M以内。</p>
        </el-form-item>
      </template>
      <template v-if="tabsActive == '2'">
        <el-form-item label="营业执照：" prop="licensePic">
          <el-upload
            class="pic-uploader"
            action
            :show-file-list="false"
            :before-upload="beforeLicensePicUpload"
            accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp"
          >
            <div class="pic-upload-box">
              <img v-if="form.licensePic" :src="form.licensePic" alt class="img" draggable="false" />
              <span v-else class="upload-tips">+上传营业执照照片</span>
            </div>
          </el-upload>
          <p class="form-tips">请上传营业执照照片，1M以内。</p>
        </el-form-item>
      </template>
      <div class="item-title">
        <span class="main-title">品牌信息</span>
      </div>
      <el-form-item label="商品名称或品牌：" prop="brand">
        <el-input v-model="form.brand" placeholder="商品名称或品牌" class="max-width-640"></el-input>
      </el-form-item>
      <el-form-item label="品牌证明材料：" prop="prove">
        <template v-for="(item, index) in form.prove">
          <div class="pic-uploader" :key="index">
            <div class="pic-upload-box">
              <img :src="item" alt class="img" draggable="false" />
              <span class="delete-btn" @click="deleteProveItem(index)" >
                <i class="el-icon-close icon"></i>
              </span>
            </div>
          </div>
        </template>
        <template v-if="form.prove.length < 6">
          <el-upload
            class="pic-uploader"
            action
            multiple
            :limit="6 - form.prove.length"
            :on-exceed="exceed"
            :show-file-list="false"
            :before-upload="beforeBrandUpload"
            accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp"
          >
            <div class="pic-upload-box">
              <span class="upload-tips">+添加图片</span>
            </div>
          </el-upload>
        </template>
        <p class="form-tips">信息仅用作证实供货商真实性，星辰不会透露任何信息给他人。1M以内，最多上传6张。</p>
      </el-form-item>
      <el-form-item label=" ">
        <div class="btn-box">
          <el-button class="normal-btn" @click="goback">取消</el-button>
          <el-button type="primary" class="normal-btn" @click="submitForm" :loading="submitLoading" :disabled="status == 3">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-dialog
      title="温馨提示"
      :visible.sync="submitTipsDialog"
      width="544px"
      center
      custom-class="certification-tips-dialog"
      @closed="goback"
    >
      <div class="dialog-body">
        <i class="tips-icon"></i>
        <p class="tips-text">认证信息已提交，</p>
        <p class="tips-text">预计将在3~5个工作日完成审核，请注意接听审核人员来电；</p>
        <p class="tips-text">如紧急，请联系客服：029-85576630</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="normal-btn" @click="goback">完 成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qiniuUploadFile from "@/api/qiniu/uploadFile";
import uuidV4 from "uuid/v4";
import { getUserRole } from "@/tools/Cookie";
import inputFilter from '@/directives/input_filter/'


export default {
  name: "Certification",
  directives: {
    inputFilter
  },
  data() {
    return {
      pageLoading: true,
      tabsActive: "1",
      form: {
        name: "", // 姓名
        idCardNo: "", // 身份证号码
        enterpriseName: "", // 企业名称
        licenseNumber: "", // 营业执照号码
        tel: "", // 联系方式
        licensePic: "", // 营业执照 图片
        idCardPic: true,
        idCardPicFront: "", // 身份证正面：
        idCardPicBack: "", // 身份证反面：
        brand: "", // 商品名称或品牌：
        prove: [] // 证明材料
      },
      formRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCardNo: [
          { required: true, message: "请输入身份证号码", trigger: "blur" }
        ],
        tel: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
        idCardPic: [
          {
            required: true,
            message: "请上传身份证正反面图片",
            trigger: "change"
          }
        ],
        enterpriseName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        licenseNumber: [
          { required: true, message: "请输入营业执照号码", trigger: "blur" }
        ],
        licensePic: [
          { required: true, message: "请上传营业执照图片", trigger: "change" }
        ]
      },
      submitTipsDialog: false, // 提交后 温馨提示
      submitLoading: false,
      status: ''
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.pageLoading = true;
      let formData = {};
      this.$api.setting.certification.details(formData)
      .then(res => {
        if(res.data.code === 0) {
          if(res.data.data) {
            this.certInfo = res.data.data;
            this.fillForm(res.data.data)
          };
        } else {
          this.$message.warning(res.data.message)
        }
        this.pageLoading = false;
      })
      .catch(err => {
        this.pageLoading = false;
      })
    },
    tabsChange() {
      this.$refs['form'].clearValidate();
    },
    fillForm(data) {
      console.log(data)
      this.tabsActive = data.type.toString();
      if(data.type === 1) {
        this.form.name = data.name;
        this.form.idCardNo = data.certificate_number;
        this.form.idCardPicFront = data.certificate_front_image;
        this.form.idCardPicBack = data.certificate_back_image;
      };
      if(data.type === 2) {
        this.form.enterpriseName = data.name;
        this.form.licenseNumber = data.certificate_number;
        this.form.licensePic = data.certificate_front_image;
      };
      this.form.tel = data.phone;
      this.form.brand = data.brand_name;
      this.form.prove = data.brand_atlas;
      this.status = data.status
    },
    beforeCardFrontUpload(file) {
      // 身份证正面 上传 before
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
        return false;
      }
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/bmp" &&
        file.type !== "image/gif" &&
        file.type !== "image/png"
      ) {
        this.$message.warning("图片格式仅支持jpeg、png、bmp、gif！");
        return false;
      }
      this.cardFrontUpload(file);
      return false;
    },
    cardFrontUpload(file) {
      // 身份证正面 上传
      let uuid = uuidV4();
      let suffix = `.${this.getFileType(file.name)}`;
      let userInfo = getUserRole();
      let btoken = userInfo.mtoken;
      let key = `explorer/${btoken}/${uuid}${suffix}`;

      qiniuUploadFile(
        file,
        key,
        next => {},
        res => {
          let src = res.domain + res.truekey;
          console.log(src);
          this.form.idCardPicFront = src;
          this.$message.success("上传成功！");
        },
        err => {
          this.$message.error("上传失败！");
        }
      );
    },
    beforeCardBackUpload(file) {
      // 身份证反面 上传 before
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
        return false;
      }
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/bmp" &&
        file.type !== "image/gif" &&
        file.type !== "image/png"
      ) {
        this.$message.warning("图片格式仅支持jpeg、png、bmp、gif！");
        return false;
      }
      this.cardBackUpload(file);
      return false;
    },
    cardBackUpload(file) {
      // 身份证反面 上传
      let uuid = uuidV4();
      let suffix = `.${this.getFileType(file.name)}`;
      let userInfo = getUserRole();
      let btoken = userInfo.mtoken;
      let key = `explorer/${btoken}/${uuid}${suffix}`;

      qiniuUploadFile(
        file,
        key,
        next => {},
        res => {
          // console.log(res.domain + res.truekey);
          this.form.idCardPicBack = res.domain + res.truekey;
          this.$message.success("上传成功！");
        },
        err => {
          this.$message.error("上传失败！");
        }
      );
    },
    beforeLicensePicUpload(file) {
      // 营业执照 上传 before
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
        return false;
      }
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/bmp" &&
        file.type !== "image/gif" &&
        file.type !== "image/png"
      ) {
        this.$message.warning("图片格式仅支持jpeg、png、bmp、gif！");
        return false;
      }
      this.licensePicUpload(file);
      return false;
    },
    licensePicUpload(file) {
      // 营业执照 上传
      let uuid = uuidV4();
      let suffix = `.${this.getFileType(file.name)}`;
      let userInfo = getUserRole();
      let btoken = userInfo.mtoken;
      let key = `explorer/${btoken}/${uuid}${suffix}`;

      qiniuUploadFile(
        file,
        key,
        next => {},
        res => {
          // console.log(res.domain + res.truekey);
          this.form.licensePic = res.domain + res.truekey;
          this.$message.success("上传成功！");
        },
        err => {
          this.$message.error("上传失败！");
        }
      );
    },
    exceed() {
      this.$message.warning("最多上传6张证明材料照片！")
    },
    beforeBrandUpload(file) {
      // 品牌证明材料 上传 before
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
        return false;
      }
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/bmp" &&
        file.type !== "image/gif" &&
        file.type !== "image/png"
      ) {
        this.$message.warning("图片格式仅支持jpeg、png、bmp、gif！");
        return false;
      }
      this.brandUpload(file);
      return false;
    },
    brandUpload(file) {
      // 品牌证明材料 上传
      let uuid = uuidV4();
      let suffix = `.${this.getFileType(file.name)}`;
      let userInfo = getUserRole();
      let btoken = userInfo.mtoken;
      let key = `explorer/${btoken}/${uuid}${suffix}`;

      qiniuUploadFile(
        file,
        key,
        next => {},
        res => {
          // console.log(res.domain + res.truekey);
          let src = res.domain + res.truekey;
          let prove = this.form.prove;
          prove.push(src);
          this.form.prove = prove;
          // this.$message.success("上传成功！");
        },
        err => {
          this.$message.error("上传失败！");
        }
      );
    },
    getFileType(filePath) {
      let startIndex = filePath.lastIndexOf(".");
      if (startIndex != -1) {
        return filePath
          .substring(startIndex + 1, filePath.length)
          .toLowerCase();
      } else {
        return "";
      }
    },
    deleteProveItem(index) {
      // 删除 品牌证明材料： item
      let prove = this.form.prove;
      prove.splice(index, 1);
      this.form.prove = prove;
    },
    isCardNo(card) { 
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
      if(reg.test(card) === false){ 
        return false; 
      } else {
        return true
      }
    },
    resetForm() {
      this.$refs["form"].resetFields();
      this.form.idCardPicFront =  "";
      this.form.idCardPicBack = "";
    },
    submitForm() {
      this.$refs['form'].validate((valid, obj) => {
        if (valid) {
          if(this.form.idCardPicFront == '' && this.tabsActive == '1') {
            this.$message.warning('请上传身份证正面照！');
            return false;
          };
          if(this.form.idCardPicFront == '' && this.tabsActive == '1') {
            this.$message.warning('请上传身份证反面照！');
            return false;
          };
          if(this.tabsActive == '1' && !this.isCardNo(this.form.idCardNo)) {
            this.$message.warning('身份证号码格式不正确！');
            return false;
          };
          if (this.form.tel == '') {
            this.$message.warning("请输入正确的联系方式！");
            return false;
          };
          this.submit()
        } else {
          let key = Object.keys(obj)[0];
          let msg = obj[key][0].message;
          this.$message.warning(msg);
          return false;
        }
      });
    },
    goback() {
      this.$router.push('/setting/')
    },
    submit() {
      this.submitLoading = true;
      let formData = {};
      let form = this.form;
      if(this.tabsActive == '1') {
        formData = {
          type: '1',
          name: form.name,
          phone: form.tel,
          certificate_number: form.idCardNo,
          certificate_front_image: form.idCardPicFront,
          certificate_back_image: form.idCardPicBack,
          brand_name: form.brand,
          brand_atlas: form.prove
        }
      };
      if(this.tabsActive == '2') {
        formData = {
          type: '2',
          name: form.enterpriseName,
          phone: form.tel,
          certificate_number: form.licenseNumber,
          certificate_front_image: form.licensePic,
          brand_name: form.brand,
          brand_atlas: form.prove
        }
      };
      this.$api.setting.certification.save(formData)
      .then(res => {
        if(res.data.code === 0) {
          // this.$message.success(res.data.message)
          this.submitTipsDialog = true;
        } else {
          this.$message.warning(res.data.message)
        };
        this.submitLoading = false;
      })
      .catch(err => {
        this.submitLoading = false;
      })
    },
  }
};
</script>

<style>
@import url("./style/setting.min.css");
</style>