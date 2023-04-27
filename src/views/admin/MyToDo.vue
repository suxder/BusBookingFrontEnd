<template>
  <div>
    <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="500"
        stripe
        @selection-change="handleSelectionChange">
      <el-table-column
          label="序号"
          type="index"
          sortable
          width="100"
          >
      </el-table-column>
      <el-table-column
          type="selection"
          width="100">
      </el-table-column>
      <el-table-column
          label="任务ID"
          prop="id"
          width="180">
      </el-table-column>
      <el-table-column
          prop="applyMemberName"
          label="借款人"
          width="180">
      </el-table-column>
      <el-table-column
          prop="applyTime"
          label="借款时间"
          sortable
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          label="操作"
          width="300">
        <template slot-scope="scope">
          <el-button @click="dialogFormVisible = true;getDetails(1,scope.row)" type="primary" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 代办事项详情查看 -->
    <el-dialog title="申请单" :visible.sync="dialogFormVisible">
      <el-form :model="dialogData">
        <el-form-item label="申请者姓名：" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="dialogData.applyMemberName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="申请完成时间" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="dialogData.applyTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍ID" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="dialogData.bookId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="dialogData.stock" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="审批意见" :label-width="formLabelWidth">
          <el-input  v-model="content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="审批结果：" :label-width="formLabelWidth">
          <el-select v-model="isPass" placeholder="请选择">
            <el-option label="同意" value="true"></el-option>
            <el-option label="拒绝" value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返 回</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;complete()">确 定</el-button>
      </div>
    </el-dialog>
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
  name: "MyToDo",
  data() {
    return {
      tableData: null,
      dialogData: {
      },
      multipleSelection: [],
      isPass: null,
      content: null,
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取代办任务
    getTasks(currPage){
      this.$http
          .get('/wareapply/assignee/tasks',{
            params: {
              memberId: localStorage.accountId,
              limit: "11",
              page: currPage
            }
          })
          .then(response => {
            if (response.status === 200) {
              this.tableData = response.data.data

            }
          })
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
    },
    //获取查看详情
    getDetails(currPage,index){
      this.$http
          .get('/wareapply/assignee/tasks',{
            params: {
              memberId: localStorage.accountId,
              limit: "8",
              page: currPage
            }
          })
          .then(response => {
            if (response.status === 200) {
              this.dialogData = index
              console.log(response)
            }
          })
          .catch(function (error) { // 请求失败处理
            console.log(error);
          });
    },
    //审批人完后审批
    complete(){
      this.$http
          .post('/wareapply/complete/task?isPass=' + this.isPass + '&wareApplyId=' + this.dialogData.id + '&content=' + this.content)
          .then(response => {
            if (response.status === 200) {
              this.$message({
                type: 'success',
                message: '任务审批完成'
              });
              this.getTasks(1)
            }
          })
          .catch(function (error) { // 请求失败处理
            console.log(error);
            this.$message.error('糟糕，服务器开小差了TT');
          });
    },
    currentChange (currentPage) {
      this.getTasks(currentPage)
    }
  },

  created() {
    this.getTasks(1)
  }

}
</script>

<style scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
