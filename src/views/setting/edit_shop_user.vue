<template>
  <div class="edit-shop-user" v-loading="pageLoading">
    <div class="page-title">核销员信息</div>
    <el-form :model="form" :rules="formRules" ref="userForm" label-width="100px">
      <el-form-item label="核销员姓名" prop="name">
        <el-input v-model="form.name" class="max-width-640" placeholder="请输入核销员姓名"></el-input>
      </el-form-item>
      <el-form-item label="登录手机号" prop="account">
        <el-input
          v-model="form.account"
          class="max-width-640"
          autocomplete="off"
          @input="onlyInputInt"
          maxlength="11"
          placeholder="请输入登录手机号"
        ></el-input>
        <p class="form-tips">核销员登录小程序核销端的账号，添加后员工可在商家管理小程序端手机号+验证码登录。</p>
      </el-form-item>
      <!-- <el-form-item label="登录密码" prop="password">
        <el-input
          v-model="form.password"
          show-password
          class="max-width-640"
          @input="onlyEnglishNumberLine"
          placeholder="请输入核销员登录密码"
          autocomplete="new-password"
        ></el-input>
        <p class="form-tips">核销员添加成功后，登录帐号和密码将以短信形式发送到核销员手机。</p>
      </el-form-item>
      <el-form-item label="核销员联系方式：" prop="tellPhone">
        <el-input v-model="form.tellPhone" class="max-width-640" placeholder="请输入核销员联系方式"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button @click="goback" class="normal-btn" :loading="btnLoading">取 消</el-button>
        <el-button type="primary" @click="submitForm('userForm')" class="normal-btn" :loading="btnLoading">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "EditShopUser",
  data() {
    return {
      btnLoading: false,
      pageLoading: true,
      form: {
        name: "",
        account: "",
        password: "",
        tellPhone: ""
      },
      formRules: {
        name: [
          { required: true, message: "请输入核销员姓名", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入核销员账号", trigger: "blur" }
        ],
        // password: [
        //   { required: true, message: "请输入核销员密码", trigger: "blur" }
        // ],
        // tellPhone: [
        //   { required: true, message: "请输入核销员联系方式", trigger: "blur" }
        // ]
      },
      userId: ''
    };
  },
  created() {
    if(this.$route.params.userId != 0) {
      this.userId = this.$route.params.userId;
      this.getDetails(this.$route.params.userId);
    } else {
      this.pageLoading = false
    }
  },
  methods: {
    getDetails(userId) {
      this.pageLoading = true
      let formData = {
        id: userId
      };
      this.$api.shop.verifier.details(formData)
      .then(res => {
        if(res.data.code === 0) {
          let resData = res.data.data;
          this.form.name = resData.truename
          this.form.account = resData.name;
        } else {
          this.$message.warning(res.data.message)
        };
        this.pageLoading = false
      })
      .catch(err => {
        this.pageLoading = false
      })
    },
    onlyEnglishNumber(val) {
      let account = this.form.account;
      account = account.replace(/[\W]/g, "");
      this.form.account = account;
    },
    onlyEnglishNumberLine(val) {
      let pwd = this.form.password;
      pwd = pwd.replace(/[^\w_-]/g, "");
      this.form.password = pwd;
    },
    onlyInputInt(val) {
      this.form.account = val.replace(/^(0+)|[^\d]+/g, "");
    },
    goback() {
      let prevPage = this.$route.params.prevPage;
      this.$router.push({
        name: "ShopUser",
        params: {
          shopID: this.$route.params.shopID,
          prevPage
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          if(!(/^1[3456789]\d{9}$/.test(this.form.account))) {
            this.$message.warning('请输入正确的手机号！')
            return false;
          };
          this.submit()
        } else {
          let key = Object.keys(obj)[0];
          let msg = obj[key][0].message
          this.$message.warning(msg)
          return false;
        }
      });
    },
    resetForm() {
      this.form = {
        name: "",
        account: "",
        password: "",
        tellPhone: ""
      }
    },
    submit() {
      this.btnLoading = true;
      let formData = {
        shop_id: this.$route.params.shopID,
        truename: this.form.name,
        name: this.form.account,
      };
      if(this.userId) {
        formData.id = this.userId
      };
      this.$api.shop.verifier.save(formData)
      .then(res => {
        if(res.data.code === 0) {
          this.$message.success('保存成功！')
          if(this.userId) {
            this.goback()
          } else {
            this.$router.push({
              name: "ShopUser",
              params: {
                shopID: this.$route.params.shopID,
                prevPage: 1
              }
            });
          }
        } else {
          this.$message.warning(res.data.message)
        }
        this.btnLoading = false;
      })
      .catch(err => {
        this.btnLoading = false;
      })

    }
  }
};
</script>

<style>
@import url("./style/setting.min.css");
</style>