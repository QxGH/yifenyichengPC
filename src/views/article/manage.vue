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
            <p class="overflow-text" :title="scope.row.title">
              {{scope.row.title}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="100"></el-table-column>
        <el-table-column prop="data_popularity" label="浏览次数" width="100"></el-table-column>
        <el-table-column prop="created_at" label="添加时间"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            {{scope.row.status | statusFilter}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button @click="editHandle(scope.row)" type="text" >编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <template v-if="scope.row.status == 1">
              <el-button @click="operation(scope.row, 'disable')" type="text">下架</el-button>
            </template>
            <template v-else>
              <el-button @click="operation(scope.row, 'enable')" type="text" >上架</el-button>
            </template>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
              title="是否确实删除该文章？"
              @onConfirm="operation(scope.row, 'delete')"
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
  created() {
    this.getList()
  },
  methods: {
    tabChange(val) {
      if(val.name == 2) {
        this.$router.push({
          name: 'Category'
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
    operation(row, type) {
      this.loading = true;

      let formData = {
        id: row.id,
        type
      };

      this.$api.article.manage
        .operation(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success('操作成功')
          } else {
            this.$message.error(res.data.message);
          };
          this.getList();
          this.loading = false;
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
        keyword: this.searchForm.key,
        status: this.searchForm.status
      };

      this.$api.article.manage
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
  },
  filters: {
    statusFilter(val) {
      let map = {
        1: '展示中',
        2: '已下架'
      }
      return map[val];
    }
  }
}
</script>

<style lang="scss">
@import './style/index.scss';
</style>