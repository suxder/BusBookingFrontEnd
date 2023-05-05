<template>
  <div>

    <el-form :inline="true" class="queryTrains">
      <el-form-item label="PTC管理员">
        <el-input v-model="ptcAdminID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-button style="float:right;" type="primary" icon="el-icon-plus" circle @click="addStation"></el-button>
    </el-form>

    <el-table
    height="460"
    border
    v-loading="loading"
    :data="tableData"
    :default-sort = "{prop: 'adminID', order: 'ascending'}"
    style="width: 100%;fontSize: 14px;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="trainManager_expand">
            <el-form-item label="客运中心管理员ID">
              <span>{{ props.row.adminID }}</span>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ props.row.adminName }}</span>
            </el-form-item>
            <el-form-item label="电话号码">
              <span>{{ props.row.telephone }}</span>
            </el-form-item>
            <el-form-item label="客运中心名称">
              <span>{{ props.row.adminPtc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="客运中心管理员ID"
        prop="adminID">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="adminName">
      </el-table-column>
      <el-table-column
        label="电话号码"
        prop="telephone">
      </el-table-column>
      <el-table-column
        label="客运中心名称"
        prop="adminPtc">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editStation(JSON.parse(JSON.stringify(scope.row)))">编辑</el-button>
          <el-popconfirm
            title="确定删除此管理员吗？"
            icon="el-icon-warning"
            icon-color="red"
            @confirm="deleteStation(scope.row)"
          >
            <el-button
            slot="reference"
            size="mini"
            type="danger"
            style="marginLeft: 10px;">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改PTC管理员信息 -->
    <el-dialog
      title="编辑客运中心管理员信息"
      :visible.sync="infoDialogVis"
      width="30%"
      center
    >
      <el-form
        :model="ptcAdminInfo"
        class="train-form"
        label-width="130px"
        label-position="left"
        size="medium"
        hide-required-asterisk
      >
        <el-form-item label="客运中心管理员ID" prop="adminID">
          <el-input
            v-model="ptcAdminInfo.adminID"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="telephone">
          <el-input
            v-model="ptcAdminInfo.telephone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="adminName">
          <el-input
            v-model="ptcAdminInfo.adminName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
         <el-form-item label="客运中心名称" prop="adminPtc">
          <el-input
            v-model="ptcAdminInfo.adminPtc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
        <el-button @click="handleDialogCancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="添加客运中心管理员"
      :visible.sync="addDialogVis"
      width="30%"
      center
    >
      <el-form
        :model="addPtcAdminInfo"
        class="train-form"
        label-width="130px"
        label-position="left"
        size="medium"
        hide-required-asterisk
      >
        <el-form-item label="电话号码" prop="telephone">
          <el-input
            v-model="addPtcAdminInfo.telephone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="adminPwd">
          <el-input
            v-model="addPtcAdminInfo.adminPwd"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="adminName">
          <el-input
            v-model="addPtcAdminInfo.adminName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
         <el-form-item label="客运中心名称" prop="adminPtc">
          <el-input
            v-model="addPtcAdminInfo.adminPtc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddDialogConfirm">添 加</el-button>
        <el-button @click="handleAddDialogCancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

export default {
  data() {
    return {
      // 表格数据加载flag变量
      loading: true,
      tableData: [],
      infoDialogVis: false,
      addDialogVis: false,
      ptcAdminInfo: {},
      addPtcAdminInfo: {
        telephone: "",
        adminName: "",
        adminPwd: "",
        adminPtc: ""
      },
      ptcAdminID: ""
    }
  },

  watch: {
    selectedTrain: function() {
      for(let i = 0; i < this.trainsArray.length; i++) {
        if(this.selectedTrain.trainNo === this.trainsArray[i].trainNo){
          this.addTrainInfo.trainNo = this.selectedTrain.trainNo
          this.addTrainInfo.trainNumber = this.selectedTrain.trainNumber
        }
      }
    }
  },

  methods: {
    // 获取全部PTC管理员的详细信息
    async getAllPtcAdminInfo () {
      this.loading = true
      await this.$http
          .get('/superAdmin/queryAllPtcAdmin')
          .then(response => {
            const { data:res } = response.data
            if (res.success) {
              this.tableData = res.ptcAdminList
              console.log(this.tableData);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      this.loading = false
    },

    // 打开修改经停站对话框并传递选中经停站信息
    editStation(info) {
      this.infoDialogVis = true;
      this.ptcAdminInfo = info;
    },

    // 打开添加经停站对话框
    addStation() {
      this.addDialogVis = true
    },
    
    // 删除经停站
    async deleteStation(info) {
      await this.$http
        .post('/admin/deleteParkStation?trainNumber=' + info.trainNumber + '&stationName=' + info.stationName )
        .then(response => {
          if (response.data.success) {
            this.$message({
              message: "删除成功!",
              type: "success",
              showClose: true,
              duration: 1500,
            });
          } else {
            this.$message({
              message: `删除失败!`,
              type: "error",
              showClose: true,
              duration: 1500,
            });
          }
          
        })
        .catch(function (error) {
          console.log(error)
        });
      // 这里利用filter()函数完成表格刷新，效果最好
      this.tableData = this.tableData.filter(o => {
        return (o.stationName != info.stationName || o.trainNumber != info.trainNumber)
      })
      
    },

    // 确认修改经停站信息
    async handleDialogConfirm() {
      await this.$http
        .post('/superAdmin/updatePtcAdmin', {
          id: this.ptcAdminInfo.adminID,
          telephone: this.ptcAdminInfo.telephone,
          adminName: this.ptcAdminInfo.adminName,
          adminPtc: this.ptcAdminInfo.adminPtc
        })
        .then(response =>  {
          const { data:res } = response.data
          if (res.success) {
            this.$message({
              message: "编辑成功!",
              type: "success",
              showClose: true,
              duration: 1500,
            });
            this.getAllPtcAdminInfo()
            this.infoDialogVis = false
          } else {
            this.$message({
              message: `编辑失败!`,
              type: "error",
              showClose: true,
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    },

    // 确认添加经停站
    async handleAddDialogConfirm() {
      await this.$http
        .post('/superAdmin/createPtcAdmin', this.addPtcAdminInfo)
        .then(response => {
          const { data:res } = response.data
            if (res.success) {
              this.$message({
              message: "添加成功!",
              type: "success",
              showClose: true,
              duration: 1500,
            });
            this.getAllPtcAdminInfo()
            this.addDialogVis = false
            } else {
            this.$message({
              message: `添加失败!`,
              type: "error",
              showClose: true,
              duration: 1500,
            });
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    },

    // 取消修改经停站，关闭对话框
    handleDialogCancel() {
      this.infoDialogVis = false
    },

    // 取消添加经停站，关闭对话框
    handleAddDialogCancel() {
      this.addDialogVis = false
    },

    // 查询对应车次下所有经停站
    onSubmit() {
      if (this.ptcAdminID !== "") {
        this.tableData = this.tableData.filter(o => {
        return this.ptcAdminID == o.adminID; 
      })
      } else {
        this.getAllPtcAdminInfo()
      }
    },

  },

  async created() {
    this.getAllPtcAdminInfo()
  }
}
</script>

<style scoped lang="less">
.trainManager_expand {
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 70%;
  }
}
  

.train-form {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
