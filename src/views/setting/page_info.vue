<template>
  <div class="page-info setting-page" v-loading="loading">
    <div class="tabs-box">
      <el-tabs v-model="activeName" type="card" @tab-click="tabsChange">
        <el-tab-pane label="基础信息" name="1"></el-tab-pane>
        <el-tab-pane label="品牌加盟页弹窗" name="2"></el-tab-pane>
        <el-tab-pane label="页面信息" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="scroll-box">
      <el-collapse v-model="collapseActive" accordion>
        <template v-for="(item, index) in list">
          <el-collapse-item :title="itemTitle(index)" :name="index+1" :key="index">
            <PageInfoForm :form="item"></PageInfoForm>
          </el-collapse-item>
        </template>
        
        <!-- <el-collapse-item title="产品介绍" name="2">
          <PageInfoForm></PageInfoForm>
        </el-collapse-item>
        <el-collapse-item title="门店展示" name="3">
          <PageInfoForm></PageInfoForm>
        </el-collapse-item>
        <el-collapse-item title="品牌介绍" name="4">
          <PageInfoForm></PageInfoForm>
        </el-collapse-item>
        <el-collapse-item title="新闻资讯" name="5">
          <PageInfoForm></PageInfoForm>
        </el-collapse-item> -->
      </el-collapse>
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
  </div>
</template>

<script>
import PageInfoForm from './components/page_info_form'
export default {
  name: 'PageInfo',
  data() {
    return {
      activeName: '3',
      list: [],
      loading: false,
      collapseActive: 1,
      submitLoading: false
    }
  },
  components: {
    PageInfoForm
  },
  created() {
    this.getDetails();
  },
  methods: {
    tabsChange(val) {
      if(val.name == '1') {
        this.$router.push({
          name: 'BaseInfoSetting'
        })
      } else if(val.name == '2') {
        this.$router.push({
          name: 'JoinDialogSetting'
        })
      }
    },
    getDetails() {
      this.loading = true;
      let formData = {
        fields: ['page_info']
      };
      this.$api.setting
        .details(formData)
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data.page_info;
            this.list = data;
            console.log("🚀 ~ file: page_info.vue ~ line 89 ~ getDetails ~ data", data)
          } else {
            this.$message.warning(res.data.message);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    itemTitle(index) {
      let map = {
        0: '品牌加盟',
        1: '产品介绍',
        2: '门店展示',
        3: '品牌介绍',
        4: '新闻资讯',
      };
      return map[index];
    },
    cancelHandle() {
      this.$router.go(-1)
    },
    submitHandle(type) {
      /**
       * @description: 提交
       * @param { type } 
       */  
      this.submitLoading = true;
        let page_info = this.list;
        let formData = {
          fields: {
            page_info
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
    }
  }
}
</script>

<style lang="scss">
@import './style/index.scss';
</style>