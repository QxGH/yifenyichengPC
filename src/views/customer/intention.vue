<template>
  <div class="customer-intention">
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" size="small">
        <el-form-item label="客户状态：">
          <el-select v-model="searchForm.status" placeholder="请选择客户状态" size="small">
            <el-option label="全部状态" :value="0"></el-option>
            <el-option label="展示中" :value="1"></el-option>
            <el-option label="已下架" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="search-btn-box">
        <el-button type="primary" @click="searchHandle">筛选</el-button>
        <el-button type="text" @click="resetSearch">重置筛选条件</el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        stripe
        class="custom-table-style"
        ref="intentionTable"
        style="width: 100%"
        @selection-change="tableSelectionChange"
      >
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="create_at" label="提交时间"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="status" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button @click="editHandle(scope.row)" type="text" >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="selection-del-box" v-if="tableData.length > 0">
      <el-checkbox v-model="allChecked" @change="changeAllSelection">当页全选</el-checkbox>
      <el-button
        class="sel-selection-btn"
        :disabled="multipleSelection.length <= 0"
        @click="communicated"
      >批量设置为未沟通</el-button>
      <el-button
        class="sel-selection-btn"
        :disabled="multipleSelection.length <= 0"
        @click="notCommunicated"
      >批量设置为已沟通</el-button>
    </div>
    <div class="pagetion-box">
      <el-pagination
        background
        :page-size="pageData.size"
        :current-page="pageData.current"
        :total="pageData.total"
        @current-change="pageChange"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>

    <el-dialog
      title="编辑"
      :visible.sync="editDialog"
      width="480px"
      center
      @closed="editDialogClose"
    >
      <div class="dialog-body pd-r-16">
        <el-form :model="editForm" :rules="editFormRules" size="small" ref="groupForm" label-width="80px">
          <el-form-item label="状态：" prop="status">
            <el-radio-group v-model="editForm.status">
              <el-radio :label="1">设为已沟通</el-radio>
              <el-radio :label="2">设为未沟通</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input 
              type="textarea" 
              :autosize="{ minRows: 5, maxRows: 8}"
              v-model="editForm.remark" 
              placeholder="请输入备注" 
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false" class="normal-btn">取 消</el-button>
        <el-button type="primary" @click="editSubmit" class="normal-btn">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'CustomerIntention',
  data() {
    return {
      searchForm: {
        status: 0
      },
      tableData: [
        {
          name: '22'
        }
      ],
      editDialog: false,
      editRow: {},
      multipleSelection: [],
      allChecked: false,
      pageData: {
        current: 1,
        size: 10,
        total: 0
      },
      editForm: {
        status: 1,
        remark: ''
      },
      editFormRules: {},
    }
  },
  methods: {
    searchHandle() {},
    resetSearch() {},
    tableSelectionChange(val) {
      // table 多选
      this.multipleSelection = val;
      if (val.length <= this.pageData.size && val.length !== 0) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
    },
    changeAllSelection() {
      // 全选当页 change 事件
      let rows = this.tableData;
      if (val) {
        rows.forEach(row => {
          this.$refs.intentionTable.toggleRowSelection(row, true);
        });
        this.allChecked = true;
      } else {
        this.$refs.intentionTable.clearSelection();
        this.allChecked = false;
      };
    },
    communicated() {
      // 批量已沟通

    },
    notCommunicated() {
      // 批量未沟通

    },
    editHandle(row) {
      this.editRow = row;
      this.editDialog = true;
    },
    editSubmit() {

    },
    editDialogClose() {},
    pageChange(val) {
      this.pageData.current = val;
      this.getList(val);
    },
    handleSizeChange(val) {
      this.pageData.size = val;
      this.$nextTick(() => {
        this.getList();
      });
    },
    getList(currentPage) {
      this.loading = true;

      let formData = {
        page: currentPage ? currentPage : this.pageData.current,
        pageSize: this.pageData.size,
      };

      this.$api.goods.goodsManage
        .getGoodsList(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            console.log("getList -> getList", resData)
            if(resData) {
              this.tableData = resData.items;
              this.pageData.total = resData.count;
            } else {
              this.tableData = [];
              this.pageData.total = 0;
            }
            console.log(resData.items)
          } else {
            this.$message.error(res.data.message);
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
  }
}
</script>

<style lang="scss">
@import './style/index.scss';
</style>