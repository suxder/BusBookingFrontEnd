<template>
  <div>
    <div class="toStorageList">
      <p>入库单</p>
      <el-form  label-width="80px" :model="bookInfo" :rules="bookInfoRules" ref="bookInfoRefs">
        <el-form-item label="申请人">
          <el-input v-model="bookInfo.userName" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="书籍名称" prop="bookName">
          <el-input v-model="bookInfo.bookName"></el-input>
        </el-form-item>
        <el-form-item label="书籍数目" prop="bookCount">
          <el-input v-model="bookInfo.bookCount"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="success" @click="validate">
            <span>
              确认
            </span>
          </el-button>
          <el-button type="info" @click="reset('bookInfoRefs')">
            <span>
              重置
            </span>
          </el-button>
        </el-form-item>

      </el-form>

    </div>

  </div>
</template>

<script>
export default {
  name: "ApplyForStorage",
  data () {
    // 自定义对书籍Id的校验规则

    // 自定义对书籍数目的校验规则
    let validateCount = (rule, value, callback) => {
      if (parseInt(value) <= 0) {
        callback(new Error('请输入大于0的数字'));
      }
      callback()
    }

    return {
      // 书籍数据绑定
      bookInfo: {
        userName: "",
        bookName: "",
        bookCount: null
      },
      // 数据校验规则绑定
      bookInfoRules: {
        bookName: [
          { required: true, message: '请输入书籍名称', trigger: 'blur' }
        ],
        bookId: [
          { required: true, message: '请输入书籍ID', trigger: 'blur' },
          // { validator: validateId, trigger: 'blur' }
        ],
        bookCount: [
          { required: true, message: '请输入书籍数量（单位：本）', trigger: 'blur' },
          { validator: validateCount, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 定义在发起AJAX请求之前，提前对数据进行预校验的函数
    validate () {
      this.$refs.bookInfoRefs.validate(valid => {
        console.log(valid)
        if (valid) {
          console.log(valid)
          this.confirmBtnClick()
        }
      })
    },
    confirmBtnClick () {
      this.$confirm('该操作会将入库单提交至财务进行审核，是否确认提交？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '提交',
        cancelButtonText: '取消'
      })
          .then(() => {
            // 发起axios请求
            this.applyFor()
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                  ? '取消成功'
                  : '停留在当前页面'
            })
          });
    },
    // 定义发起axios请求的函数
    applyFor () {
      const bookName = this.bookInfo.bookName
      const wareApplyVo = {
        "applyMemberId": parseInt(localStorage.accountId),
        "applyMemberName": localStorage.username,
        "stock": parseInt(this.bookInfo.bookCount)
      }
      console.log(wareApplyVo)
      this.$http
          .post('wareapply/add/stock/apply?bookName=' + bookName, wareApplyVo)
          .then(response => {
            if (response.status === 200 && response.data.success === true) {
              this.$message({
                type: 'success',
                message: '提交成功'
              });
            }
            else if (response.status === 200 && response.data.success === false) {
              return this.$message.error(response.data.message)
            }
          })
          .catch(function (error) { // 请求失败处理
            console.log(error)
            this.$message.error('提交失败，请检查您的网络连接是否正常！');
          });
    },
    reset (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created() {
    this.bookInfo.userName = "管理员" + localStorage.username
  }
}
</script>

<style scoped>
.toStorageList {
  border: 1px solid #DCDFE6;
  position: relative;
  width: 50%;
  margin: 0 auto;
}
.toStorageList p {
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  font-weight: 200;
  background-color: #f5f5f5;
}
.toStorageList .el-form {
  padding-top: 50px;
  padding-right: 10px;
}
.toStorageList .btns {
  display: flex;
  justify-content: flex-end;
}
.toStorageList .btns .el-clo span {
  visibility: hidden;
}
</style>
