<template>
  <div class="login">
    <header class="login-header">
      <CommonHeader :hideAccount="true"></CommonHeader>
    </header>
    <div class="main" id="pageMain">
      <div class="login-cont clearfix">
        
        <div class="form-box">
          <!-- 扫码登陆 end -->
          <div
            class="form-main"
          >
            <div class="form-group">
              <label class="form-label">账号</label>
              <div class="form-ctrl">
                <input
                  type="text"
                  v-model="form.account"
                  class="input-ctrl"
                  placeholder="请输入账号"
                  maxlength="20"
                  @input="accountInput"
                  @keyup.enter="loginHandle"
                />
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.accountNoTest">
                    <i class="err-icon"></i> 账号不能为空
                  </div>
                </transition>
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="disabledLogin">
                    <i class="err-icon"></i> 账号未注册
                  </div>
                </transition>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">密码</label>
              <div class="form-ctrl">
                <input
                  :type="lookPassword ? 'text' : 'password'"
                  class="input-ctrl"
                  v-model="form.password"
                  placeholder="请输入密码"
                  maxlength="64"
                  @keyup.enter="loginHandle"
                  oncopy="return false"
                  oncut="return false"
                />
                <div class="password-icon-box" @click="lookPwdHandle">
                  <template v-if="lookPassword">
                    <i class="open-icon"></i>
                  </template>
                  <template v-else>
                    <i class="close-icon"></i>
                  </template>
                </div>
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.passwordError">
                    <i class="err-icon"></i> 账号或密码错误
                  </div>
                </transition>
                <transition name="el-zoom-in-top">
                  <div class="err-info" v-show="formRule.passwordNoTest">
                    <i class="err-icon"></i> 密码不能为空
                  </div>
                </transition>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label login-btn-label"></label>
              <div class="form-ctrl">
                <el-button
                  class="login-btn"
                  :disabled="disabledLogin"
                  :loading="loginLoading"
                  @click="loginHandle"
                >登 录</el-button>
                <div
                  class="other-btn clearfix"
                >
                  <button
                    class="forgetPwd-btn"
                    type="button"
                  >忘记密码？</button>
                </div>
              </div>
            </div>
          </div>
          <!-- form end -->
        </div>
      </div>
    </div>
    <div class="particles-box">
      <VueParticles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="90"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="200"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></VueParticles>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CommonHeader from "./components/header";
import VueParticles from "@/components/vue_particles/index.vue";

// VueParticles - option
// color: String类型。默认'#dedede'。粒子颜色。
// particleOpacity: Number类型。默认0.7。粒子透明度。
// particlesNumber: Number类型。默认80。粒子数量。
// shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
// particleSize: Number类型。默认80。单个粒子大小。
// linesColor: String类型。默认'#dedede'。线条颜色。
// linesWidth: Number类型。默认1。线条宽度。
// lineLinked: 布尔类型。默认true。连接线是否可用。
// lineOpacity: Number类型。默认0.4。线条透明度。
// linesDistance: Number类型。默认150。线条距离。
// moveSpeed: Number类型。默认3。粒子运动速度。
// hoverEffect: 布尔类型。默认true。是否有hover特效。
// hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
// clickEffect: 布尔类型。默认true。是否有click特效。
// clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"

export default {
  name: "Login",
  components: {
    VueParticles,
    CommonHeader
  },
  computed: {
    ...mapState(["domainURL"])
  },
  data() {
    return {
      lookPassword: false,
      sendCodeDisable: false, // 发送验证码 disabled 防止点击
      disabledLogin: false, // 禁止登录
      sendCodeLater: null, // 发送验证码 定时器
      sendCodeTime: 60, // 发送验证码倒计时 时间

      form: {
        account: "",
        password: "",
      },
      formRule: {
        accountNoTest: false, // 账号不能为空
        passwordNoTest: false, // 密码不能为空
        passwordError: false, // 密码错误
      },
      invitationCodeMsg: '',  // 邀请码 验证 提示
      requireInvitationCode: false, // 需要邀请码
      customerDialog: false,
      loginLoading: false,
      registerLoading: false,
      customerService: '',  // 客服二维码
    };
  },
  methods: {
    resetFormRule() {
      this.formRule = {
        accountNoTest: false, // 账号不能为空
        passwordNoTest: false, // 密码不能为空
        passwordError: false, // 密码错误
      }
    },
    accountInput() {
      this.disabledLogin = false
    },
    lookPwdHandle() {
      // 查看密码 切换
      let lookPassword = !this.lookPassword;
      this.lookPassword = lookPassword;
    },
    loginHandle() {
      // 账号登录
      if (!this.form.account) {
        this.formRule.accountNoTest = true;
        return;
      }
      if (!this.form.password) {
        this.formRule.passwordNoTest = true;
        return;
      };
      this.login();
    },
    login() {
      let formData = {
        name: this.form.account,
        password: this.form.password
      };
      this.loginLoading = true;
      this.$api.account
        .login(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.loginSuccess(resData)
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "error"
            });
          }
          this.loginLoading = false;
        })
        .catch(err => {
          this.loginLoading = false;
        });
    },
    loginSuccess(resData) {
      this.$message.success("登录成功！");
      
      let userToken = resData.authorize.token;
      localStorage.setItem('yfyc_token', userToken)
      localStorage.setItem('yfyc_ctoken', resData.ctoken)
      localStorage.setItem('yfyc_name', resData.name)
      localStorage.setItem('yfyc_truename', resData.truename)

      this.$router.push("/");
    },
    addCustomerHandle() {
      this.customerDialog = true;
    },
    startCodeLater() {
      if (this.sendCodeLater) {
        clearInterval(this.sendCodeLater);
        this.sendCodeLater = null;
      }
      this.sendCodeTime = 60;
      this.sendCodeDisable = true;
      this.form.verifyCode = "";
      this.sendCodeLater = setInterval(() => {
        if (this.sendCodeTime > 0) {
          this.sendCodeTime--;
        } else {
          this.sendCodeDisable = false;
          this.sendCodeTime = 60;
          clearInterval(this.sendCodeLater);
          this.sendCodeLater = null;
        }
      }, 1000);
    },
    getLoginCode() {
      // 手机号登录 获取 验证码
      let formData = {
        name: this.form.phone
      };
      this.$api.user
        .sendLoginCode(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("短信验证码发送成功！");
          } else {
            this.$message.error("短信验证码发送失败！");
          }
        })
    },
    //验证时间倒计时
    getCodeText: function() {
      // 更新发送验证码按钮文字
      if (this.sendCodeTime > 0) {
        return this.sendCodeTime + "s后获取";
      }
    },
    resetFomrRule() {
      this.formRule = {
        accountNoTest: false, // 账号不能为空
        passwordNoTest: false, // 密码不能为空
        passwordError: false, // 密码错误
      };
    },
    testPhone(phone) {
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        return false;
      } else {
        return true;
      }
    }
  },
};
</script>

<style lang="scss">
@import './style/index.scss';
</style>