<template>
  <div class="article-edit">
    <div class="scroll-box">
      <el-form
        :model="form"
        :rules="formRules"
        ref="articleFrom"
        label-width="100px"
        size="small"
      >
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="form.name" class="max-640 pd-r-inp-55" maxlength="60" show-word-limit placeholder="请输入文章名称，60个字以内"></el-input>
        </el-form-item>
        <el-form-item label="展示图：" prop="atlas">
          <div class="goods-img-list clearfix">
            <template v-for="(item, index) in form.atlas">
              <div class="item img-item" :key="index">
                <el-image
                  style="width: 88px; height: 88px"
                  :src="item"
                  fit="cover"
                  draggable="false"
                >
                  <img slot="error" class="image-error-icon" src="https://cdn.xingchen.cn/FssW3_T3DRshGt5I-TwCb3gWejyd" alt="">
                </el-image>
                <span class="close-btn" @click="deletePic(index)">
                  <i class="el-icon-close close-icon"></i>
                </span>
              </div>
            </template>
            <template v-if="form.atlas.length < 6">
              <el-upload
                class="image-uploader"
                multiple
                :limit="6"
                action
                :show-file-list="false"
                :before-upload="beforeUpload"
                accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp"
                :on-exceed="limitExceed"
                v-loading="upfileLoading"
              >
                <div class="item add-item">
                  <i class="el-icon-plus add-icon"></i>
                  <span>添加图片</span>
                </div>
              </el-upload>
            </template>
          </div>
          <p class="form-tips">建议尺寸：750 * 750 像素，最大1M，最多6张，第一张将用于列表展示。</p>
        </el-form-item>
        <el-form-item label="分组：" prop="group">
          <el-select 
            v-model="form.group" 
            multiple 
            placeholder="请选择分组"
          >
            <el-option
              v-for="item in groupOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="group-opt mg-l-20">
            <span class="text-btn" @click="refreshGroup">刷新</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-btn" @click="creadeGroup">新建分类</span>
          </div>
        </el-form-item>
        <el-form-item label="排序：" prop="index">
          <el-input 
            v-model="form.index" 
            class="max-640" 
            maxlength="10" 
            placeholder="数字越大越靠前"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章内容：" prop="details">
          <div class="tiymce-box">
            <UE :richText="UeRichText" :width="870" :height="360" @callback="ueChange"></UE>
          </div>
          <!-- <div>
            <span style="color: #2589FF; cursor: pointer;" @click="collectionWx">
              采集微信文章
            </span>
          </div> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="footer-box">
      <el-button
        class="normal-btn"
        @click="cancelHandle"
      >取消</el-button>
      <el-button
        class="normal-btn"
        @click="submitHandle('reset')"
        :loading="submitLoading"
      >上架并继续添加</el-button>
      <el-button
        type="primary"
        class="normal-btn"
        @click="submitHandle('submit')"
        :loading="submitLoading"
      >上架</el-button>
    </div>
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";
import qiniuUploadFile from "@/api/qiniu/uploadFile";

export default {
  name: 'ArticleEdit',
  data() {
    return {
      editId: null,
      form: {
        name: '',
        atlas: [],
        group: [],
        index: '',
        details: ''
      },
      formRules: {
        name: { required: true, message: "请输入文章名称", trigger: "blur" },
        atlas: { required: true, message: "请选择文章展示图", trigger: "change" },
        details: { required: true, message: "请输入文章内容", trigger: "blur" }
      },
      groupOptions: [],
      UeRichText: '',
      upfileLoading: false,
      submitLoading: false
    }
  },
  created() {
    let id = this.$route.params.id;
    if(id != 0) {
      this.editId = id;
      this.getDetails()
    }
  },
  methods: {
    refreshGroup() {},
    creadeGroup() {},
    ueChange(val) {
      this.form.details = val;
    },
    getDetails() {
      
    },
    deletePic(index) {},
    beforeUpload(file) {
      // 上传
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
      this.upload(file);
      return false;
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
    upload(file) {
      this.upfileLoading = true;
      let uuid = uuidV4();
      let suffix = `.${this.getFileType(file.name)}`;
      let key = `explorer/aritcleImage/${uuid}${suffix}`;
      // this.uploadList = [];

      qiniuUploadFile(
        file,
        key,
        next => {},
        res => {
          this.uploadSuccess(file, res);
        },
        err => {
          this.$message.error("上传失败！");
          this.upfileLoading = false;
        }
      );
    },
    uploadSuccess(file, uploadRes) {
      this.upfileLoading = false;
      let src = uploadRes.domain + uploadRes.truekey
      let name = file.name;
    },
    limitExceed() {
      this.$message.warning("最大同时上传6张图片！");
      return false;
    },
    cancelHandle() {
      this.$router.go(-1)
    },
    submitHandle(type) {
      /**
       * @description: 提交
       * @param { type } 
       */  
      this.$refs['articleFrom'].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss">
@import './style/index.scss';
</style>