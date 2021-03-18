<template>
  <div class="join-dialog-setting setting-page" v-loading="loading">
    <div class="tabs-box">
      <el-tabs v-model="activeName" type="card" @tab-click="tabsChange">
        <el-tab-pane label="基础信息" name="1"></el-tab-pane>
        <el-tab-pane label="品牌加盟页弹窗" name="2"></el-tab-pane>
        <el-tab-pane label="页面信息" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="scroll-box">
      <el-form
        :model="form"
        :rules="formRules"
        ref="joinDialogFrom"
        label-width="100px"
        size="small"
      >
        <el-form-item label="弹窗图：" prop="image">
          <div class="goods-img-list clearfix">
            <template v-if="form.image">
              <div class="item img-item">
                <el-image
                  style="width: 88px; height: 88px"
                  :src="form.image"
                  fit="cover"
                  draggable="false"
                >
                  <img slot="error" class="image-error-icon" src="https://cdn.xingchen.cn/FssW3_T3DRshGt5I-TwCb3gWejyd" alt="">
                </el-image>
                <span class="close-btn" @click="deletePic">
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
            <el-radio :label="1">无</el-radio>
            <el-radio :label="2">文章资讯</el-radio>
            <el-radio :label="3">外部链接</el-radio>
          </el-radio-group>
          <div v-if="form.event == 2" style="padding-left: 68px;">
            <template v-if="selectedArticleName">
              <span class="v-mid c-666">已选择：</span>
              <span class="v-mid c-999">{{selectedArticleName}}</span>
              <i class="el-icon-delete delete-icon v-mid" @click="form.article = '' "></i>
            </template>
            <template v-else>
              <el-link type="primary" :underline="false" @click="showArticleSelector = true;">选择文章资讯</el-link>
            </template>
          </div>
          <div v-else-if="form.event == 3" class="mg-t-10 max-640" style="padding-left: 180px;">
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
        type="primary"
        class="normal-btn"
        @click="submitHandle('submit')"
        :loading="submitLoading"
      >保存</el-button>
    </div>

    <ArticleSelector
      v-if="showArticleSelector"
      :articleList="articleList"
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
      activeName: '2',
      loading: false,
      form: {
        image: '',
        date: null,
        event: 1,
        url: '',
        article: ''
      },
      formRules: {
        image: { required: true, message: "请选择文章展示图", trigger: "change" },
      },
      upfileLoading: false,
      submitLoading: false,
      showArticleSelector: false,
      articleList: []
    }
  },
  computed: {
    selectedArticleName() {
      let id = this.form.article, list = this.articleList, name = '';
      if(id) {
        for(let item of list) {
          if(item.id == id) {
            name = item.title;
            break
          }
        }
      };
      return name;
    }
  },
  components: {
    ArticleSelector
  },
  created() {
    this.getArticleList();
    this.getDetails();
  },
  methods: {
    tabsChange(val) {
      if(val.name == '1') {
        this.$router.push({
          name: 'BaseInfoSetting'
        })
      } else if(val.name == '3') {
        this.$router.push({
          name: 'PageInfo'
        })
      }
    },
    getDetails() {
      this.loading = true;
      let formData = {
        fields: ['join_popup']
      };
      this.$api.setting
        .details(formData)
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data.join_popup;
            this.form.image = data.image;
            this.form.date = [data.startDate, data.endDate];
            this.form.event = Number(data.gotoType);

            if(data.gotoType == 2) {
              this.form.article = data.gotoArticleId;
            } else if(data.gotoType == 3) {
              this.form.url = data.gotoLink;
            };
          } else {
            this.$message.warning(res.data.message);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getArticleList(currentPage) {
      let formData = {
        page: 1,
        limit: 999
      };

      this.$api.article.manage
        .list(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            console.log("getList -> getList", resData)
            if(resData) {
              this.articleList = resData.items;
            } else {
              this.articleList = [];
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deletePic() {
      this.form.image = ''
    },
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
      // let name = file.name;
      this.form.image = src;
    },
    articleSelectorClosed() {
      this.showArticleSelector = false;
    },
    articleSelectorSubmit(val) {
      this.form.article = val;
      this.showArticleSelector = false;
    },
    cancelHandle() {
      this.$router.go(-1)
    },
    submitHandle(type) {
      /**
       * @description: 提交
       * @param { type } 
       */  
      this.$refs['joinDialogFrom'].validate((valid) => {
        let form = this.form;
        if(form.event == 2 && !form.article) {
          this.$message.warning('请选择文章')
          return false
        } else if(form.event == 3 && !form.url) {
          this.$message.warning('请输入链接')
          return false
        };
        if (valid) {
          this.submitLoading = true;
          let join_popup = {
            image: form.image,
            gotoType: form.event
          };
          if(form.date) {
            join_popup.startDate = form.date[0];
            join_popup.endDate = form.date[1];
          };
          if(form.event == 2) {
            join_popup.gotoArticleId = form.article;
          } else if(form.event == 3) {
            join_popup.gotoLink = form.url;
          };
          let formData = {
            fields: {
              join_popup
            }
          };
          this.$api.setting
            .save(formData)
            .then(res => {
              if (res.data.code === 0) {
                this.getDetails();
                this.$message.success('保存成功')
              } else {
                this.$message.warning(res.data.message);
              }
              this.submitLoading = false;
            })
            .catch(err => {
              this.submitLoading = false;
            });
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