<template>
  <div class="page-info-form">
    <el-form
        :model="form"
        :rules="formRules"
        ref="bannerFrom"
        label-width="100px"
        size="small"
      >
        <el-form-item label="标题：" prop="title">
          <el-input v-model="form.title" class="max-w-600" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="关键字：" prop="keyword">
          <el-input v-model="form.keyword" class="max-w-600" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="description">
          <el-input v-model="form.description" class="max-w-600" placeholder="请输入描述"></el-input>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'PageInfoForm',
  props: ['form'],
  data() {
    return {
      formRules: {}
    }
  },
}
</script>

<style>

</style>