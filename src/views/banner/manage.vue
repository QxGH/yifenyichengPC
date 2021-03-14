<!--
 * @Description: 轮播管理
 * @Date: 2021-02-24 11:34:58
 * @LastEditTime: 2021-02-24 15:25:47
-->
<template>
  <div class="banner-manage" v-loading="loading">
    <el-tabs v-model="activeName" type="card" @tab-click="tabChange">
      <el-tab-pane label="品牌加盟页" name="1"></el-tab-pane>
      <el-tab-pane label="产品介绍页" name="2"></el-tab-pane>
      <el-tab-pane label="门店展示页" name="3"></el-tab-pane>
      <el-tab-pane label="品牌介绍页" name="4"></el-tab-pane>
      <el-tab-pane label="新闻资讯页" name="5"></el-tab-pane>
    </el-tabs>
    <div>
      <el-button type="primary" class="normal-btn" @click="addHandle">添加轮播图</el-button>
    </div>
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="goods-form-inline" size="small">
        <el-form-item label="轮播名称：">
          <el-input v-model="searchForm.key" placeholder="请输入名称搜索" size="small" clearable></el-input>
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
        ref="goodsTable"
        style="width: 100%"
      >
        <el-table-column prop="title" label="名称">
          <template slot-scope="scope">
            <p class="overflow-text" :title="scope.row.name">
              {{scope.row.name}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="index" label="排序"></el-table-column>
        <el-table-column prop="addr" label="跳转地址">
          <template slot-scope="scope">
            <p class="overflow-text" :title="scope.row.addr">
              {{scope.row.addr}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="create_at" label="添加时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="110">
          <template slot-scope="scope">
            <el-button @click="editHandle(scope.row)" type="text" >编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
              title="是否确实删除该轮播图？"
              @onConfirm="deleteHandle(scope.row)"
            >
              <el-button slot="reference" type="text">删除</el-button>
            </el-popconfirm>
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
  name: 'BannerManage',
  data() {
    return {
      loading: false,
      activeName: '1',
      searchForm: {
        key: ''
      },
      tableData: [
        {
          name: '22'
        }
      ],
      pageData: {
        current: 1,
        size: 10,
        total: 0
      },
    }
  },
  created() {
    if(this.$route.params.type) {
      this.activeName = this.$route.params.type
    };
    this.$nextTick(() => {
      this.getList();
    })
  },
  methods: {
    tabChange(val) {
      this.pageData.current = 1;
      this.getList(1);
    },
    searchHandle() {
      this.pageData.current = 1;
      this.getList(1);
    },
    resetSearch() {
      this.searchForm = {
        key: ''
      }
    },
    addHandle() {
      this.$router.push({
        name: 'BannerEdit',
        params: {
          type: this.activeName,
          id: 0
        }
      })
    },
    editHandle(row) {
      this.$router.push({
        name: 'BannerEdit',
        params: {
          type: this.activeName,
          id: row.id
        }
      })
    },
    deleteHandle(row) {
      this.loading = true;
      let formData = {
        id: row.id
      };

      this.$api.banner
        .delete(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.loading = false;
            this.$message.success('删除成功')
          } else {
            this.$message.error(res.data.message);
          };
          this.getList()
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    getList(currentPage) {
      this.loading = true;

      let formData = {
        page: currentPage ? currentPage : this.pageData.current,
        limit: this.pageData.size,
        type: this.activeName,
        keyword: this.searchForm.key
      };

      this.$api.banner
        .list(formData)
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
  }
}
</script>

<style lang="scss">
@import './style/index.scss';
</style>