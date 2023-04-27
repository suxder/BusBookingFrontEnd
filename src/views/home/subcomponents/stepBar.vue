<template>
  <div class="stepBar">
    <!--    步骤条-->
    <el-steps :active="this.$store.state.active" finish-status="success" align-center>
      <el-step title="加入购物车"></el-step>
      <el-step title="生成订单"></el-step>
      <el-step title="支付完成"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: "stepBar",
  data() {
    return {
    }
  },
  created() {

  }
}
</script>

<style scoped>
.stepBar {
  font-size: 14px;
  height: 100px;
}
</style>
