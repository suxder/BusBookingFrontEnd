<template>
  <div>

    <el-form :inline="true" class="queryTrains">
      <el-form-item label="车次">
        <el-input v-model="trainId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-button style="float:right;" type="primary" icon="el-icon-plus" circle @click="addTrain"></el-button>
    </el-form>

    <!-- 添加车次 -->
    <el-dialog
      title="添加车次"
      :visible.sync="addDialogVis"
      width="40%"
      center
    >
      <el-form
        :model="addTrainInfo"
        class="train-form"
        label-width="120px"
        label-position="left"
        size="medium"
        hide-required-asterisk
      >
        <el-form-item label="列车编号" prop="trainNo">
          <el-input
            v-model="addTrainInfo.trainNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="车次" prop="trainNumber">
          <el-input
            v-model="addTrainInfo.trainNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="起始站" prop="trainStartStation">
          <el-input
            v-model="addTrainInfo.trainStartStation"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="出发时间" prop="trainStartTime">
          <el-input
            v-model="addTrainInfo.trainStartTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="终点站" prop="trainEndStation">
          <el-input
            v-model="addTrainInfo.trainEndStation"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="到达时间" prop="trainEndTime">
          <el-input
            v-model="addTrainInfo.trainEndTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="车厢总数" prop="trainCarriages">
          <el-input
            v-model="addTrainInfo.trainCarriages"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddDialogConfirm">添 加</el-button>
        <el-button @click="handleAddDialogCancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改车次信息 -->
    <el-dialog
      title="编辑车次信息"
      :visible.sync="infoDialogVis"
      width="40%"
      center
    >
      <el-form
        :model="trainInfo"
        class="train-form"
        label-width="120px"
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
        <el-form-item label="起始站" prop="trainStartStation">
          <el-input
            v-model="trainInfo.trainStartStation"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="出发时间" prop="trainStartTime">
          <el-input
            v-model="trainInfo.trainStartTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="终点站" prop="trainEndStation">
          <el-input
            v-model="trainInfo.trainEndStation"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="到达时间" prop="trainEndTime">
          <el-input
            v-model="trainInfo.trainEndTime"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="车厢总数" prop="trainCarriages">
          <el-input
            v-model="trainInfo.trainCarriages"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
        <el-button @click="handleDialogCancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-table
    height="410"
    border
    ref="multipleTable"
    @selection-change="handleSelectionChange"
    tooltip-effect="dark"
    v-loading="loading"
    :data="tableData"
    :default-sort = "{prop: 'trainNumber', order: 'ascending'}"
    style="width: 100%;fontSize: 14px;">
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <span style="display:block; marginBottom: 10px;">该车次所有经停站及到站/出站时间：</span>
          <el-steps :active="props.row.allStations.length">
            <el-step
            v-for="(station, index) in props.row.allStations"
            :key="index"
            :title="station.stationName" 
            :description="`${station.arriveTime} / ${station.startTime}`"></el-step>
          </el-steps>
        </template>
      </el-table-column>
      <el-table-column
        label="车次"
        prop="trainNumber">
      </el-table-column>
      <el-table-column
        label="列车编号"
        prop="trainNo">
      </el-table-column>
      <el-table-column
        label="起始站"
        prop="trainStartStation">
      </el-table-column>
      <el-table-column
        label="终点站"
        prop="trainEndStation">
      </el-table-column>
      <el-table-column
        label="出发时间"
        prop="trainStartTime">
      </el-table-column>
      <el-table-column
        label="到达时间"
        prop="trainEndTime">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editTrain(JSON.parse(JSON.stringify(scope.row)))">编辑</el-button>
          <el-popconfirm
            title="确定停用此车次吗？"
            icon="el-icon-warning"
            icon-color="red"
            @confirm="deleteTrain(scope.row)"
          >
            <el-button
            slot="reference"
            size="mini"
            type="danger"
            style="marginLeft: 10px;">停用</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px">
      <el-popconfirm
            title="确认停用选中车次？"
            icon="el-icon-warning"
            icon-color="red"
            @confirm="deleteTrains()"
          >
            <el-button
            slot="reference"
            size="medium"
            type="danger"
            style="marginLeft: 10px;">停用选中车次</el-button>
          </el-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      addDialogVis: false,
      infoDialogVis: false,
      loading: true,
      trainInfo: {
        stop: false,
        trainCarriages: null,
        trainEndStation: "",
        trainEndTime: "",
        trainNo: "",
        trainNumber: "",
        trainStartStation: "",
        trainStartTime: ""
      },
      addTrainInfo: {
        stop: false,
        trainCarriages: null,
        trainEndStation: "",
        trainEndTime: "",
        trainNo: "",
        trainNumber: "",
        trainStartStation: "",
        trainStartTime: ""
      },
      trainId: ""
    };
  },
  methods: {
    // 获取单个车次的相关信息，不要用forEach
    getOneTrain(trainNum) {   
      this.$http
        .get('/admin/queryParkStationByTrainNumber', { params: { trainNumber: trainNum } })
        .then(response => {
          if (response.data.success) {
            const { data } = response.data
            let stations = []
            for(let i = 0; i < data.length; i++) {
              stations.push(data[i])
            }
            for(let i = 0; i < this.tableData.length; i++) {
              if(this.tableData[i].trainNumber === trainNum){
                this.tableData[i]["allStations"] = stations
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 获取全部车次的详细信息，不要用forEach
    async getInfo () {
      // 获取全部车次
      var allTrains = []
      this.tableData.splice(0,this.tableData.length)
      await this.$http
          .get('/train/queryAllTrainNoPage')
          .then(response => {
            if (response.data.success) {
              const { data } = response.data
              for(let i = 0; i < data.length; i++) {
                var trainStations = {
                  trainNo: "",
                  trainNumber: "",
                  trainStartStation: "",
                  trainEndStation: "",
                  trainStartTime: "",
                  trainEndTime: "",
                  allStations: []
                }
                trainStations.trainNumber = data[i].trainNumber
                trainStations.trainNo = data[i].trainNo
                trainStations.trainStartStation = data[i].startStation
                trainStations.trainEndStation = data[i].endStation
                trainStations.trainStartTime = data[i].startTime
                trainStations.trainEndTime = data[i].endTime
                this.tableData.push(trainStations)
                allTrains.push(data[i].trainNumber)
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      // 循环将所有车次详细信息push到tableData
      for(let i = 0; i < allTrains.length; i++) {
        this.getOneTrain(allTrains[i])
      }
    },

    // 删除车次
    deleteTrain(info) {
      this.$http
        .get('/admin/deletedTrain',{ params: { trainNo: info.trainNo } })
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
        return o.trainNo != info.trainNo
      })
    },
    
    // 传递选中的车次信息到表单
    editTrain(info) {
      this.infoDialogVis = true;
      this.trainInfo = info
    },

    // 确认修改车次
    handleDialogConfirm() {
      this.$http
        .post('/admin/updateTrain', this.trainInfo)
        .then(response => {
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

    // 取消修改，关闭对话框
    handleDialogCancel() {
      this.infoDialogVis = false;
    },

    // 收集多选表格的选中项信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 打开添加车次对话框
    addTrain() {
      this.addDialogVis = true
    },

    // 确认添加车次
    handleAddDialogConfirm() {
      this.$http
        .post('/admin/saveTrain', this.addTrainInfo)
        .then(response => {
          console.log(response)
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
              message: `添加失败!${response.data.message}!`,
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

    // 取消添加车次，关闭对话框
    handleAddDialogCancel() {
      this.addDialogVis = false;
    },

    // 查询车次
    onSubmit() {
      for(let i = 0; i < this.tableData.length; i++) {
        if(this.tableData[i].trainNumber === this.trainId){
          let selectedTrain = this.tableData[i]
          this.tableData.splice(0,this.tableData.length)
          this.tableData.push(selectedTrain)
          break
        }
      }
    },

    // 批量删除车次
    deleteTrains() {
      // 收集所有需要删除车次的id并作为参数传入
      var deleteIds = ""
      var deleteIdsArray = [] 
      this.multipleSelection.forEach(function(item,index) {
        deleteIdsArray.push(item.trainNumber)
        if(index > 0)
          deleteIds += "&ids=" + item.trainNo
        else
          deleteIds += "ids=" + item.trainNo
      })

      this.$http
        .get('/admin/deletedByIds?' + deleteIds)
        .then(response => {
          if (response.data.success) {
            this.$message({
            message: "删除成功!",
            type: "success",
            showClose: true,
            duration: 1500,
          });
          }
        })
        .catch(function (error) {
          this.$message({
            message: `删除失败!${error}`,
            type: "error",
            showClose: true,
            duration: 1500,
          });
        });
      this.tableData = this.tableData.filter(o => {
        return !(deleteIdsArray.includes(o.trainNumber))
      })
    }

  },


  async created() {
      await this.getInfo()
      this.loading = false
  }
}
</script>

<style scoped lang="less">



</style>
