<template>
  <div class="article-selector">
    <el-dialog
      title="选择文章咨询"
      :visible.sync="dialogVisible"
      center
      width="800px"
      @closed="dialogClosed">
      <div class="dialog-body">
        <el-table
          :data="tableData"
          stripe
          class="custom-table-style"
          ref="goodsTable"
          style="width: 100%"
        >
          <el-table-column label="选择" width="80">
            <template slot-scope="scope">
              <el-radio v-model="selected" :label="scope.row.id" class="hide-label"></el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="index" label="标题">
            <template slot-scope="scope">
              <p class="overflow-text" :title="scope.row.title">
                {{scope.row.title}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="normal-btn">取 消</el-button>
        <el-button type="primary" @click="submitHandle" :disabled="!selected" class="normal-btn">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'ArticleSelector',
  data() {
    return {
      dialogVisible: true,
      tableData: [
        {
          id: 'qweqwe-q231-12313-33'
        }
      ],
      selected: null
    }
  },
  methods: {
    dialogClosed() {
      this.$emit('closed', true)
    },
    submitHandle() {
      this.$emit('submit', this.selected)
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>