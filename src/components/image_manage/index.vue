<template>
  <el-dialog
    custom-class="image-manage-dialog"
    title="我的图片"
    :visible.sync="dialogVisible"
    width="880px"
    center
    @closed="close"
  >
    <div class="back-list-view" v-if="showUploadView" @click="gobackListView">
      <i class="el-icon-arrow-left icon"></i>
      <span class="name">我的图片</span>
    </div>
    <template v-if="showUploadView">
      <div class="inage-upload-box">
        <div class="form-group-item clearfix">
          <label class="form-label">上传到分组：</label>
          <div class="form-ctrl">
            <el-select
              v-model="uploadGroup"
              placeholder="请选择分组"
              style="width: 265px;"
              size="small"
              @change="groupChange"
            >
              <el-option
                v-for="item in groupList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <transition name="el-zoom-in-top">
            <div class="choose-group-warning" v-show="showChooseGroupWarning">请先选择分组</div>
          </transition>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">本地图片：</label>
          <div class="form-ctrl">
            <ul class="image-list clearfix" style="height: auto;">
              <template v-for="(item, index) in uploadList">
                <li class="item" :key="item.id">
                  <div class="img-box" style="background-color: #fff;">
                    <el-image
                      class="img"
                      style="width: 100%; height: 100%;"
                      :src="item.src"
                      fit="cover"
                      draggable="false"
                    >
                      <img slot="error" draggable="false" class="image-error-icon" src="https://cdn.xingchen.cn/FssW3_T3DRshGt5I-TwCb3gWejyd" alt="">
                    </el-image>
                    <span class="delete-btn" @click="delLocalImg(item, index)">
                      <i class="el-icon-close icon"></i>
                    </span>
                    <!-- 
                    <span class="checked-icon" v-show="checkedListHas(item.id)">
                      <i class="el-icon-check icon"></i>
                    </span>-->
                  </div>
                  <div class="img-name">{{item.name}}</div>
                </li>
              </template>
              <li class="item">
                <div class="img-box">
                  <el-upload
                    class="image-uploader"
                    multiple
                    :limit="10"
                    action
                    :show-file-list="false"
                    :before-upload="beforeUpload"
                    accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp"
                    :on-exceed="limitExceed"
                    v-loading="upfileLoading"
                  >+添加图片</el-upload>
                </div>
              </li>
            </ul>
            <div class="upload-tips">仅支持gif、jpeg、png、bmp 4种格式，大小不超过3.0MB，按住shift可选择多张同时上传。</div>
            <div class="upload-goback-btn clearfix" style="margin-top: 60px;">
              <el-button type="primary" class="normal-btn pull-right" @click="gobackListView">确定</el-button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="image-manage-body clearfix" v-loading="listLoading">
        <div class="image-manage-tabs">
          <ul class="tabs-list">
            <template v-for="(item, index) in groupList">
              <li
                class="item"
                :class="{'active': item.id == groupActive}"
                :key="index"
                :data-edit="item.edit"
              >
                <div class="item-edit-box" v-show="item.edit">
                  <div class="edit-group-box">
                    <input
                      type="text"
                      class="edit-group-input"
                      :ref="'editGroupInput'+index"
                      :data-ref="'editGroupInput'+index"
                      v-model="item.name"
                      maxlength="5"
                      @blur="editGroupInputBlur(item, index)"
                    />
                    <!-- <span class="confirm-btn" id="confirmChangeGroupName" @click.stop="changeGroupNamge(item, index)">
                      <i class="el-icon-check icon"></i>
                    </span>-->
                  </div>
                </div>
                <div class="item-show-box" v-show="!item.edit">
                  <span class="item-name" @click="changGroupTabs(item, index)">{{item.name}}</span>
                  <template v-if="index !== 0">
                    <div class="opt-btn-box">
                      <button type="button" class="opt-btn" @click="editGroupNameHandle(item, index)">
                        <i class="icon el-icon-edit"></i>
                      </button>
                      <button type="button" class="opt-btn" @click="deleteGroupHandle(item)">
                        <i class="icon el-icon-delete"></i>
                      </button>
                    </div>
                  </template>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="image-manage-cont">
          <div class="opt-box clearfix">
            <el-button type="primary" class="normal-btn pull-right" @click="uploadToggleHandle">上传图片</el-button>
            <template v-if="isBatchEdit">
              <el-checkbox v-model="allChecked" @change="allCheckedHandle">全选</el-checkbox>
              <span
                class="image-manage-checked-tips"
                style="margin-left: 15px;"
                v-if="checkedIdList.length > 0"
              >
                已选
                <span class="checked-number">{{checkedIdList.length}}</span>
                张图片
              </span>
              <div class="btn-box">
                <template v-if="checkedIdList.length > 0">
                  <el-button type="text" @click="betchDeleteHandle">删除</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-popover
                    placement="bottom-start"
                    width="424"
                    trigger="click"
                    v-model="movePopShow"
                    popper-class="image-move-pop"
                  >
                    <span class="image-manage-checked-tips">
                      已选
                      <span class="checked-number">{{checkedIdList.length}}</span>
                      张图片
                      <span
                        style="margin-left: 10px;margin-right: 5px;"
                      >移动到</span>
                    </span>
                    <el-select
                      v-model="moveGroup"
                      placeholder="请选择分组"
                      style="width: 160px;"
                      size="small"
                    >
                      <el-option
                        v-for="item in groupList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        :disabled="item.id == groupActive"
                      ></el-option>
                    </el-select>
                    <el-button type="text" class="confirm-btn" @click="confirmMoveHandle">确定</el-button>
                    <el-button type="text" class="cancel-btn" @click="cancelMoveHandle">取消</el-button>
                    <el-button type="text" slot="reference">移动</el-button>
                  </el-popover>
                  <el-divider direction="vertical"></el-divider>
                </template>
                <el-button type="text" @click="batchEditQuit">完成</el-button>
              </div>
            </template>
            <template v-else>
              <el-button type="text" class="batch-edit-btn pull-right" @click="batchEditHandle">
                <i class="batch-edit-icon"></i>
                批量编辑
              </el-button>
            </template>
          </div>
          <ul class="image-list clearfix">
            <template v-for="(item, index) in imageList">
              <li class="item" :key="index" @click="checkItem(item, index)">
                <div class="img-box">
                  <el-image
                    class="img"
                    style="width: 100%; height: 100%;"
                    :src="item.src"
                    fit="cover"
                    draggable="false"
                  >
                    <img slot="error" draggable="false" class="image-error-icon" src="https://cdn.xingchen.cn/FssW3_T3DRshGt5I-TwCb3gWejyd" alt="">
                  </el-image>
                  <span class="delete-btn" @click.stop="deleteItemHandle(item)">
                    <i class="el-icon-close icon"></i>
                  </span>
                  <span class="checked-icon" v-show="checkedListHas(item.guid)">
                    <i class="el-icon-check icon"></i>
                  </span>
                </div>
                <div class="img-name">{{item.name}}</div>
              </li>
            </template>
          </ul>
          <div class="pagetion-box">
            <span style="line-height: 32px; display: inline-block; margin-right: 15px; vertical-align: top; color: #666;">
              共{{pageData.total}}张，每页{{pageData.size}}张
            </span>
            <el-pagination
              background
              :page-size="pageData.size"
              :current-page="pageData.current"
              :total="pageData.total"
              @current-change="pageChange"
              :pager-count="5"
              layout="prev, pager, next, jumper"
              style="display: inline-block; vertical-align: top;"
            ></el-pagination>
          </div>
        </div>
        <div class="image-manage-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="submitChecked">确 定</el-button>
          <el-button class="create-group" @click="createGroup">新建分组</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import uuidV4 from "uuid/v4";
import { getUserRole } from "@/tools/Cookie";
import qiniuUploadFile from "@/api/qiniu/uploadFile";

export default {
  name: "ImageManageDialog",
  props: ["limit"],
  created() {
    this.getGroupList();
  },
  data() {
    return {
      dialogVisible: true,
      listLoading: false,
      showUploadView: false, // 显示上传图片界面
      isBatchEdit: false, // 当前是否为批量编辑状态
      allChecked: false, // 全选
      groupActive: "all", // 分组 tabs 选中项
      moveGroup: "", // 移动分组 select val
      groupList: [], // 分组列表
      pageData: {
        // 分页数据
        current: 1,
        size: 21,
        total: 0
      },
      checkedIdList: [], // 已选择的图片列表id
      checkedListRes: [],
      uploadGroup: "all", // 上传选择的分组
      uploadList: [], // 新上传图片列表
      imageList: [], // 图片列表
      movePopShow: false, // 移动 popover 显示状态
      showChooseGroupWarning: false, // 选择上传分组提示
      upfileLoading: false,
      clickTimes: 0
    };
  },
  methods: {
    groupChange(val) {
      // 上传分组 改变
      this.showChooseGroupWarning = false;
    },
    getGroupList(type) {
      let formData = {
        page: 1
      };
      this.$api.explorer.imageManage.getGroupList(formData).then(res => {
        if (res.data.code === 0) {
          let groupList = [
            {
              id: "all",
              edit: false,
              name: "全部图片"
            }
          ];
          let items = []
          if (res.data.data) {
            items = res.data.data.items;
            for (let item of items) {
              item.edit = false;
            }
          };
          let list = groupList.concat(items);
          this.groupList = list;
          if(type == 'addGroup') {
            this.$nextTick(() => {
              this.editGroupNameHandle({}, list.length-1)
            })
          };
          this.pageData.current = 1;
          this.getExplorerList(1);
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },
    getExplorerList(page) {
      this.listLoading = true;
      let formData = {
        page: page ? page : this.pageData.current,
        limit: this.pageData.size,
        group_id: this.groupActive === "all" ? "" : this.groupActive,
        accept: "image"
      };
      this.$api.explorer.imageManage.getExplorerList(formData).then(res => {
        if (res.data.code === 0) {
          if (res.data.data) {
            this.imageList = res.data.data.items;
            this.pageData.total = res.data.data.count;
          } else {
            this.imageList = [];
            this.pageData.total = 0;
          }
        } else {
          this.$message.warning(res.data.message);
          this.imageList = [];
          this.pageData.total = 0;
        };
        this.listLoading = false;
      })
      .catch(err => {
        this.imageList = [];
        this.pageData.total = 0;
        this.listLoading = false;
      })
    },
    allCheckedHandle(val) {
      let imageList = this.imageList;
      let arr = [];
      if (val) {
        for (let item of imageList) {
          arr.push(item);
        }
      }
      this.checkedIdList = arr;
    },
    changGroupTabs(row, index) {
      this.clickTimes++;
      if (this.clickTimes === 2) { //当点击次数为2
        this.clickTimes = 0; //记得清零
        //  触发双击事件...
        if(row.id != 'all') {
          this.editGroupNameHandle(row, index)
        };
      };
      let _this = this
      setTimeout(() => {
        if (this.clickTimes === 1) {
          // 单击事件
          this.clickTimes = 0; // 单击清零
          this.groupActive = row.id;
          this.pageData.current = 1;
          this.getExplorerList(1);
        }
      }, 200)
    },
    editGroupNameHandle(row, index) {
      // 点击编辑分组名
      let groupList = this.groupList;
      groupList[index].edit = true;
      this.groupList = groupList;
      // this.$set(this.groupList[index], 'edit', true);
      this.$nextTick(() => {
        this.$refs["editGroupInput" + index][0].focus();
      });
    },
    deleteGroupHandle(row) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let formData = {
            id: row.id
          };
          this.$api.explorer.imageManage.deleteGroup(formData).then(res => {
            if (res.data.code === 0) {
              this.$message.success("删除成功！");
              this.groupActive = "all";
              this.getGroupList();
            } else {
              this.$message.warning(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    changeGroupNamge(row, index) {
      console.log(row);
    },
    editGroupInputBlur(item, index) {
      let groupList = this.groupList;
      groupList[index].edit = false;
      this.groupList = groupList;
      let formData = {
        id: item.id,
        name: item.name
      };
      this.$api.explorer.imageManage.groupSave(formData).then(res => {
        if (res.data.code === 0) {
          this.$message.success("修改成功！");
        } else {
          this.$message.warning(res.data.message);
        }
        this.getGroupList();
      });
    },
    batchEditHandle() {
      // 批量编辑
      this.isBatchEdit = true;
      this.checkedIdList = [];
    },
    batchEditQuit() {
      // 退出批量编辑
      this.isBatchEdit = false;
      this.checkedIdList = [];
    },
    pageChange(val) {
      this.pageData.current = val;
      this.getExplorerList(val);
    },
    deleteItemHandle(row) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let arr = [row.guid];
          this.deleteItem(arr);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    betchDeleteHandle() {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let arr = [];
          let checkedIdList = this.checkedIdList;
          for (let item of checkedIdList) {
            arr.push(item.guid);
          }
          this.deleteItem(arr);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteItem(arr) {
      let formData = {
        id: arr
      };
      this.$api.explorer.imageManage.deleteImage(formData).then(res => {
        if (res.data.code === 0) {
          this.$message.success("删除成功！");
          this.getExplorerList(this.pageData.current);
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },
    checkItem(row, index) {
      // 点击图片 item
      let checkedIdList = this.checkedIdList;
      if (this.checkedListHas(row.guid)) {
        // 如果已经选中 就取消选择
        for (let [index, item] of checkedIdList.entries()) {
          if (item.guid === row.guid) {
            checkedIdList.splice(index, 1);
            break;
          }
        }
      } else {
        if (
          checkedIdList.length >= this.limit &&
          this.isBatchEdit === false
        ) {
          // 数组的长度大于选择限制 并且当前不是批量编辑状态 删掉数组中第一个
          checkedIdList.splice(0, 1);
        }
        checkedIdList.push(row);
      }
      // 设置全选 是否该选中
      if (checkedIdList.length >= this.imageList.length) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
      this.checkedIdList = checkedIdList;
    },
    delLocalImg(row, index) {
      // 删除本地图片
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let formData = {
            id: [row.id]
          };
          this.$api.explorer.imageManage.deleteImage(formData)
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success("删除成功！");
              let uploadList = this.uploadList;
              uploadList.splice(index, 1);
              this.uploadList = uploadList;
            } else {
              this.$message.warning(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    createGroup() {
      let formData = {
        name: "新建分组"
      };
      this.$api.explorer.imageManage.groupSave(formData).then(res => {
        if (res.data.code === 0) {
          this.$message.success("新建成功！");
        } else {
          this.$message.warning(res.data.message);
        }
        this.getGroupList('addGroup');
      });
    },
    uploadToggleHandle() {
      // 切换到 上传界面
      this.showUploadView = true;
      this.uploadGroup = this.groupActive;
    },
    gobackListView() {
      // 返回列表页
      this.showUploadView = false;
      // this.groupActive = "all";
      this.getGroupList();
      this.checkedIdList = [];
      this.uploadList = [];
      this.uploadGroup = 'all';
    },
    limitExceed(file) {
      this.$message.warning("最大同时上传10张图片！");
      return false;
    },
    beforeUpload(file) {
      // 上传
      if (this.uploadGroup == "") {
        this.showChooseGroupWarning = true;
        return false;
      }
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
      let userInfo = getUserRole();
      let btoken = userInfo.mtoken;
      let key = `explorer/${btoken}/${uuid}${suffix}`;
      // this.uploadList = [];

      qiniuUploadFile(
        file,
        key,
        next => {},
        res => {
          this.uploadSave(file, res);
        },
        err => {
          this.$message.error("上传失败！");
          this.upfileLoading = false;
        }
      );
    },
    uploadSave(file, uploadRes) {
      let formData = {
        id: "",
        src: uploadRes.domain + uploadRes.truekey,
        name: file.name,
        type: file.type,
        size: file.size,
        accept: "image"
      };
      if (this.uploadGroup !== "all") {
        formData.group_id = this.uploadGroup;
      }
      this.$api.explorer.imageManage.upload(formData).then(res => {
        if (res.data.code === 0) {
          // this.$message.success('上传成功！')
          let resData = res.data.data;
          let obj = {
            src: uploadRes.domain + uploadRes.truekey,
            id: resData.id
          };
          let uploadList = this.uploadList;
          uploadList.push(obj);
          this.uploadList = uploadList;
        } else {
          this.$message.warning(res.data.message);
        }
        this.upfileLoading = false;
      })
      .catch(err => {
        this.upfileLoading = false;
      })
    },
    checkedListHas(val) {
      // return this.checkedIdList.includes(val);
      let checkedIdList = this.checkedIdList;
      let flag = false;
      for (let item of checkedIdList) {
        if (item.guid == val) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    confirmMoveHandle() {
      // 确认移动 moveGroup
      let idArr = [];
      let checkedIdList = this.checkedIdList;
      for(let item of checkedIdList) {
        idArr.push(item.guid)
      };
      let formData = {
        id: idArr,
        group_id: this.moveGroup
      };
      this.$api.explorer.imageManage.moveImage(formData).then(res => {
        if (res.data.code === 0) {
          this.$message.success('移动成功！');
          this.groupActive = this.moveGroup;
        } else {
          this.$message.warning(res.data.message);
        };
        this.pageData.current = 1;
        this.getExplorerList(1);
        this.checkedIdList = [];
        this.moveGroup = '';
      });
      this.movePopShow = false;
    },
    cancelMoveHandle() {
      // 取消移动
      this.movePopShow = false;
      this.moveGroup = '';
    },
    submitChecked() {
      this.$emit('checkedImage', this.checkedIdList);
    },
    close() {
      this.$emit('close', true);
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>