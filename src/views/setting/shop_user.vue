<template>
  <div class="shop-user" v-loading="pageLoading">
    <div class="warning-alert">
      <i class="icon el-icon-warning"></i>
      <span class="text">说明：门店核销员仅可核销买家购买的核销订单，无其他权限。</span>
    </div>
    <div class="header-box clearfix">
      <el-button class="normal-btn pull-left" type="primary" @click="addUser">添加核销员</el-button>
      <div class="serach-input-box pull-right">
        <input type="text" class="search-input" v-model="searchVal" placeholder="请输入核销员名称" @keyup.enter="search" />
        <button class="search-btn" @click="search">
          <i class="el-icon-search icon"></i>
        </button>
      </div>
    </div>
    <el-table :data="tableData" class="custom-table-style" stripe style="width: 100%">
      <el-table-column prop="truename" label="姓名" ></el-table-column>
      <el-table-column prop="name" label="登录账号" ></el-table-column>
      <el-table-column prop="created_at" label="创建时间" ></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="changeStatus(scope.row)">
            <template v-if="scope.row.status === 1">
              禁用
            </template>
            <template v-else>
              启用
            </template>
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
export default {
  name: 'NameUser',
  data() {
    return {
      pageLoading: true,
      searchVal: '',
      tableData: [],
      pageData: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    if(this.$route.params.prevPage) {
      let page = parseInt(this.$route.params.prevPage);
      this.pageData.current = page
      this.getList(page);
    } else {
      this.getList();
    }
  },
  methods: {
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
    getList(page) {
      this.pageLoading = true;
      let formData = {
        page: page ? page : this.pageData.current,
        limit: this.pageData.size,
        shop_id: this.$route.params.shopID,
        keyword: this.searchVal
      };
      this.$api.shop.verifier.list(formData)
      .then(res => {
        if(res.data.code === 0) {
          if(res.data.data) {
            let resData = res.data.data;
            this.tableData = resData.items;
            this.pageData.total = resData.count;
          } else {
            this.tableData = []
            this.pageData.total = 0
          }
        } else {
          this.$message.warning(res.data.message)
        }
        this.pageLoading = false;
      })
      .catch(err => {
        this.pageLoading = false;
      })
    },
    addUser() {
      this.$router.push({
        name: 'EditShopUser',
        params: {
          shopId: this.$route.params.shopId,
          userId: 0,
          prevPage: 1
        }
      })
    },
    edit(row) {
      this.$router.push({
        name: 'EditShopUser',
        params: {
          shopId: this.$route.params.shopId,
          userId: row.id,
          prevPage: this.pageData.current
        }
      })
    },
    search() {
      this.pageData.current = 1;
      this.getList(1)
    },
    changeStatus(row) {
      let formData = {
        id: row.id
      };
      this.$api.shop.verifier.changeStatus(formData)
      .then(res => {
        if(res.data.code === 0) {
          this.$message.success(res.data.message)
        } else {
          this.$message.warning(res.data.message)
        };
        this.getList()
      })
    },
    del(row) {
      this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let formData = {
            id: row.id
          };
          this.$api.shop.verifier.delUser(formData)
          .then(res => {
            if(res.data.code === 0) {
              this.$message.success(res.data.message)
            } else {
              this.$message.warning(res.data.message)
            };
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  }
}
  
</script>

<style>
@import url("./style/setting.min.css");
</style>