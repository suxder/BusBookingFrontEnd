<template>
  <div>
    <el-container >
      <!--    中心部分开始-->
      <el-main >
        <div class="sear-box">
          <el-card class="box-card">
            <el-row type="flex" class="row-bg" justify="space-around">
              <el-col :span="6">
                  <el-select v-model="stationInfo.startStation" filterable placeholder="出发地">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="stationInfo.endStation" filterable placeholder="目的地">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6" >
                <div class="btn-contain">
                  <el-button type="success" @click="handleQueryTrains">
                    车次查询
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>

        <div class="list-box">
          <el-card class="box-card2">
                <el-table :data="trainNumbers" border stripe v-loading="loading">
                  <el-table-column type="expand" >
                    <template slot-scope="props">
                      <span style="display:block; marginBottom: 10px;">该车次所有经停站及到达/出发时间：</span>
                      <el-steps :active="props.row.parkStationList.length">
                        <el-step
                            v-for="(station, index) in props.row.parkStationList"
                            :key="index"
                            :title="station.stationName"
                            :description="`${station.arriveTime} / ${station.startTime}`"></el-step>
                      </el-steps>
                    </template>
                  </el-table-column>
                  <el-table-column prop="trainNumber" label="车次">
                  </el-table-column>
                  <el-table-column prop="startStation" label="出发地"></el-table-column>
                  <el-table-column prop="endStation" label="目的地"></el-table-column>
                  <el-table-column prop="arriveTime" label="到站时间"></el-table-column>
                  <el-table-column prop="startTime" label="发车时间"></el-table-column>
                  <el-table-column prop="runningTime" label="历时"></el-table-column>
                  <el-table-column prop="firstSeat" label="一等座"></el-table-column>
                  <el-table-column prop="secondSeat" label="二等座"></el-table-column>
                  <el-table-column prop="softSleeper" label="软卧"></el-table-column>
                  <el-table-column prop="hardSleeper" label="硬卧"></el-table-column>
                  <el-table-column prop="level" label="操作">
                    <template slot-scope="scope">
                      <el-button size="medium" type="primary" :disabled="scope.row.distance===undefined?true:false" @click="handleBookTicket(scope.row.trainNumber, scope.row.distance, scope.row.startStation, scope.row.endStation)">
                        预订
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
        </div>

<!--        放置选择订票的dialog-->
        <el-dialog
            title="提示"
            :visible.sync="bookDialogVisible"
            width="30%"
            @close="editUserDialogClosed"
        >
          <el-form :model="bookTicketInfo" label-width="70px">
            <el-form-item label="车次" prop="trainNumber">
              <el-input v-model="bookTicketInfo.trainNumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="始发站" prop="startStation">
              <el-input v-model="bookTicketInfo.startStation" disabled></el-input>
            </el-form-item>
            <el-form-item label="终点站" prop="endStation">
              <el-input v-model="bookTicketInfo.endStation" disabled></el-input>
            </el-form-item>

            <el-form-item label="座位类型">
              <el-select v-model="bookTicketInfo.price" filterable placeholder="选座" @change="changeSeatType">
                <el-option
                    v-for="item in seatInfo"
                    :key="item.price"
                    :label="item.title"
                    :value="item.price">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input v-model="bookTicketInfo.price" disabled></el-input>
            </el-form-item>

          </el-form>
          <span slot="footer" class="dialog-footer">
        <el-button @click="bookDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bookTicket">确认支付</el-button>
      </span>
        </el-dialog>
      </el-main>
<!--      中心部分结束-->
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 设置表格加载状态
      loading: true,
      // 存储dialog是否可见
      bookDialogVisible: false,
      // 存储返回的可订座的信息
      seatInfo: null,
      // 存储支付前需要的订票信息
      bookTicketInfo: {
        startStation: "",
        endStation: "",
        trainNumber: "",
        seatType: "",
        price: null
      },
      // 存储车次的总页数
      totalTrainNums: 0,
      // 存储根据始发站与终点站查询车次的信息
      stationInfo: {
        startStation: "",
        endStation: ""
      },
      // 存储车次信息列表
      trainNumbers: [],
      // 存储始发站与终点站的options
      options: [
        {
          value: '武昌',
          label: '武昌'
        }, {
          value: '武汉',
          label: '武汉'
        }, {
          value: '汉口',
          label: '汉口'
        }, {
          value: '汉川',
          label: '汉川'
        }, {
          value: '天门',
          label: '天门'
        }, {
          value: '仙桃',
          label: '仙桃'
        }, {
          value: '潜江',
          label: '潜江'
        }, {
          value: '荆州',
          label: '荆州'
        }, {
          value: '枝江',
          label: '枝江'
        }, {
          value: '荆门',
          label: '荆门'
        }, {
          value: '当阳',
          label: '当阳'
        }, {
          value: '宜昌',
          label: '宜昌'
        }
      ]
    }
  },
  methods: {
    // 直接获取所有车次信息
    async getAllTrainNums () {
      const { data:res } = await this.$http.get('/train/queryAllTrainNoPage')
      if (res.code !== 200) return this.$message.error(res.message)
      this.trainNumbers = res.data
      this.loading = false
    },
    // 根据始发站与终点站查询车次
    async handleQueryTrains () {
      this.loading = true
      const { data:res } = await this.$http.get('/train/queryByStation?startStation=' + this.stationInfo.startStation +'&endStation=' + this.stationInfo.endStation)
      if (res.code !== 200) return this.$message.error(res.message)
      this.trainNumbers = res.data
      this.loading = false
    },
    // 预定车票
    async handleBookTicket (trainNumber, distance, startStation, endStation) {
      const { data:res } = await this.$http.get('/order/reserveTicket?trainNumber=' + trainNumber + '&distance=' + distance)
      if (res.code !== 200) return this.$message.error(res.message)
      // 显示订票具体信息的dialog
      this.bookDialogVisible = !this.bookDialogVisible
      this.seatInfo = res.data
      this.bookTicketInfo.startStation = startStation
      this.bookTicketInfo.endStation = endStation
      this.bookTicketInfo.trainNumber = trainNumber
    },
    // 支付
    async bookTicket () {
      if (this.bookTicketInfo.price === null) return this.$message.warning('请选择座位类型')
      const { data:res } = await this.$http.get('/order/buyTicket',
          {
            params: this.bookTicketInfo
          }
      )
      if  (res.code !== 200) return this.$message.error(res.error)
      this.$message.success("支付成功！")
      // 预订成功后，刷新剩余座位数
      await this.handleQueryTrains()
      this.bookDialogVisible = false
    },
    handleSizeChange () {
    },
    handleCurrentChange () {
    },
    // 订票dialog关闭的回调函数
    editUserDialogClosed () {

    },
    // 顾客选择对应座位后，将座位名称赋予查询对象
    changeSeatType (price) {
      this.bookTicketInfo.seatType = this.seatInfo.find( (item) => {
         return item.price === price
      }).title
    }

  },
  filters: {
    timeFormat(timeStr) {
      const time = new Date(timeStr)
      const y = time.getFullYear()
      const m = time.getMonth()
      const d = time.getDay()
      return `${y}-${m}-${d}`
    }
  },
  created() {
    this.getAllTrainNums()
  }
}
</script>

<style scoped lang="less">
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
//main部分开始
.el-main {
  text-align: left;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 0;
  .box-card {
    background-color: #eef1f8;
  }
  .sear-box {
    padding-top: 20px;
    .btn-contain {
      display: flex;
      justify-content: center;
    }
  }
  .list-box {
    padding-top: 20px;
    .box-card2 {
      margin-bottom: 100px;
    }
  }
}
// 控制dialog的样式
.el-dialog {
  .el-input {
    width: 190px;
  }
}
//main部分结束
</style>
