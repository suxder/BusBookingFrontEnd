<template>
  <div class="file-container">
    <el-upload
      class="upload"
      action="http://bookmall.natapp1.cc/book/upload"
      :multiple="false"
    >
     <el-button size="small" type="primary">点击上传</el-button>
      <div class="el-upload__tip" slot="tip">
        只能上传xlsx文件/一次一个
      </div>
    </el-upload>
    <el-button @click="downLoadFile" size="small" type="primary" class="download-btn">
      下载文件
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    downLoadFile() {
      console.log("1");
      let a = document.createElement("a")
      a.download = "book"
      a.style.display = 'none'
      a.href = 'http://bookmall.natapp1.cc/book/download'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
  }
};
</script>

<style scoped lang="less">
.file-container{
  display: flex;
  .download-btn{
    align-self: flex-start;
  }
}
</style>
