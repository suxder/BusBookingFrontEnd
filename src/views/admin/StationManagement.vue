<template>
  <div>

    <el-form :inline="true" class="queryTrains">
      <el-form-item label="车次">
        <el-input v-model="trainId"></el-input>
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
    :default-sort = "{prop: 'trainNumber', order: 'ascending'}"
    style="width: 100%;fontSize: 14px;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="trainManager_expand">
            <el-form-item label="列车编号">
              <span>{{ props.row.trainNo }}</span>
            </el-form-item>
            <el-form-item label="车次">
              <span>{{ props.row.trainNumber }}</span>
            </el-form-item>
            <el-form-item label="站点编号">
              <span>{{ props.row.stationNo }}</span>
            </el-form-item>
            <el-form-item label="站点名称">
              <span>{{ props.row.stationName }}</span>
            </el-form-item>
            <el-form-item label="到达时间">
              <span>{{ props.row.arriveTime }}</span>
            </el-form-item>
            <el-form-item label="出发时间">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="历时">
              <span>{{ props.row.runningTime + " 分钟"}}</span>
            </el-form-item>
            <el-form-item label="已经过">
              <span>{{ props.row.startStationDistance + " 站"}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="车次"
        prop="trainNumber">
      </el-table-column>
      <el-table-column
        label="站点名称"
        prop="stationName">
      </el-table-column>
      <el-table-column
        label="到达时间"
        prop="arriveTime">
      </el-table-column>
      <el-table-column
        label="出发时间"
        prop="startTime">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editStation(JSON.parse(JSON.stringify(scope.row)))">编辑</el-button>
          <el-popconfirm
            title="确定删除此经停站吗？"
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

    <!-- 修改经停站信息 -->
    <el-dialog
      title="编辑经停站信息"
      :visible.sync="infoDialogVis"
      width="40%"
      center
    >
      <el-form
        :model="trainInfo"
        class="train-form"
        label-width="130px"
        label-position="left"
        size="medium"
        hide-required-asterisk
      >
        <el-form-item label="列车编号" prop="trainNo">
          <el-input
            v-model="trainInfo.trainNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="车次" prop="trainNumber">
          <el-input
            v-model="trainInfo.trainNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点编号" prop="stationNo">
          <el-input
            v-model="trainInfo.stationNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
         <el-form-item label="站点名称" prop="stationName">
          <el-input
            v-model="trainInfo.stationName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="到达时间" prop="arriveTime">
          <el-input
            v-model="trainInfo.arriveTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="出发时间" prop="startTime">
          <el-input
            v-model="trainInfo.startTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="历时(分)" prop="runningTime">
          <el-input
            v-model="trainInfo.runningTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="与首站相距(站)" prop="startStationDistance">
          <el-input
            v-model="trainInfo.startStationDistance"
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
      title="添加经停站"
      :visible.sync="addDialogVis"
      width="40%"
      center
    >
      <el-form
        :model="addTrainInfo"
        class="train-form"
        label-width="130px"
        label-position="left"
        size="medium"
        hide-required-asterisk
      >
        <el-form-item label="列车编号" prop="trainNo">
          <el-select v-model="selectedTrain" value-key="trainNo" placeholder="请选择">
            <el-option
              v-for="item in trainsArray"
              :key="item.trainNo"
              :label="item.trainNo"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车次" prop="trainNumber">
          <el-input
            v-model="addTrainInfo.trainNumber"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点编号" prop="stationNo">
          <el-input
            v-model="addTrainInfo.stationNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
         <el-form-item label="站点名称" prop="stationName">
          <el-input
            v-model="addTrainInfo.stationName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="到达时间" prop="arriveTime">
          <el-input
            v-model="addTrainInfo.arriveTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="出发时间" prop="startTime">
          <el-input
            v-model="addTrainInfo.startTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="历时(分)" prop="runningTime">
          <el-input
            v-model="addTrainInfo.runningTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="与首站相距(站)" prop="startStationDistance">
          <el-input
            v-model="addTrainInfo.startStationDistance"
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
      trainsArray: [],
      selectedTrain: {
        trainNo: '',
        trainNumber: ''
      },
      loading: true,
      tableData: [],
      infoDialogVis: false,
      addDialogVis: false,
      trainInfo: {},
      addTrainInfo: {
        arriveTime: "",
        runningTime: null,
        startStationDistance: null,
        startTime: "",
        stationName: "",
        stationNo: "",
        trainNo: "",
        trainNumber: ""
      },
      trainId: ""
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
    // 将一个车次的所有数据添加到tableData，不能使用forEach
    getOneTrain(train) {   
      this.$http
        .get('/admin/queryParkStationByTrainNumber', { params: { trainNumber: train.trainNumber } })
        .then(response => {
          if (response.data.success) {
            const { data } = response.data
            for(let i = 0; i < data.length; i++) {
              this.tableData.push(data[i])
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 获取全部车次的详细信息
    async getInfo () {
      // 获取全部车次
      var allTrains = []
      this.tableData.splice(0,this.tableData.length)
      this.trainsArray.splice(0,this.trainsArray.length)
      this.loading = true
      await this.$http
          .get('/train/queryAllTrainNoPage')
          .then(response => {
            if (response.data.success) {
              response.data.data.forEach(function(item) {
                let train = {
                  trainNo: '',
                  trainNumber: ''
                }
                train.trainNo = item.trainNo
                train.trainNumber = item.trainNumber
                allTrains.push(train)
              })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      // 循环将所有车次详细信息push到tableData
      for(let i = 0; i < allTrains.length; i++) {
        this.getOneTrain(allTrains[i])
        this.trainsArray.push(allTrains[i])
      }
      this.loading = false
    },

    // 打开修改经停站对话框并传递选中经停站信息
    editStation(info) {
      this.infoDialogVis = true;
      this.trainInfo = info;
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
        .post('/admin/updateParkStation', this.trainInfo)
        .then(response =>  {
          if (response.data.success) {
            this.$message({
              message: "编辑成功!",
              type: "success",
              showClose: true,
              duration: 1500,
            });
            this.getInfo()
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
        .post('/admin/saveParkStation', this.addTrainInfo)
        .then(response => {
          if (response.data.success) {
            this.$message({
              message: "添加成功!",
              type: "success",
              showClose: true,
              duration: 1500,
            });
            this.getInfo()
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
      this.tableData = this.tableData.filter(o => {
        return this.trainId === o.trainNumber
      })
    },

  },

  async created() {
    this.getInfo()
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
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

}
</style>
