<template>
  <div class="show_cars">
    <el-card>
      <div class="userInfo">
        <h2>个人资料</h2>
        <el-divider></el-divider>
        <el-form :data="userInfo" label-position="left" label-width="100px">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="userInfo.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="密码" prop="pwd">
            <el-input type="password" v-model="userInfo.pwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="性别" prop="gender">
            <template>
              <el-radio v-model="userInfo.gender" label="男">男</el-radio>
              <el-radio v-model="userInfo.gender" label="女">女</el-radio>
              <el-radio v-model="userInfo.gender" label="外星人">外星人</el-radio>
            </template>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="身份证号" prop="identityCard">
            <el-input v-model="userInfo.identityCard"></el-input>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="电话号码" prop="tel">
            <el-input v-model="userInfo.tel"></el-input>
          </el-form-item>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="4" :offset="6">
              <el-button type="primary" @click="modifyUserInfo">保存修改</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
export default {
  data() {
    return {
      userInfo: {
        id: null,
        userName: null,
        pwd: null,
        gender: null,
        identityCard: null,
        tel: null
      }
    }
  },
  created() {
    this.initUserInfo()
  },
  methods: {
    ...mapMutations({
      setRole: "SET_ROLE",
    }),
    initUserInfo () {
      this.userInfo.id = window.localStorage.getItem('accountId')
      this.userInfo.userName = window.localStorage.getItem('username')
      this.userInfo.pwd = window.localStorage.getItem('pwd')
      this.userInfo.gender = window.localStorage.getItem('gender')
      this.userInfo.identityCard = window.localStorage.getItem('identityCard')
      this.userInfo.tel = window.localStorage.getItem('tel')
      console.log(this.userInfo)
    },
    // 修改用户信息
    async modifyUserInfo () {
      const  { data:res } = await this.$http.post('/user/modifyUser', this.userInfo)
      if (res.code !== 200) return this.$message.error(res.error)
      this.$message.success('信息修改成功')
      // 用户信息修改成功后，刷新本地Vuex存储及localStorage存储
      const role = window.localStorage.getItem('role')
      const id = this.userInfo.id
      const userName = this.userInfo.userName
      const pwd = this.userInfo.pwd
      const gender = this.userInfo.gender
      const identityCard = this.userInfo.identityCard
      const tel = this.userInfo.tel

      this.setRole({ role, id, userName, pwd, tel, gender, identityCard })
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="less">
.show_cars {
  padding-top: 20px;
  .userInfo {
    width: 400px;
    margin: 0 auto;
  }
}
</style>
