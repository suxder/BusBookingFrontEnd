<template>
  <div>
    <template>
      <el-button @click="clearFilter">清除所有过滤器</el-button>
      <el-table
          ref="filterTable"
          :data="tableData"
          style="width: 100%"
          height="500"
          stripe>
        <el-table-column
            prop="applyTime"
            label="申请日期"
            width="300"
            sortable
            column-key="date"
        >
        </el-table-column>
        <el-table-column
            prop="id"
            label="记录ID"
            width="150">
        </el-table-column>
        <el-table-column
            prop="bookId"
            label="书籍ID"
            width="150">
        </el-table-column>
        <el-table-column
            prop="stock"
            label="本数"
            width="300"
            sortable>
        </el-table-column>
        <el-table-column
            prop="tag"
            label="状态"
            width="200"
            :filters="[{ text: 'PENDING', value: 'PENDING' }, { text: 'APPLY_FAILED', value: 'APPLY_FAILED' }, { text: 'APPLY_SUCCESS', value: 'APPLY_SUCCESS' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.status === 'PENDING' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="操作"
            width="180">
          <template slot-scope="scope">
            <el-button type="primary" @click="pickUpTasks(scope.row.id)">
              拾取
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
<!--    放置分页按钮-->
    <el-pagination
        background
        layout="prev, pager, next"
        :total="50"
        @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "PickUpTask",
  data () {
    return {
      // 表格数据绑定对象
      tableData: null
    }
  },
  methods: {
    getTasks(currPage) {
      this.$http
          .get('/wareapply/candidate/tasks', {
            params: {
              limit: 8,
              memberId: localStorage.accountId,
              page: currPage
            }
          })
          .then(response => {
            if (response.status === 200) {
              console.log(response)
              this.tableData = response.data.data
            }
          })
          .catch(function (error) { // 请求失败处理
            console.log(error)
          });
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    currentChange (currentPage) {
      this.getTasks(currentPage)
    },
    pickUpTasks (Id) {
      this.$http
          .post('/wareapply/claim?memberId=' + localStorage.accountId + '&wareApplyId=' + Id)
          .then(response => {
            if (response.status === 200) {
              this.$message.success("拾取成功！")
              this.getTasks(1)
            }
          })
          .catch(function (error) { // 请求失败处理
            console.log(error)
          });
    },
    filterTag(value, row) {
      return row.status === value;
    }
  },
  mounted() {
    this.getTasks(1)
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
