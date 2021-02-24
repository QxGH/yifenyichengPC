<template>
  <el-dialog
    title="选择自提门店"
    custom-class="store-selector-dialog"
    :visible.sync="dialogVisible"
    width="800px"
    center
    @closed="close"
  >
    <div class="search-box">
      <div class="serach-input-box">
        <input type="text" class="search-input" v-model="searchVal" placeholder="请输入门店名称" />
        <button class="search-btn" @click="search">
          <i class="el-icon-search icon"></i>
        </button>
      </div>
    </div>
    <el-table
      ref="storeTable"
      class="store-table"
      :data="tableData"
      style="width: 100%"
      height="350"
      stripe
      @selection-change="handleSelectionChange"
      @select="handleTableChange"
      @select-all="handleSelectAll"
    >
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column prop="name" label="全选当前页"></el-table-column>
    </el-table>
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <!-- <el-button @click="submit('all')">全部门店</el-button> -->
      <el-button type="primary" @click="submit('confirm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "StoreSelector",
  props: ['currentShopID'],
  watch: {
    currentShopID: {
      immediate: true,
      deep: true,
      handler(val) {
        this.selectedShopID = val;
      }
    }
  },
  data() {
    return {
      dialogVisible: true,
      searchVal: "", // 搜索input val
      tableData: [],
      multipleSelection: [],
      pageData: {
        // 分页数据
        current: 1,
        size: 10,
        total: 0
      },
      selectedShopID: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSelectionChange(val) {
      // console.log('handleSelectionChange')
      // console.log(val)
      // this.multipleSelection = val;
    },
    search() {
      this.getList();
    },
    handleSelectAll(selection) {
      let selectedShopID = this.selectedShopID;
      // 先清空当前页数据 id
      for(let i of this.tableData) {
        for(let [index, j] of selectedShopID.entries()) {
          if(i.id == j) {
            selectedShopID.splice(index, 1);
          };
        }
      };
      // 再选中要选的 id
      if(selection.length != 0) {
        for(let item of selection) {
          if(item && item.id) {
            selectedShopID.push(item.id)
          }
        }
      };
      this.selectedShopID = selectedShopID;
    },
    handleTableChange(selection, row) {
      let changeType = 'add';
      let selectedShopID = this.selectedShopID;
      for(let [index_, item_] of selectedShopID.entries()) {
        if(item_ && item_ == row.id) {
          selectedShopID.splice(index_, 1);
          changeType = 'remove'
        }
      };
     
      if(changeType == 'add') {
        if(selectedShopID.length >= 100) {
          this.$message.warning('最多只能手动选择100个门店！');
          return;
        };
        selectedShopID.push(row.id);
      };
      this.selectedShopID = selectedShopID;
    },
    pageChange(val) {
      this.pageData.current = val;
      this.getList(val)
    },
    handleSizeChange(val) {
      this.pageData.size = val;
      this.$nextTick(() => {
        this.getList();
      })
    },
    selectorSelection() {
      let rows = this.selectedShopID;
      rows.forEach(row => {
        this.$refs.storeTable.toggleRowSelection(
          this.tableData.find(item => {
            return parseInt(row) == item.id;
          }),
          true
        );
      });
    },
    getList(page) {
      let formData = {
        page: page ? page : this.pageData.current,
        limit: this.pageData.size,
        keyword: this.searchVal
      };
      this.$api.setting.shopManage
        .getShopList(formData)
        .then(res => {
          if (res.data.code === 0) {
            if (res.data.data) {
              let resData = res.data.data;
              // console.log(resData)
              this.tableData = resData.items;
              this.pageData.total = resData.count;
              this.$nextTick(() => {
                this.selectorSelection(resData.items)
              })
            } else {
              this.tableData = [];
              this.pageData.total = 0;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submit(type) {
      let list = [];
      let obj = {
        type,
        list: this.selectedShopID
      };
      this.$emit('checkedShop', obj)
    },
    close() {
      this.$emit('closed', true)
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>