<!--
 * @Description: 分组管理
 * @Date: 2021-02-24 14:39:29
 * @LastEditTime: 2021-02-24 15:00:08
-->
<template>
  <div class="group-manage">
    <el-tabs v-model="activeName" type="card" @tab-click="tabChange">
      <el-tab-pane label="文章管理" name="1"></el-tab-pane>
      <el-tab-pane label="分组设置" name="2"></el-tab-pane>
    </el-tabs>
    <div class="mg-b-10">
      <el-button type="primary" class="normal-btn" @click="addHandle">添加分组</el-button>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        stripe
        class="custom-table-style"
        ref="goodsTable"
        style="width: 100%"
      >
        <el-table-column prop="title" label="标题">
          <template slot-scope="scope">
            <p class="overflow-text">
              {{scope.row.title}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="分组名称"></el-table-column>
        <el-table-column prop="index" label="排序"></el-table-column>
        <el-table-column prop="create_at" label="添加时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="110">
          <template slot-scope="scope">
            <el-button @click="editHandle(scope.row)" type="text" >编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
              title="是否确实删除该分组？"
              @onConfirm="deleteHandle(scope.row)"
            >
              <el-button slot="reference" type="text" >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="editRow ? '编辑分组' : '新建分组'"
      :visible.sync="createGroupDialog"
      width="480px"
      center
      @closed="closeGroup"
    >
      <div class="dialog-body pd-r-16">
        <el-form :model="form" :rules="formRules" size="small" ref="groupForm" label-width="100px">
          <el-form-item label="分组名称：" prop="name">
            <el-input v-model="form.name" maxlength="8" show-word-limit placeholder="8个字以内"></el-input>
          </el-form-item>
          <el-form-item label="排序：" prop="index">
            <el-input v-model="form.index" placeholder="数字越大越靠前"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createGroupDialog = false" class="normal-btn">取 消</el-button>
        <el-button type="primary" @click="createGroupSubmit" class="normal-btn">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
export default {
  name: 'GroupMange',
  data() {
    return {
      activeName: '2',
      tableData: [
        {id: 1}
      ],
      editRow: null,
      createGroupDialog: false,
      form: {
        name: '',
        index: ''
      },
      formRules: {
        name: { required: true, message: "请输入分组名称", trigger: "blur" }
      }
    }
  },
  methods: {
    tabChange(val) {
      if(val.name == 1) {
        this.$router.push({
          name: 'ArticleManage'
        })
      }
    },
    addHandle() {
      this.editRow = null;
      this.createGroupDialog = true;
    },
    editHandle(row) {
      this.editRow = row;
      this.createGroupDialog = true;
    },
    deleteHandle(row) {},
    closeGroup() {
      this.form = {
        name: '',
        index: ''
      }
    },
    createGroupSubmit() {
      this.$refs['groupForm'].validate((valid) => {
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