<template>
  <div class="banner-edit">
    <div class="scroll-box">
      <el-form
        :model="form"
        :rules="formRules"
        ref="bannerFrom"
        label-width="100px"
        size="small"
      >
        <el-form-item label="名称：" prop="name">
          <el-input v-model="form.name" class="max-640 pd-r-inp-55" maxlength="60" show-word-limit placeholder="请输入文章名称，60个字以内"></el-input>
        </el-form-item>
        <el-form-item label="轮播图：" prop="atlas">
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
            <template v-if="form.atlas.length < 1">
              <el-upload
                class="image-uploader"
                :limit="1"
                action
                :show-file-list="false"
                :before-upload="beforeUpload"
                accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp"
                v-loading="upfileLoading"
              >
                <div class="item add-item">
                  <i class="el-icon-plus add-icon"></i>
                  <span>添加图片</span>
                </div>
              </el-upload>
              
            </template>
          </div>
          <p class="form-tips">建议尺寸：宽1900px，高500px，最大3M。</p>
        </el-form-item>
        <el-form-item label="排序：" prop="index">
          <el-input 
            v-model="form.index" 
            class="max-640" 
            maxlength="10" 
            placeholder="数字越大越靠前"
          ></el-input>
        </el-form-item>
        <el-form-item label="点击事件：" prop="event">
          <el-radio-group v-model="form.event">
            <el-radio :label="0">无</el-radio>
            <el-radio :label="1">文章资讯</el-radio>
            <el-radio :label="2">外部链接</el-radio>
          </el-radio-group>
          <div v-if="form.event == 1" style="padding-left: 68px;">
            <el-link type="primary" :underline="false" @click="showArticleSelector = true;">选择文章资讯</el-link>
          </div>
          <div v-else-if="form.event == 2" class="mg-t-10 max-640" style="padding-left: 180px;">
            <el-input 
              v-model="form.url" 
              class="max-640" 
              placeholder="请输入外部地址"
            ></el-input>
          </div>

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

    <ArticleSelector
      v-if="showArticleSelector"
      @closed="articleSelectorClosed"
      @submit="articleSelectorSubmit"
    ></ArticleSelector>
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";
import qiniuUploadFile from "@/api/qiniu/uploadFile";
import ArticleSelector from "@/components/article_selector"

export default {
  name: 'BannerEdit',
  data() {
    return {
      editId: null,
      form: {
        name: '',
        atlas: [],
        index: '',
        event: 0,
        url: '',
        article: ''
      },
      formRules: {
        name: { required: true, message: "请输入文章名称", trigger: "blur" },
        atlas: { required: true, message: "请选择文章展示图", trigger: "change" },
      },
      submitLoading: false,
      showArticleSelector: false
    }
  },
  components: {
    ArticleSelector
  },
  created() {
    let id = this.$route.params.id;
    if(id != 0) {
      this.editId = id;
      this.getDetails()
    }
  },
  methods: {
    getDetails() {
      
    },
    deletePic(index) {},
    beforeUpload(file) {
      // 上传
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.$message.error("上传图片大小不能超过 3MB!");
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
      let key = `explorer/bannerImage/${uuid}${suffix}`;
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
    articleSelectorClosed() {
      this.showArticleSelector = false;
    },
    articleSelectorSubmit(val) {
      debugger;
    },
    cancelHandle() {
      this.$router.go(-1)
    },
    submitHandle(type) {
      /**
       * @description: 提交
       * @param { type } 
       */  
      this.$refs['bannerFrom'].validate((valid) => {
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