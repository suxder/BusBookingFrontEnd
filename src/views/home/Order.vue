<template>
  <div >
<!--    订单主体部分开始-->
    <div class="orders-list">
      <el-card>
        <el-table :data="ordersList" border stripe v-loading="loading">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="id" label="订单编号"></el-table-column>
          <el-table-column prop="trainNumber" label="车次"></el-table-column>
          <el-table-column prop="startStationName" label="出发站"></el-table-column>
          <el-table-column prop="endStationName" label="目的站"></el-table-column>
          <el-table-column prop="carriageNo" label="座位类型"></el-table-column>
          <el-table-column prop="seatNo" label="座位号"></el-table-column>
          <el-table-column prop="orderMoney" label="价格"></el-table-column>
          <el-table-column prop="orderStatus" label="支付状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.orderStatus === '已支付'" effect="dark" type="success" size="medium">已支付</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="level" label="操作">
            <template slot-scope="scope">
              <el-button type="danger"  size="mini" @click="deleteOrderById(scope.row.id)">退票</el-button>
            </template>
          </el-table-column>
        </el-table>
<!--        放置分页-->
        <!--      放置分页-->
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="queryInfo.currentPage"
            :page-sizes="[5]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="ordersList.length">
        </el-pagination>
      </el-card>
    </div>
<!--    订单主体部分结束-->


  </div>
</template>

<script>
export default {
  data () {
    return {
      // 设置表格的加载状态
      loading: true,
      // 保存订单数据
      ordersList: null,
      // 保存分页信息
      queryInfo: {
        // 页数
        pageSize: 5,
        // 当前页
        currentPage: 1,
        // 自定义的记录数
        totalOrders: 20
      }
    }
  },
  methods: {
    async getOrdersList () {
      this.loading = true
      const { data:res } = await this.$http.get('/user/queryOrder',{
        params: this.queryInfo.currentPage
      })
      if (res.code !== 200) return this.$message.error(res.error)
      this.ordersList = res.data
      this.loading = false
    },
    async deleteOrderById (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('取消操作成功')
      // 用户确认操作，删除订单，退票
      const { data:res } = await this.$http.get('/order/refundTicket', {
        params: {
          orderId: id
        }
      })
      if (res.code !== 200) return this.$message.error(res.error)
      this.$message.success('退票成功')
      this.getOrdersList()
    },
    // 当前页改变的回调函数
    async handleCurrentChange (newNum) {
      this.queryInfo.currentPage = newNum
      await this.getOrdersList()
    }
  },
  created() {
    this.getOrdersList()
  }

}
</script>

<style scoped lang="less">
.orders-list {
  padding-top: 20px;
}
</style>
