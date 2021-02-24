<!--
 * @Description: 应用管理
 * @Date: 2021-02-02 14:22:44
 * @LastEditTime: 2021-02-05 10:54:11
-->
<template>
  <div 
    class="app-manage"
    :class="{
      'flex-box': !hasApp
    }"
    v-loading="pageLoading"
  >
    <template v-if="hasApp === false">
      <div class="option-items">
        <p class="item-title">创建第三方应用，和更多平台互动</p>
        <div class="item">
          <div class="top-title">
            <p class="title">创建应用</p>
          </div>
          <i class="icon"></i>
          <div class="tips">
            <p>为了保证所有功能的正常使用</p>
            <p>创建时请确认第三方支持所有操作</p>
          </div>
          <button class="btn blue-btn" @click="createHandle">立即创建</button>
        </div>
      </div>
    </template>
    <template v-else-if="hasApp === true">
      <div class="main-title mg-b-10">基本信息</div>
      <div>
        <div class="form-group-item clearfix">
          <label class="form-label">应用名称：</label>
          <div class="form-ctrl">
            <template v-if="isEditName">
              <el-input
                v-model="updataForm.name"
                placeholder="请输入应用名称"
                size="small"
                maxlength="30"
                show-word-limit
                @keyup.enter.native="changeAppName"
                style="width: 240px;"
              ></el-input>
              <button class="grey-text-btn" @click="cancelAppName">取消</button>
              <button class="blue-text-btn" @click="changeAppName">确定</button>
            </template>
            <template v-else>
              <span class="v-mid lh-32">{{details.name}}</span>
              <button class="blue-text-btn" @click="changeAppNameHandle">修改</button>
            </template>
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label" style="height: 80px;">应用标志：</label>
          <div class="form-ctrl">
            <div class="logo-uploader" @click="updataLogo">
              <div class="upload-box">
                <img v-if="details.logo" draggable="false" class="img" :src="details.logo" />
                <span class="change-tips">更换图片</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">应用令牌：</label>
          <div class="form-ctrl">
            <span class="v-mid">{{details.unique_id}}</span>
            <button class="blue-text-btn" @click="copyId">复制</button>
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">应用密钥：</label>
          <div class="form-ctrl">
            <template v-if="viewKey">
              <span class="v-mid">{{details.key}}</span>
              <button class="blue-text-btn" @click="viewKey = false">隐藏</button>
              <button class="blue-text-btn" @click="copyKey">复制</button>
            </template>
            <template v-else>
              <span class="v-mid">{{details.key | keyHide}}</span>
              <button class="blue-text-btn" @click="viewKey = true">查看</button>
            </template>
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">应用状态：</label>
          <div class="form-ctrl">
            <span class="v-mid">{{details.status_reason}}</span>
            <button class="blue-text-btn" @click="changeStatus">
              <template v-if="details.status == 1">
                禁用
              </template>
              <template v-else>
                启用
              </template>
            </button>
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">应用创建时间：</label>
          <div class="form-ctrl">
            {{details.created_at}}
          </div>
        </div>
      </div>
      <div class="main-title mg-t-30 mg-b-10">
        <span>营销游戏用户参与结果通知</span>
        <el-popover
          placement="top"
          width="300"
          trigger="hover">
          <p>
            用户参与营销游戏中奖、领奖等，星辰会将相关结果通过数据流的形式推送至店铺应用系统，店铺应用系统需要接收处理，并按文档规范返回应答。
          </p>
          <i class="el-icon-question c-blue cur-pointer mg-l-5" slot="reference"></i>
        </el-popover>
      </div>
      <div>
        <div class="form-group-item clearfix">
          <label class="form-label">奖品通知：</label>
          <div class="form-ctrl" style="height: auto;">
            <el-radio-group v-model="updataForm.notifyStatus" @change="notifyStatusChange" size="small">
              <el-radio :label="2">仅第三方奖品通知</el-radio>
              <el-radio :label="1">全部奖品通知</el-radio>
            </el-radio-group>
            <p class="c-999 lh-22">
              当为仅第三方奖品通知时，用户获得第三方奖品才会通知，否则不进行通知。
            </p>
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">通知地址：</label>
          <div class="form-ctrl">
            <el-input 
              v-model="updataForm.notifyUrl" 
              size="small" 
              placeholder="请输入通知地址" 
              maxlength="300" 
              style="width: 360px;"
              @blur="notifyUrlChange"
              @keyup.enter.native="notifyUrlChange"
            ></el-input>
          </div>
        </div>
      </div>
      
    </template>

    <el-dialog
      title="创建应用"
      :visible.sync="createDialog"
      width="600px"
      center
      @closed="createDialogClosed">
      <div class="dialog-body pd-r-30">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px" size="small">
          <el-form-item label="应用名称：" prop="name">
            <el-input 
              v-model="form.name" 
              placeholder="请输入应用名称" 
              maxlength="30" 
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="应用标志：" prop="logo">
            <div class="logo-uploader" @click="checkLogoPic">
              <div class="upload-box">
                <img v-if="form.logo" draggable="false" class="img" :src="form.logo" />
                <span class="change-tips">更换图片</span>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialog = false" class="normal-btn">取 消</el-button>
        <el-button type="primary" @click="submitForm" class="normal-btn" :loading="submitLoading">确 定</el-button>
      </span>
    </el-dialog>

    <ImageManage :limit="1" @checkedImage="checkedImageHandle" v-if="showImageManage" @close="closeImageManage"></ImageManage>
  </div>
</template>

<script>
import ImageManage from "@/components/image_manage";
import throttle from 'lodash/throttle'

export default {
  name: 'AppManage',
  components: {
    ImageManage
  },
  data() {
    return {
      pageLoading: false,
      hasApp: null,
      createDialog: false,
      submitLoading: false,
      form: {
        name: '',
        logo: ''
      },
      rules: {
        name: { required: true, message: '请填写应用名称', trigger: 'blur' },
        logo: { required: true, message: '请选择应用标志', trigger: 'change' }
      },
      showImageManage: false,
      changeImgType: '',
      details: {},
      isEditName: false,
      updataForm: {
        name: '',
        logo: '',
        notifyStatus: 1,
        notifyUrl: '',
      },
      viewKey: false,
    }
  },
  created() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      this.pageLoading = true;
      let formData = {};
      this.$api.setting.application
        .details(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.details = resData;
            console.log("🚀 ~ file: index.vue ~ line 101 ~ getDetails ~ resData", resData)
            this.updataForm.notifyStatus = resData.interaction_notify_prize_type;
            this.updataForm.notifyUrl = resData.interaction_notify_url;
            this.hasApp = true;
          } else if(res.data.code === 23201) {
            this.hasApp = false;
          } else {
            this.$message.warning(res.data.message);
          }
          this.pageLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.pageLoading = false;
        });
    },
    createHandle() {
      this.createDialog = true;
    },
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if(this.form.name.length < 2) {
            this.$message.warning('应用名称不得少于2个字符')
            return
          };
          if(this.form.name.length > 30) {
            this.$message.warning('应用名称不得多于30个字符')
            return
          };
          this.createSubmit()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    createSubmit() {
      this.submitLoading = true;
      let formData = {
        name: this.form.name,
        logo: this.form.logo
      };
      this.$api.setting.application
        .create(formData)
        .then(res => {
          this.createDialog = false;
          if (res.data.code === 0) {
            this.getDetails();
            this.$message.success('创建成功');
          } else {
            this.$message.warning(res.data.message);
          };
          this.submitLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.submitLoading = false;
        });
    },
    createDialogClosed() {
      this.form.name = '';
      this.form.logo = '';
    },
    checkLogoPic() {
      // 选择logo
      this.changeImgType = 'create'
      this.showImageManage = true;
    },
    updataLogo() {
      this.changeImgType = 'updata'
      this.showImageManage = true;
    },
    checkedImageHandle(val) {
      this.showImageManage = false;
      if(val.length > 0) {
        if(this.changeImgType == 'create') {
          this.form.logo = val[0].src;
        } else if(this.changeImgType == 'updata') {
          this.updataForm.logo = val[0].src;
          this.$nextTick(() => {
            this.updata('logo');
          });
        }
      };
    },
    closeImageManage(val) {
      this.showImageManage = false;
    },
    changeAppNameHandle() {
      this.updataForm.name = this.details.name;
      this.isEditName = true;
    },
    changeAppName() {
      if(this.updataForm.name.length < 2) {
        this.$message.warning('应用名称不得少于2个字符')
        return
      };
      if(this.updataForm.name.length > 30) {
        this.$message.warning('应用名称不得多于30个字符')
        return
      };
      this.updata('name')
      this.isEditName = false;
    },
    cancelAppName() {
      this.isEditName = false;
    },
    changeStatus() {
      this.pageLoading = true;
      let formData = {
        id: this.details.unique_id
      };
      this.$api.setting.application
        .status(formData)
        .then(res => {
          this.pageLoading = false;
          this.getDetails();
          if (res.data.code === 0) {
            this.$message.success('操作成功')
          } else {
            this.$message.warning(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.pageLoading = false;
        });
    },
    copyKey() {
      let link = this.details.key;
      this.$copyText(link).then(
        e => {
          this.$message.success("复制成功");
        },
        e => {
          this.$message.warning("复制失败");
        }
      );
    },
    copyId() {
      let link = this.details.unique_id;
      this.$copyText(link).then(
        e => {
          this.$message.success("复制成功");
        },
        e => {
          this.$message.warning("复制失败");
        }
      );
    },
    notifyStatusChange(val) {
      this.updata('notifyStatus')
    },
    notifyUrlChange() {
      this.updata('notifyUrl')
    },
    updata: throttle(function(type) {
      this.pageLoading = true;
      let formData = {
        id: this.details.unique_id
      };
      if(type == 'name') {
        formData.name = this.updataForm.name
      };
      if(type == 'logo') {
        formData.logo = this.updataForm.logo
      };
      if(type == 'notifyStatus') {
        formData.interaction_notify_prize_type = this.updataForm.notifyStatus
      };
      if(type == 'notifyUrl') {
        formData.interaction_notify_url = this.updataForm.notifyUrl
      };
      this.$api.setting.application
        .update(formData)
        .then(res => {
          this.pageLoading = false;
          this.getDetails();
          if (res.data.code === 0) {
            this.$message.success('操作成功')
          } else {
            this.$message.warning(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.pageLoading = false;
        });
    }, 1500)
  },
  filters: {
    keyHide(val) {
      let num = val.length, res = '';
      for(let i = 0; i < num; i++) {
        res+='*'
      };
      return res;
    }
  }
}
</script>

<style lang="scss">
  @import './style/index.scss'
</style>