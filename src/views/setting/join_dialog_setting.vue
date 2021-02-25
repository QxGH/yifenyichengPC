<template>
  <div class="join-dialog-setting">
    <div class="tabs-box">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="品牌加盟页弹窗" name="1"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="scroll-box">
      <el-form
        :model="form"
        :rules="formRules"
        ref="bannerFrom"
        label-width="100px"
        size="small"
      >
        <el-form-item label="弹窗图：" prop="atlas">
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
        <el-form-item label="弹窗时间：" prop="date">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            size="small"
            clearable
            :default-time="['00:00:00', '23:59:59']"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
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
  name: 'JoinDialogSetting',
  data() {
    return {
      activeName: '1',
      form: {
        atlas: [],
        date: '',
        event: 0,
        url: '',
        article: ''
      },
      formRules: {
        atlas: { required: true, message: "请选择文章展示图", trigger: "change" },
      },
      upfileLoading: false,
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