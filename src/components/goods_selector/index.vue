<template>
  <div class="goods-selector">
    <el-dialog title="已上架商品" :visible.sync="dialogVisible" width="800px" center @closed="close">
      <div class="goods-selector-body" v-loading="tableLoading">
        <div class="opt-box clearfix">
          <div class="pull-left">
            <el-button type="primary" class="add-btn" @click="createGoods">新建商品</el-button>
            <el-button class="refires-btn" @click="refresh">刷新</el-button>
          </div>
          <div class="pull-right">
            <!-- <el-select v-model="goodsTypeVal" class="group-type-select" placeholder="请选择">
              <el-option
                v-for="item in goodsTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
            <el-cascader
              v-model="goodsTypeVal"
              :options="categoryList"
              :props="{ expandTrigger: 'hover', multiple: goodsType == 'market' ? false : true }"
              @change="groupChange"
              style="width: 200px;"
              size="small"
              placeholder="请选择商品分组"
            ></el-cascader>
            <!-- <el-input placeholder="请输入商品名" @keyup.enter.native="searchHandle" class="search-input" suffix-icon="el-icon-search" v-model="searchVal"></el-input> -->
            <div class="search-input el-input el-input--suffix"><!---->
              <input type="text" autocomplete="off" v-model="searchVal" placeholder="请输入商品名" class="el-input__inner">
              <span class="el-input__suffix" @click="searchHandle" style="cursor: pointer;">
                <span class="el-input__suffix-inner">
                  <i class="el-input__icon el-icon-search"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
        <el-table
          ref="goodsTable"
          :data="goodsList"
          tooltip-effect="dark"
          style="width: 100%; margin-bottom: 15px;"
          @selection-change="selectionChange"
          @select="handleTableChange"
          @select-all="handleSelectAll"
        >
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column label="全选" width="60">
            <template slot-scope="scope">
              <el-image style="width: 40px; height: 40px" :src="goodsType === 'market' ? scope.row.imageUrl : scope.row.picUrl" fit="cover">
                <img slot="error" class="image-error-icon" src="https://cdn.xingchen.cn/FssW3_T3DRshGt5I-TwCb3gWejyd" alt="">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品信息">
            <template slot-scope="scope">
              <div class="overflow-text-2">
                {{scope.row.name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="priceCurrentMin" label="售价">
            <template slot-scope="scope">
              <template v-if="scope.row.specType === 0">
                <span>￥{{scope.row.priceCurrentMin/100 | priceFilter}}</span>
              </template>
              <template v-else>
                <span>￥{{scope.row.priceCurrentMin/100 | priceFilter}}</span>
                <span>~</span>
                <span>{{scope.row.priceCurrentMax/100 | priceFilter}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="商品分类">
            <template slot-scope="scope">
              {{scope.row.categoryName}}
              <span v-if="scope.row.subclassName"> - {{scope.row.subclassName}}</span>
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
            layout="prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close" class="normal-btn">取 消</el-button>
        <el-button type="primary" @click="save" class="normal-btn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";
import { mapState } from "vuex"

export default {
  name: "linkSelector",
  props: ["currentGoods", "goodsType"],
  computed: {
    ...mapState(['domainURL'])
  },
  watch: {
    currentGoods: {
      immediate: true,
      deep: true,
      handler(val) {
        if(this.goodsType === 'market') {
          let id = []
          for(let item of val) {
            id.push(item.productUuid)
          };
          this.selectedGoodsID = id;
          this.selectedGoods = val
        } else {
          this.selectedGoodsID = val;
        }
      }
    }
  },
  data() {
    return {
      tableLoading: true,
      pageData: {
        current: 1,
        size: 10,
        total: 0
      },
      goodsTypeVal: ['0'],
      searchVal: '',
      goodsList: [],
      categoryList: [],
      currentGoodsRes: [],
      dialogVisible: true,
      selectedGoodsID: [],
      selectedGoods: [],
      multipleSelection: [],
      group: [],
      subGroup: []
    };
  },
  created() {
    this.getGoodsList();
    this.getCategoryList();
  },
  mounted() {},
  methods: {
    refresh() {
      this.pageData.current = 1
      this.getGoodsList(1)
    },
    searchHandle() {
      this.pageData.current = 1
      this.getGoodsList(1)
    },
    createGoods() {
      let link = 'http://store.'+this.domainURL+'/goodsManage/goodsCreate/0'
      // window.location.href = link;
      window.open(link)
    },
    pageChange(val) {
      this.pageData.current = val
      this.getGoodsList(val)
    },
    getCategoryList() {
      // 获取 分类列表
      let formData = {
        page: 1,
        pageSize: 999,
        keyword: ""
      };

      this.$api.goods.goodsCategory
        .categoryList(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            let items = resData.items;
            let categoryList = [];
            if(this.goodsType == 'market') {
              categoryList = [{
                value: '0',
                label: '全部商品'
              }]
            };
            for (let item of items) {
              let obj = {
                value: item.id,
                label: item.categoryName
              };
              if(item.child && item.child.length > 0) {
                obj.children = [];
                for (let childItem of item.child) {
                  let childObj = {
                    value: childItem.id,
                    label: childItem.subclassName
                  };
                  obj.children.push(childObj);
                }
              };
              categoryList.push(obj);
            };
            this.categoryList = categoryList;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    groupChange(val) {
      if(this.goodsType != 'market') {
        let groupIds = [];
        let subGroupIds = [];
        for(let item of val) {
          if(item[1]) {
            subGroupIds.push(item[1])
          } else {
            groupIds.push(item[0])
          }
        };
        this.group = groupIds;
        this.subGroup = subGroupIds;
      };
      this.pageData.current = 1
      this.$nextTick(() => {
        this.getGoodsList(1)
      })
    },
    fillTable() {
      let rows = this.selectedGoodsID;
      if (rows.length > 0) {
        rows.forEach(row => {
          this.$refs.goodsTable.toggleRowSelection(
            this.goodsList.find(item => {
              return row == item.productUuid;
            }),
            true
          );
        });
      } else {
        this.$refs.goodsTable.clearSelection();
      }
    },
    getGoodsList(page) {
      this.tableLoading = true;
      let formData = {
        page: page ? page : this.pageData.current,
        pageSize: this.pageData.size,
        tabConditions: '0',
        keyword: this.searchVal,
        status: 1
      };
      if(this.goodsType === 'market') {
        if(this.goodsTypeVal[0]) {
          formData.categoryId = this.goodsTypeVal[0]
        }
        if(this.goodsTypeVal[1]) {
          formData.subclassId = this.goodsTypeVal[1]
        }
        this.$api.marketing.distribution.getDistributionAddGoods(formData)
          .then(res => {
            this.getGoodsListSuccess(res)
          })
          .catch(err => {
            this.tableLoading = false
          })
      } else {
        formData.categoryIds = this.group;
        formData.subclassIds = this.subGroup;
        // formData.fromChannel = [1];
        this.$api.goods.goodsManage.getGoodsList(formData)
          .then(res => {
            this.getGoodsListSuccess(res)
          })
          .catch(err => {
            this.tableLoading = false
          })
      }
    },
    getGoodsListSuccess(res) {
      if(res.data.code === 0) {
        let resData = res.data.data;
        this.pageData.total = resData.count;
        let items = resData.items;
        this.goodsList = items;
        this.$nextTick(() => {
          this.fillTable(items)
        })
      } else {
        this.$message.warning(res.data.message)
        this.goodsList = []
      };
      this.tableLoading = false
    },
    selectionChange(val) {},
    differenceArr(a, b) {
      const s = new Set(b);
      return a.filter(x => !s.has(x));
    },
    handleSelectAll(selection) {
      let selectedGoodsID = this.selectedGoodsID;
      let selectedGoods = this.selectedGoods;
      // 先清空当前页数据 id
      for(let i of this.goodsList) {
        for(let [index, j] of selectedGoodsID.entries()) {
          if(i.productUuid == j) {
            selectedGoodsID.splice(index, 1);
            selectedGoods.splice(index, 1);
          };
        }
      };
      // 再选中要选的 id
      if(selection.length != 0) {
        for(let item of selection) {
          if(item && item.productUuid) {
            selectedGoodsID.push(item.productUuid)
            selectedGoods.push(item)
          }
        }
      };
      this.selectedGoodsID = selectedGoodsID;
      this.selectedGoods = selectedGoods;
    },
    handleTableChange(selection, row) {
      console.log(selection, row)
      console.log(this.selectedGoodsID)
      let changeType = 'add';
      let selectedGoodsID = this.selectedGoodsID;
      let selectedGoods = this.selectedGoods;

      for(let [index_, item_] of selectedGoodsID.entries()) {
        if(item_ && item_ === row.productUuid) {
          selectedGoodsID.splice(index_, 1);
          selectedGoods.splice(index_, 1);
          changeType = 'remove'
        }
      };
     
      if(changeType == 'add') {
        selectedGoodsID.push(row.productUuid);
        selectedGoods.push(row);
      };
      this.selectedGoodsID = selectedGoodsID;
      this.selectedGoods = selectedGoods;
    },
    close() {
      this.$emit("closed", true);
    },
    save() {
      let list = []
      let multipleSelection = this.multipleSelection;
      if(this.goodsType === 'market') {
        list = this.selectedGoods;
      } else {
        list = this.selectedGoodsID;
      };
      this.$emit("submit", list);
    }
  },
  filters: {
    priceFilter(val) {
      let realVal = ''
      if (!isNaN(val) && val!== '') {
        realVal = parseFloat(val).toFixed(2)
      } else {
        realVal = '0.00'
      };
      return realVal;
    }
  }, 
};
</script>

<style>
@import url("./style/index.min.css");
</style>