<template>
  <div class="store-manage" v-loading="pageLoading">
    <div class="header-box clearfix">
      <el-button class="normal-btn pull-left" type="primary" @click="addStore">添加门店</el-button>
      <div class="serach-input-box pull-right">
        <input type="text" class="search-input" v-model="searchVal" placeholder="请输入门店名称" />
        <button class="search-btn" @click="search">
          <i class="el-icon-search icon"></i>
        </button>
      </div>
    </div>
    <div class="create-tips">
      <el-popover placement="right" width="184" trigger="click">
        <el-image style="width: 160px; height: 160px" :src="qrcodeUrl" fit="fit" draggable="false">
          <img slot="error" draggable="false" class="image-error-icon" src="https://cdn.xingchen.cn/FssW3_T3DRshGt5I-TwCb3gWejyd" alt="">
        </el-image>
        <span class="qrcode-tips" slot="reference">查看核销端小程序</span>
      </el-popover>
    </div>
    <div class="table-box" ref="tableBox">
      <el-table :data="tableData" class="custom-table-style" stripe style="width: 100%">
        <el-table-column prop="name" label="门店名称"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="telephone" label="联系电话"></el-table-column>
        <el-table-column prop="business_hours_type" label="营业时间">
          <template slot-scope="scope">
            <template v-if="scope.row.business_hours_type === 1">24小时营业</template>
            <template v-else>{{scope.row.business_hours_start}} - {{scope.row.business_hours_end}}</template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="writeOff(scope.row)">核销员</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="del(scope.row)">删除</el-button>
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
      pageLoading: true,
      qrcodeUrl: "",
      searchVal: "", // 搜索 key
      tableData: [],
      pageData: {
        current: 1,
        size: 10,
        total: 0
      },
    };
  },
  created() {
    this.getList();
    let xc_default_image = JSON.parse(localStorage.getItem('xc_default_image'));
    this.qrcodeUrl = xc_default_image.verificationMiniProgram;
  },
  methods: {
    addStore() {
      this.$router.push({
        name: "CreateShop",
        params: {
          shopID: 0
        }
      });
    },
    edit(row) {
      this.$router.push({
        name: "CreateShop",
        params: {
          shopID: row.id
        }
      });
    },
    writeOff(row) {
      this.$router.push({
        name: "ShopUser",
        params: {
          shopID: row.id
        }
      });
    },
    del(row) {
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
    search() {
      this.pageData.current = 1;
      this.getList(1);
    },
    getList(page) {
      this.pageLoading = true;
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
          this.pageLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.pageLoading = false;
        });
    }
  }
};
</script>

<style>
@import url("./style/setting.min.css");
</style>