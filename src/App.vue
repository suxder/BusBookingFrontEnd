<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">

</style>

<script>
export default {
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("active") ) {
      this.$store.commit('changeActive', parseInt(sessionStorage.active))
      this.$store.commit('changeOrderNum', parseInt(sessionStorage.orderNum))
      this.$store.commit('changeCarNum', parseInt(sessionStorage.carsNum))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("active",this.$store.state.active.toString())
      sessionStorage.setItem("carsNum",this.$store.state.carsNum.toString())
    })
  }
}
</script>


