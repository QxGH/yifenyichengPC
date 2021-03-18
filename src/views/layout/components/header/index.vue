<template>
  <div class="header clearfix">
    <div
      class="current-menu"
      style="font-size: 20px; font-weight: bold;"
      v-if="isHome"
    >{{shopName}}</div>
    <div class="current-menu" v-else>{{breadcrumb}}</div>
    <div class="pull-right d-flex-lr">
      <el-popover popper-class="header-dropdown" placement="bottom" width="300" trigger="hover">
        <div class="user-info" slot="reference">
          <div>
            <span class="name">{{ userName ? userName : '' }}</span>
            <i class="icon el-icon-arrow-right"></i>
          </div>
        </div>
        <ul class="dropdown-list">
          <li class="item clearfix" @click="command('changePwd')">
            <label class="item-title pull-left">修改密码</label>
            <!-- <div class="item-details pull-right">
              <span class="phone" style>{{userName}}</span>
              <i class="icon el-icon-arrow-right"></i>
            </div> -->
          </li>
        </ul>
        <div class="logout-box" @click="command('logout')">
          <label class="item-title pull-left">退出登录</label>
          <div class="item-details pull-right">
            <i class="icon el-icon-switch-button"></i>
          </div>
        </div>
      </el-popover>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="changePwdDialog"
      width="500px"
      center
      @closed="changePwdClosed">
      <div class="dialog-body" style="padding: 0 20px;">
        <el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="100px" size="small">
          <el-form-item label="旧密码：" prop="old">
            <el-input v-model="pwdForm.old" autocomplete="new-password" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="new">
            <el-input v-model="pwdForm.new" autocomplete="new-password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="confirm">
            <el-input v-model="pwdForm.confirm" autocomplete="new-password" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePwdDialog = false" class="normal-btn">取 消</el-button>
        <el-button type="primary" @click="changePwdSubmit" :loading="submitLoading" class="normal-btn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { clearCookie } from "@/tools/Cookie";

export default {
  name: "headerBar",
  data() {
    return {
      isHome: true,
      shopName: '文章管理',
      breadcrumb: '',
      userName: '',
      changePwdDialog: false,
      pwdForm: {
        old: '',
        new: '',
        confirm: ''
      },
      pwdRules: {
        old: { required: true, message: '请输入旧密码', trigger: 'blur' },
        new: { required: true, message: '请输入新密码', trigger: 'blur' },
        confirm: { required: true, message: '请输入确认密码', trigger: 'blur' },
      },
      submitLoading: false
    };
  },
  watch: {
    $route(to, from) {
      this.setBeadcrumb();
    },
  },
  created() {
    this.userName = localStorage.getItem('yfyc_name');
    this.setBeadcrumb();
  },
  methods: {
    setBeadcrumb() {
      // 设置面包屑
      let path = this.$route.path;
      let routeName = this.$route.name;
      let params = this.$route.params;
      console.log("🚀 ~ file: index.vue ~ line 278 ~ setBeadcrumb ~ path", this.$route)
      let breadcrumb = this.$route.meta.breadcrumb;
      if(path == '/home' || path.indexOf('/helpCenter') != '-1') {
        this.isHome = true;
      } else {
        this.isHome = false;
      };

      // 创建统一活动
      if(routeName == 'CreateInteractiveGame') {
        let type = Number(params.type);
        switch(type) {
          case 10004:
            breadcrumb = '大转盘';
            break;
        }
      }
      this.breadcrumb = breadcrumb ? breadcrumb : '';

      this.showHelpAndSearch = false;
    },
    changePwdClosed() {
      this.$refs['pwdForm'].resetFields();
    },
    changePwdSubmit() {
      this.$refs['pwdForm'].validate((valid) => {
        if (valid) {
          if(this.pwdForm.new.length < 8) {
            this.$message.warning('密码需为8-18位至少包含小写字母、大写字母、数字、特殊符号')
            return
          };
          if(this.pwdForm.new != this.pwdForm.confirm) {
            this.$message.warning('两次输入新密码不一致')
            return
          };
          this.submitLoading = true;
          let formData = {
            old_password: this.pwdForm.old,
            password: this.pwdForm.new
          };
          this.$api.account.info
            .changePwd(formData)
            .then(res => {
              this.submitLoading = false;
              this.changePwdDialog = false;
              if (res.data.code === 0) {
                this.$message.success('修改成功，请重新登录')
                this.logout()
              } else {
                this.$message.warning(res.data.message);
              };
            })
            .catch(err => {
              this.submitLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    command(event) {
      switch (event) {
        case "logout":
          this.logout();
          break;
        case "changePwd":
          this.changePwd();
          break;
      }
    },
    logout() {
      clearCookie();
      this.$router.push({
        name: 'Login'
      })
    },
    changePwd() {
      this.changePwdDialog = true;
    }
  }
};
</script>

<style lang="scss">
@import "./style/index.scss";
</style>