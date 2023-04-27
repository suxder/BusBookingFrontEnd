<template>
  <div class="no-permission">
   <h1>无权限访问</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
  .no-permission {
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