<template>
  <div class="store-manage" v-loading="loading">
    <div class="header-box clearfix">
      <el-button class="normal-btn pull-left" type="primary" @click="addStore">添加门店</el-button>
    </div>
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="goods-form-inline" size="small">
        <el-form-item label="门店名称：">
          <el-input v-model="searchForm.key" placeholder="请输入门店名称搜索" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="文章状态：">
          <el-select v-model="searchForm.status" placeholder="请选择文章状态" size="small">
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
    <div class="table-box" ref="tableBox">
      <el-table :data="tableData" class="custom-table-style" stripe style="width: 100%">
        <el-table-column prop="name" label="门店名称"></el-table-column>
        <el-table-column prop="address" label="门店地址"></el-table-column>
        <el-table-column prop="create_at" label="添加时间"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作" width="180px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="editStore(scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="shelvesHandle(scope.row)">下架</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="deleteHandle(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
export default {
  name: "StoreManage",
  data() {
    return {
      loading: false,
      searchForm: {
        key: '',
        status: 0
      },
      tableData: [],
      pageData: {
        current: 1,
        size: 10,
        total: 0
      },
    };
  },
  created() {
    // this.getList();
  },
  methods: {
    addStore() {
      this.$router.push({
        name: "EditStore",
        params: {
          shopID: 0
        }
      });
    },
    editStore(row) {
      this.$router.push({
        name: "EditStore",
        params: {
          shopID: row.id
        }
      });
    },
    shelvesHandle(row) {
      
    },
    deleteHandle(row) {
      this.$confirm("是否确认删除该门店?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let formData = {
            id: row.id
          };
          this.$api.setting.shopManage
            .deleteShop(formData)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success('删除成功！')
              } else {
                this.$message.error(res.data.message);
              };
              this.pageData.current = 1;
              this.getList(1)
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    pageChange(val) {
      this.pageData.current = val;
      this.getList(val);
    },
    handleSizeChange(val) {
      this.pageData.size = val;
      this.$nextTick(() => {
        this.getList();
      })
    },
    searchHandle() {
      this.pageData.current = 1;
      this.getList(1);
    },
    resetSearch() {
      this.searchForm = {
        key: '',
        status: 0
      }
    },
    getList(page) {
      this.loading = true;
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
              this.tableData = resData.items;
              this.pageData.total = resData.count;
            } else {
              this.tableData = [];
              this.pageData.total = 0;
            }
          } else {
            this.$message.error(res.data.message);
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss">
@import './style/index.scss';
</style>