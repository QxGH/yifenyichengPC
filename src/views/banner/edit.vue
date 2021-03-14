<template>
  <div class="banner-edit" v-loading="loading">
    <div class="scroll-box">
      <el-form
        :model="form"
        :rules="formRules"
        ref="bannerFrom"
        label-width="100px"
        size="small"
      >
        <el-form-item label="名称：" prop="name">
          <el-input v-model="form.name" class="max-640 pd-r-inp-55" maxlength="100" placeholder="请输入轮播名称"></el-input>
        </el-form-item>
        <el-form-item label="轮播图：" prop="image">
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
        class="normal-btn"
        @click="submitHandle('reset')"
        :loading="submitLoading"
      >保存并继续添加</el-button>
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
  name: 'BannerEdit',
  data() {
    return {
      editId: null,
      loading: false,
      form: {
        name: '',
        image: '',
        index: '',
        event: 1,
        url: '',
        article: ''
      },
      formRules: {
        name: { required: true, message: "请输入文章名称", trigger: "blur" },
        image: { required: true, message: "请选择文章展示图", trigger: "change" },
      },
      submitLoading: false,
      showArticleSelector: false,
      upfileLoading: false,
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
    let id = this.$route.params.id;
    if(id != 0) {
      this.editId = id;
      this.getDetails()
    }
  },
  methods: {
    getDetails() {
      this.loading = true;
      let formData = {
        id: this.editId
      };
      this.$api.banner
        .details(formData)
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data;
            this.form.name = data.name;
            this.form.image = data.image;
            this.form.index = data.sort;
            this.form.event = data.goto_type;
            if(data.goto_type == 2) {
              this.form.article = data.goto_article_id;
            };
            if(data.goto_type == 3) {
              this.form.url = data.goto_link;
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
      this.$refs['bannerFrom'].validate((valid) => {
        if (valid) {
          if(this.form.article == '' && this.form.event == 2) {
            this.$message.warning('请选择文章')
            return
          };
           if(this.form.url == '' && this.form.event == 3) {
            this.$message.warning('请输入外部链接')
            return
          };
          this.submitLoading = true;
          let formData = {
            type: this.$route.params.type,
            name: this.form.name,
            image: this.form.image,
            sort: this.form.index,
            goto_type: this.form.event
          };
          if(this.editId) {
            formData.id = this.editId;
          };
          if(this.form.event == 2) {
            formData.goto_article_id = this.form.article
          };
          if(this.form.event == 3) {
            formData.goto_link = this.form.url
          };
          this.$api.banner
            .save(formData)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success('保存成功')
                if(type == 'reset') {
                  this.resetForm()
                } else {
                  this.$router.push({
                    name: 'BannerManage',
                    params: {
                      type: this.$route.params.type
                    }
                  })
                }
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