<template>
  <div class="not-found">
   <h1>找不到页面！</h1>
  </div>
</template>

<script>
export default {
 data () {
   return {}
 }
}
</script>

<style scoped lang="less">
.not-found {
    position: relative;
    height: 100%;
    h1{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
</style>