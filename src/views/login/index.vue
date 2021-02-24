<template>
  <div class="login">
    <header class="login-header">
      <CommonHeader :hideAccount="true" :userLogo="userLogo"></CommonHeader>
    </header>
    <div class="main" id="pageMain">
      <div class="login-cont clearfix">
        
        <div class="form-box" :class="{'form-box-pad-top': pageType == 'retrievePassword'}">
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
                  @blur="checkInfo"
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
                  v-if="pageType == 'smsLogin' || pageType == 'accountLogin'"
                >
                  <button
                    class="forgetPwd-btn"
                    type="button"
                    @click="retrievePasswordHandle"
                    v-show="pageType == 'accountLogin'"
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
    <SlideVerifyDialog
      v-if="showVerifyDialog"
      :verifyType="verifyType"
      @success="verifySuccess"
      @close="closeVerifyDialog"
    ></SlideVerifyDialog>
    <el-dialog
      title="客服二维码"
      :visible.sync="customerDialog"
      width="320px"
      center
      custom-class="customer-dialog"
    >
      <div class="customer-dialog-body">
        <div class="code-box">
          <el-image
            class="code-img"
            :src="customerService"
            fit="fill"
            draggable="false"
          >
            <img slot="error" class="image-error-icon" src="https://cdn.xingchen.cn/FssW3_T3DRshGt5I-TwCb3gWejyd" alt="">
          </el-image>
        </div>
        <!-- <div class="tips">微信扫码添加星辰客服</div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="customerDialog = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";
import { slider, slideritem } from "vue-concise-slider";
import CommonHeader from "./components/header";
import SlideVerifyDialog from "@/components/slide_verify_dialog/";
import VueParticles from "@/components/vue_particles/index.vue";

import BaseUrl from "@/request/requestUrl"

import axios from 'axios'

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
    slider,
    slideritem,
    SlideVerifyDialog,
    VueParticles,
    CommonHeader
  },
  computed: {
    ...mapState(["domainURL"])
  },
  data() {
    return {
      userLogo: "",
      /**
       * @pageType
       * smsLogin-短信登录
       * accountLogin-账号登录
       * scanLogin-扫码登录
       * phoneRegist-手机注册
       * scanRegist-扫码注册
       * bindPhone-绑定手机
       * retrievePassword-找回密码
       */
      pageType: "smsLogin",
      tabsName: "sms", // account sms
      checkInfoTabsName: "",
      lookPassword: false,
      lookNewPassword: false,
      lookConfirmPassword: false,
      sendCodeDisable: false, // 发送验证码 disabled 防止点击
      disabledRegist: false, // 禁止注册
      disabledLogin: false, // 禁止登录
      sendCodeLater: null, // 发送验证码 定时器
      sendCodeTime: 60, // 发送验证码倒计时 时间

      verifyType: "sendLoginCode", // sendCode  login  // 图片验证类型
      /** 
       * @verifyType
      // sendLoginCode 登录验证码
      // sendRegistCode 注册验证码
      // sendBindCode 绑定手机号 验证码
      // sendRePwdCode 找回密码验证码
      */
      form: {
        phone: "",
        verifyCode: "",
        account: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
        invitationCode: "小商店" // 邀请码
      },
      formRule: {
        phoneRegistered: false, // 手机号已注册
        phoneNoTest: false, // 手机号格式不正确
        verifyCodeNoTest: false, // 验证码错误
        accountNoTest: false, // 账号不能为空
        passwordNoTest: false, // 密码不能为空
        passwordError: false, // 密码错误
        confirmPasswordNoTest: false, // 确认密码不一致
        invitationCodeInvalid: false, // 邀请码无效
        invitationCodeLimit: false, // 邀请码已达上限
        invitationCodeRequire: false, // 邀请码不能为空
        invitationCodeMust: false, // 该手机号未注册，需输入邀请码
        invitationCodeNoMust: false // 该手机号已注册，无需输入邀请码
      },
      invitationCodeMsg: '',  // 邀请码 验证 提示
      requireInvitationCode: false, // 需要邀请码
      customerDialog: false,
      showVerifyDialog: false, // 是否显示滑动验证
      slider: {
        imgList: ["https://cdn.xingchen.cn/Fincwz89qvZLvIHK4fJtN8yTwIVR"],
        options: {
          pagination: false, // 显示页码
          currentPage: 0, //当前页码
          thresholdDistance: 100, //滑动判定距离
          thresholdTime: 300, //滑动判定时间
          autoplay: 3000, //自动滚动[ms]
          loop: true, //循环滚动
          direction: "horizontal", //方向设置，垂直滚动 vertical horizontal
          loopedSlides: 1, //无限滚动前后遍历数
          slidesToScroll: 1, //每次滑动项数
          timingFunction: "ease",
          speed: 500
        }
      },
      loginLoading: false,
      registerLoading: false,
      customerService: '',  // 客服二维码
      wxLogin: {
        scene: '',  // 场景值
        expireSeconds: '',  // 过期时间
        qrcode: '',
        endTime: 0,
        later: null,
        wechatOpenid: ''
      }
    };
  },
  created() {
    if (this.$route.params.type && this.$route.params.type == "register") {
      this.pageType = "phoneRegist";
    } else {
      this.toCodeLogin();
    };
  },
  methods: {
    inviteCodeBlur() {
      // 邀请码 失焦失焦
      if(this.form.invitationCode == '') {
        return;
      };
      this.formRule.invitationCodeInvalid = false;
      this.checkInviteCode()
      .then(res => {
        if(res.data.code == '-2') {
          this.formRule.invitationCodeInvalid = true;
          this.invitationCodeMsg = res.data.message;
        }
      })
    },
    resetFormRule() {
      this.formRule = {
        phoneRegistered: false, // 手机号已注册
        phoneNoTest: false, // 手机号格式不正确
        verifyCodeNoTest: false, // 验证码错误
        accountNoTest: false, // 账号不能为空
        passwordNoTest: false, // 密码不能为空
        passwordError: false, // 密码错误
        confirmPasswordNoTest: false, // 确认密码不一致
        invitationCodeInvalid: false, // 邀请码无效
        invitationCodeLimit: false, // 邀请码已达上限
        invitationCodeRequire: false, // 邀请码不能为空
        invitationCodeMust: false, // 该手机号未注册，需输入邀请码
        invitationCodeNoMust: false // 该手机号已注册，无需输入邀请码
      }
    },
    checkInviteCode() {
      // 校验邀请码
      return new Promise((resolve, reject) => {
        let formData = {
          code: this.form.invitationCode
        };
        this.$api.user
          .checkInviteCode(formData)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    phoneInput() {
      this.disabledLogin = false;
      let phone = this.form.phone;
      phone = phone.replace(/[^\d]/g, ''); // 清除“数字”和“.”以外的字符
      // if (phone.indexOf('.') < 0 && phone != '') {
      //   phone = parseInt(phone);
      // }
      this.form.phone = phone;
    },
    accountInput() {
      this.disabledLogin = false
    },
    verifyCodeInput() {
      // form.verifyCode
      let verifyCode = this.form.verifyCode;
      verifyCode = verifyCode.replace(/[^\d]/g, ''); // 清除“数字”和“.”以外的字符
      // if (verifyCode.indexOf('.') < 0 && verifyCode != '') {
      //   verifyCode = parseInt(verifyCode);
      // }
      this.form.verifyCode = verifyCode;
    },
    lookPwdHandle() {
      // 查看密码 切换
      let lookPassword = !this.lookPassword;
      this.lookPassword = lookPassword;
    },
    lookNewPwdHandle() {
      // 查看新密码 切换
      let lookPassword = !this.lookNewPassword;
      this.lookNewPassword = lookPassword;
    },
    lookConfirmPwdHandle() {
      // 查看确认新密码 切换
      let lookPassword = !this.lookConfirmPassword;
      this.lookConfirmPassword = lookPassword;
    },
    changeTabs(type) {
      // tabs 切换
      this.tabsName = type;
      if (type == "sms") {
        this.pageType = "smsLogin";
      } else if (type == "account") {
        this.pageType = "accountLogin";
      }
      this.disabledLogin = false;
      this.resetFormRule()
    },
    gobackLogin() {
      this.disabledRegist = false; // 取消禁止登录状态

      if (this.tabsName == "account") {
        this.pageType = "accountLogin";
      } else {
        this.pageType = "smsLogin";
      }
    },
    toCodeLogin() {
      // 切换扫码登录
      this.getWxLoginQrcode()
      this.pageType = "scanLogin";
    },
    toCodeRegist() {
      // 切换扫码注册
      this.pageType = "scanRegist";
    },
    toPhoneLogin() {
      // 切换手机登录
      if(this.wxLogin.later) {
        window.clearInterval(this.wxLogin.later)
        this.wxLogin.later = null;
      };
      this.tabsName = "sms";
      this.pageType = "smsLogin";
    },
    toPhoneRegist() {
      // 切换注册
      this.pageType = "phoneRegist";
      this.disabledLogin = false;
    },
    retrievePasswordHandle() {
      // 找回密码
      this.pageType = "retrievePassword";
    },
    refreshQrcode() {
      this.wxLogin.qrcode = '';
      this.wxLogin.scene = '';
      if(this.wxLogin.later) {
        window.clearInterval(this.wxLogin.later)
        this.wxLogin.later = null;
      }
      this.$nextTick(() => {
        this.getWxLoginQrcode();
      })
    },
    getWxLoginQrcode() {
      if(this.wxLogin.scene && this.wxLogin.endTime) {
        let qrcode = `${BaseUrl.baseUrl}business/login/wechatQrcode?scene=${this.wxLogin.scene}`;
        this.wxLogin.qrcode = qrcode;
        this.verImgSrc(qrcode)
        this.verWxLoginCode(this.wxLogin.scene)
      } else {
        let formData = {}
        this.$api.user
          .getWXLoginQrcode(formData)
          .then(res => {
            if (res.data.code === 0) {
              let scene = res.data.data.scene;
              let expireSeconds = res.data.data.expireSeconds;
              this.wxLogin.scene = scene;
              this.wxLogin.expireSeconds = expireSeconds;
              let qrcode = `${BaseUrl.baseUrl}business/login/wechatQrcode?scene=${scene}`;
              this.wxLogin.qrcode = qrcode;
              this.verImgSrc(qrcode)
              // 过期时间
              let endTime = new Date().getTime() + (expireSeconds*1000);
              this.wxLogin.endTime = endTime;
              this.verWxLoginCode(scene)
            } else {
              this.$message.warning(res.data.message);
            }
          })
          .catch(err => {});
      }
    },
    verWxLoginCode(scene) {
      this.wxLogin.later = setInterval(() => {
        if(this.wxLogin.later == null) {
          return;
        };
        let nowTime = new Date().getTime();
        if(nowTime > this.wxLogin.endTime) {
          window.clearInterval(this.wxLogin.later)
          this.wxLogin.later = null;
        };
        this.getWxLoginState(scene)
      }, 2000)
    },
    verImgSrc(src) {
      axios.get(src)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        this.wxLogin.scene = ''
        if(this.wxLogin.later) {
          window.clearInterval(this.wxLogin.later)
          this.wxLogin.later = null;
        };
        this.$nextTick(() => {
          this.getWxLoginQrcode()
        })
      });
    },
    getWxLoginState(scene) {
      return new Promise((resolve, reject) => {
        let formData = {
          scene
        };
        this.$api.user
          .getWXLoginState(formData)
          .then(res => {
            if (res.data.code === 0) {
              if(res.data.data) {
                if(res.data.data.wechatOpenid) {
                  this.wxLogin.wechatOpenid = res.data.data.wechatOpenid;
                  this.$message.warning('该微信号未绑定账号，登录或注册成功后将自动绑定!')
                  this.toPhoneLogin()
                } else {
                  this.loginSuccess(res.data.data)
                };
                window.clearInterval(this.wxLogin.later)
                this.wxLogin.later = null;
              };
            } else {
              this.$message.warning(res.data.message);
              window.clearInterval(this.wxLogin.later)
              this.wxLogin.later = null;
            }
          })
          .catch(err => {
            window.clearInterval(this.wxLogin.later)
            this.wxLogin.later = null;
          });
        })
    },
    sendCode() {
      // 发送验证码
      this.resetFomrRule();
      if (this.testPhone(this.form.phone)) {
        if (this.pageType == "smsLogin") {
          // 短信登录 发送验证码
          this.phoneHasRegist()
            .then(res => {
              this.verifyType = "sendLoginCode";
              this.showVerifyDialog = true;
            })
            .catch(err => {
              this.showVerifyDialog = false;
            });
        } else if (this.pageType == "phoneRegist") {
          // 手机号注册 发送验证码
          this.phoneHasRegist()
            .then(res => {
              this.showVerifyDialog = false;
            })
            .catch(err => {
              this.verifyType = "sendRegistCode";
              this.showVerifyDialog = true;
            });
        } else if (this.pageType == "bindPhone") {
          // 绑定手机号 发送验证码
          this.verifyType = "sendBindCode";
          this.showVerifyDialog = true;
        } else if (this.pageType == "retrievePassword") {
          // 忘记密码 发送验证码
          this.verifyType = "sendRePwdCode";
          this.showVerifyDialog = true;
        }
      } else {
        this.formRule.phoneNoTest = true;
      }
    },
    phoneHasRegist() {
      // 账号已经被注册
      // 验证用户是否存在
      return new Promise((resolve, reject) => {
        let formData = {};
        if (this.pageType === "smsLogin" || this.pageType === "phoneRegist") {
          if (!this.form.phone) {
            return;
          }
          formData = {
            name: this.form.phone
          };
        } else if (this.pageType === "accountLogin") {
          if (!this.form.account) {
            return;
          }
          formData = {
            name: this.form.account
          };
        }

        this.$api.user
          .checkInfo(formData)
          .then(res => {
            if (res.data.code === 0 && res.data.data.exist) {
              resolve(true);
            } else {
              reject(false);
            }
          })
          .catch(err => {
            reject(false);
          });
      });
    },
    registHandle() {
      this.resetFomrRule();
      if (this.pageType == "phoneRegist") {
        if (!this.testPhone(this.form.phone)) {
          this.formRule.phoneNoTest = true;
          return;
        }
        if (!this.form.verifyCode) {
          this.formRule.verifyCodeNoTest = true;
          return;
        }
        if (!this.form.invitationCode) {
          this.formRule.invitationCodeRequire = true;
          return;
        } else {
          this.registerLoading = true;
          this.checkInviteCode()
          .then(res => {
            if(res.data.code == '-2') {
              this.formRule.invitationCodeInvalid = true;
              this.invitationCodeMsg = res.data.message;
              this.registerLoading = false;
            } else {
              this.regist();
            }
          })
          .catch(err => {
            this.regist();
          })
        }

      }
    },
    regist() {
      let formData = {
        phone: this.form.phone,
        invite_code: this.form.invitationCode,
        code: this.form.verifyCode,
        type: "2"
      };
      if(this.wxLogin.wechatOpenid) {
        formData.wechatOpenid = this.wxLogin.wechatOpenid
      };
      this.$api.user
        .register(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            // resData = {
            //   authorize: {
            //     exp: 1588319874,
            //     iat: 1587715074,
            //     nbf: 1587715074,
            //     token:
            //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IiIsImF1ZCI6ImxvY2FsaG9zdCIsImp0aSI6IiJ9.eyJpc3MiOiIiLCJhdWQiOiJsb2NhbGhvc3QiLCJqdGkiOiIiLCJpYXQiOjE1ODc3MTUwNzQsIm5iZiI6MTU4NzcxNTA3NCwiZXhwIjoxNTg4MzE5ODc0LCJyb2xlIjoiYnVzaW5lc3MiLCJiaWQiOjIsImJ0b2tlbiI6Ijk2OTJlZmQyMTdiNzg1ZGM3ZGE2NWIxN2NiYWUyYmM0IiwibmFtZSI6IjE3NjkxMzQ4NDU5IiwicGhvbmUiOiIxNzY5MTM0ODQ1OSJ9._FyJfuzNhCKKZGT974kLvCu7WQ2s25LjN-u8yBntJS4"
            //   },
            //   btoken: "9692efd217b785dc7da65b17cbae2bc4",
            //   name: "17691348459",
            //   phone: "17691348459"
            // };
            this.$message.success("注册成功！");
            let userInfo = {
              name: resData.name,
              phone: resData.phone,
              btoken: resData.btoken
            };
            let userToken = resData.authorize.token;
            let domainURL = this.domainURL;
            Cookies.set("userInfo", userInfo, { domain: domainURL });
            Cookies.set("userToken", userToken, { domain: domainURL });
            this.$router.push("/platform");
          } else {
            this.$message.warning(res.data.message);
          }
          this.registerLoading = false;
        })
        .catch(err => {
          this.registerLoading = false;
        });
    },
    resetPasswordHandle() {
      this.resetFomrRule();
      if (!this.testPhone(this.form.phone)) {
        this.formRule.phoneNoTest = true;
        return;
      }
      if (!this.form.verifyCode) {
        this.formRule.verifyCodeNoTest = true;
        return;
      }
      if (this.form.newPassword.length < 8) {
        this.$message.warning("请输入不少于8位数的密码！");
        return;
      }
      if (this.form.newPassword !== this.form.confirmPassword) {
        this.formRule.confirmPasswordNoTest = true;
        return;
      }
      let formData = {
        name: this.form.phone,
        code: this.form.verifyCode,
        password: this.form.newPassword
      };
      this.$api.user
        .resetPassword(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("密码重置成功！");
          } else {
            this.$message.warning(res.data.message);
          }
        })
    },
    loginHandle() {
      // 登录手柄
      this.resetFomrRule();
      if (this.pageType == "accountLogin") {
        // 账号登录
        if (!this.form.account) {
          this.formRule.accountNoTest = true;
          return;
        }
        if (!this.form.password) {
          this.formRule.passwordNoTest = true;
          return;
        }
        this.verifyType = "login";
        this.showVerifyDialog = true;
      } else if (this.pageType == "smsLogin") {
        if (!this.testPhone(this.form.phone)) {
          this.formRule.phoneNoTest = true;
          return;
        }
        if (!this.form.verifyCode) {
          this.formRule.verifyCodeNoTest = true;
          return;
        }
        this.login();
      } else if (this.pageType == "bindPhone") {
        if (!this.testPhone(this.form.phone)) {
          this.formRule.phoneNoTest = true;
          return;
        }
        if (!this.form.verifyCode) {
          this.formRule.verifyCodeNoTest = true;
          return;
        }
        if (this.requireInvitationCode && !this.form.invitationCode) {
          this.formRule.invitationCodeMust = true;
          return;
        }
        this.login();
      }
    },
    login() {
      let formData = {};
      if (this.pageType == "smsLogin") {
        // 短信登录
        formData = {
          name: this.form.phone,
          type: "2",
          password: this.form.verifyCode
        };
      } else if (this.pageType == "accountLogin") {
        // 密码
        formData = {
          name: this.form.account,
          type: "1",
          password: this.form.password
        };
      } else if (this.pageType == "bindPhone") {
        // 微信登录-绑定手机号
        formData = {
          name: this.form.phone,
          type: "3",
          password: this.form.verifyCode
        };
      };
      if(this.wxLogin.wechatOpenid) {
        formData.wechatOpenid = this.wxLogin.wechatOpenid
      }
      this.loginLoading = true;
      this.$api.user
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
      let userInfo = {
        name: resData.name,
        phone: resData.phone,
        btoken: resData.btoken
      };
      let userToken = resData.authorize.token;
      // console.log('userToken')
      // console.log(userToken)
      let domainURL = this.domainURL;
      Cookies.set("userInfo", userInfo, { domain: domainURL });
      Cookies.set("userToken", userToken, { domain: domainURL });
      this.$router.push("/platform");
    },
    verifySuccess(val) {
      // 图形验证成功
      this.showVerifyDialog = false;
      if (val == "sendRegistCode") {
        this.startCodeLater();
        this.getRegistCode();
      } else if (val == "sendLoginCode") {
        // 获取登录验证码
        this.startCodeLater();
        this.getLoginCode();
      } else if (val == "sendRePwdCode") {
        // 忘记密码 验证码
        this.startCodeLater();
        this.getRePwdCode();
      } else if (val == "login") {
        this.login();
      }
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
    getRegistCode() {
      // 手机号注册 获取 验证码
      let formData = {
        phone: this.form.phone
      };
      this.$api.user
        .sendRegisterCode(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("短信验证码发送成功！");
          } else {
            this.$message.error(res.data.message);
          }
        })
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
    getRePwdCode() {
      // 找回密码 验证码
      let formData = {
        name: this.form.phone
      };
      this.$api.user
        .sendRePwdCode(formData)
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
    checkInfo() {
      // 校验账号信息
      let formData = {};
      if (this.pageType === "smsLogin" || this.pageType === "phoneRegist") {
        if (!this.form.phone) {
          return;
        }
        formData = {
          name: this.form.phone
        };
      } else if (this.pageType === "accountLogin") {
        if (!this.form.account) {
          return;
        }
        formData = {
          name: this.form.account
        };
      }
      this.checkInfoTabsName = this.tabsName;

      this.$api.user
        .checkInfo(formData)
        .then(res => {
          this.resetFormRule()
          if (res.data.code === 0 && res.data.data.exist) {
            let resData = res.data.data;
            if (resData.codeInfo && resData.codeInfo.batchLogo) {
              let batchLogo = resData.codeInfo.batchLogo;
              localStorage.setItem("batchLogo", batchLogo);
              this.userLogo = batchLogo;
            } else {
              localStorage.removeItem("batchLogo");
              this.userLogo = "";
            }
            if (
              this.pageType == "phoneRegist" &&
              this.checkInfoTabsName == this.tabsName
            ) {
              this.disabledRegist = true;
            }
            this.disabledLogin = false;
          } else {
            localStorage.removeItem("batchLogo");
            this.userLogo = "";
            this.disabledRegist = false;
            if (
              (this.pageType == "accountLogin" ||
                this.pageType == "smsLogin") &&
              this.checkInfoTabsName == this.tabsName
            ) {
              this.disabledLogin = true;
            }
          }
        })
    },
    closeVerifyDialog() {
      this.showVerifyDialog = false;
    },
    resetFomrRule() {
      this.formRule = {
        phoneRegistered: false, // 手机号已注册
        phoneNoTest: false, // 手机号格式不正确
        verifyCodeNoTest: false, // 验证码错误
        accountNoTest: false, // 账号不能为空
        passwordNoTest: false, // 密码不能为空
        passwordError: false, // 密码错误
        confirmPasswordNoTest: false, // 确认密码不一致
        invitationCodeInvalid: false, // 邀请码无效
        invitationCodeLimit: false, // 邀请码已达上限
        invitationCodeRequire: false, // 邀请码不能为空
        invitationCodeMust: false, // 该手机号未注册，需输入邀请码
        invitationCodeNoMust: false // 该手机号已注册，无需输入邀请码
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
  beforeDestroy() {
    if(this.wxLogin.later) {
      window.clearInterval(this.wxLogin.later)
      this.wxLogin.later = null;
    }
  }
};
</script>

<style lang="scss">
@import './style/index.scss'
</style>