<template>
  <div class="page-info setting-page">
    <div class="tabs-box">
      <el-tabs v-model="activeName" type="card" @tab-click="tabsChange">
        <el-tab-pane label="基础信息" name="1"></el-tab-pane>
        <el-tab-pane label="品牌加盟页弹窗" name="2"></el-tab-pane>
        <el-tab-pane label="页面信息" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="scroll-box">
      <el-collapse v-model="collapseActive" accordion>
        <el-collapse-item title="品牌加盟" name="1">
          <PageInfoForm></PageInfoForm>
        </el-collapse-item>
        <el-collapse-item title="产品介绍" name="2">
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
        </el-collapse-item>
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
      collapseActive: '1',
      submitLoading: false
    }
  },
  components: {
    PageInfoForm
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