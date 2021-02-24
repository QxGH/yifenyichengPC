<!--
 * @Description: 文章管理
 * @Date: 2021-02-24 11:34:58
 * @LastEditTime: 2021-02-24 15:25:47
-->
<template>
  <div class="article-manage" v-loading="loading">
    <el-tabs v-model="activeName" type="card" @tab-click="tabChange">
      <el-tab-pane label="文章管理" name="1"></el-tab-pane>
      <el-tab-pane label="分组设置" name="2"></el-tab-pane>
    </el-tabs>
    <div>
      <el-button type="primary" class="normal-btn" @click="addHandle">添加文章</el-button>
    </div>
    <div class="search-box">
      <el-form :inline="true" :model="searchForm" class="goods-form-inline" size="small">
        <el-form-item label="文章名称：">
          <el-input v-model="searchForm.key" placeholder="请输入文章名称搜索" size="small" clearable></el-input>
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
        <el-table-column prop="index" label="排序"></el-table-column>
        <el-table-column prop="index" label="浏览次数"></el-table-column>
        <el-table-column prop="create_at" label="添加时间"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button @click="editHandle(scope.row)" type="text" >编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button @click="putShelfHandle(scope.row, 1)" type="text" >上架</el-button>
            <el-divider direction="vertical"></el-divider>
            <!-- <el-button @click="offShelfHandle(scope.row, 0)" type="text">下架</el-button>
            <el-divider direction="vertical"></el-divider> -->
            <el-popconfirm
              title="是否确实删除该文章？"
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
  name: 'ArticleManage',
  data() {
    return {
      loading: false,
      activeName: '1',
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
    }
  },
  methods: {
    tabChange(val) {
      if(val.name == 2) {
        this.$router.push({
          name: 'GroupManage'
        })
      }
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
    addHandle() {
      this.$router.push({
        name: 'ArticleEdit',
        params: {
          id: 0
        }
      })
    },
    editHandle(row) {
      this.$router.push({
        name: 'ArticleEdit',
        params: {
          id: row.id
        }
      })
    },
    putShelfHandle(row) {},
    offShelfHandle(row) {},
    deleteHandle(row) {},
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