<template>
  <div class="join-dialog-setting setting-page">
    <div class="tabs-box">
      <el-tabs v-model="activeName" type="card"  @tab-click="tabsChange">
        <el-tab-pane label="基础信息" name="1"></el-tab-pane>
        <el-tab-pane label="品牌加盟页弹窗" name="2"></el-tab-pane>
        <el-tab-pane label="页面信息" name="3"></el-tab-pane>
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
        <el-form-item label="联系电话：" prop="phone">
          <el-input v-model="form.phone" class="max-w-600" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="addr">
          <el-input v-model="form.addr" class="max-w-600" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="二维码：" prop="qrcode">
          <div class="goods-img-list clearfix">
            <template v-if="form.qrcode">
              <div class="item img-item">
                <el-image
                  style="width: 88px; height: 88px"
                  :src="form.qrcode"
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
            <template v-else>
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
          <p class="form-tips">建议尺寸：宽300px，高300px，最大3M。</p>
        </el-form-item>
        <el-form-item label="ICP备案号：" prop="icp">
          <el-input v-model="form.icp" class="max-w-600" placeholder="请输入ICP备案号"></el-input>
        </el-form-item>
        <el-form-item label="统计代码：" prop="code">
          <el-input type="textarea" class="max-w-600" v-model="form.code" placeholder="请输入统计代码" :autosize="{ minRows: 5, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer-box">
      <el-button
        class="normal-btn"
        @click="cancelHandle"
      >取消</el-button>
      <el-button
        type="primary"
        class="normal-btn"
        @click="submitHandle()"
        :loading="submitLoading"
      >保存</el-button>
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
        phone: '',
        addr: '',
        qrcode: '',
        icp: '',
        code: ''
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
    tabsChange(val) {
      if(val.name == '2') {
        this.$router.push({
          name: 'JoinDialogSetting'
        })
      } else if(val.name == '3') {
        this.$router.push({
          name: 'PageInfo'
        })
      }
    },
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