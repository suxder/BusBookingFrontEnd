<template>
  <div class="loginVue">
    <!-- 头部 -->
    <div class="header">
      <div class="wrapper">
        <div class="header-con">
          <h1 class="logo"><a href="#">HUBU BusBooking</a></h1>
          <div class="header-welcome">欢迎登录HUBU BusBooking</div>
        </div>
      </div>
    </div>
    <!-- 登录 -->
    <div class="login">
      <div class="login-slide">
        <el-image
          style="height:100%;width: 100%;"
          :src="backgroundImgUrl"
          fit="cover">
        </el-image>
      </div>
      <div id="login-container" style="position: absolute; top: 50%; left: 50%; margin-left: 215px; margin-top: -380px;">
    <!-- 登录 -->
    <div class="login-form-wrap">
      <el-form
        label-position="left"
        label-width="80px"
        :model="loginInfo"
        size="medium"
        class="login-form"
        :rules="loginInfoRules"
        ref="loginInfoForm"
      >
        <el-form-item label="用户名" prop="tel">
          <el-input v-model="loginInfo.tel" class="login-input"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            v-model="loginInfo.pwd"
            type="password"
            show-password
            class="login-input"
          ></el-input>
        </el-form-item>
        <el-form-item class="item-btn">
          <el-popover
              placement="top"
              width="400"
              trigger="click"
              :value="VabVerifyVis"
          >
            <!--验证码-->
            <div>
              <vab-verify
                  ref="slideDiv"
                  :w="350"
                  :slider-text="text"
                  :h="175"
                  @success="handleSuccess"
                  @fail="handleError"
              ></vab-verify>
            </div>
            <el-button :loading="loading" type="primary" class="login-btn"  size="medium" slot="reference" @click.prevent="handleLogin">
              登录
            </el-button>

          </el-popover>
          <el-button type="success" @click="onRegistry" class="registry-btn" size="medium"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 注册 -->
    <el-dialog
      title="用户注册"
      :visible.sync="registerDialogVis"
      width="25%"
      @closed="handleDialogClosed"
    >
      <el-form
        :model="registerInfo"
        label-width="80px"
        label-position="left"
        size="medium"
        :rules="registerInfoRules"
        ref="registerInfoForm"
        hide-required-asterisk
      >
        <el-form-item label="用户昵称" prop="userName">
          <el-input
            v-model="registerInfo.userName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="registerInfo.gender" label="男">男</el-radio>
          <el-radio v-model="registerInfo.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            v-model="registerInfo.pwd"
            autocomplete="off"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="identityCard">
          <el-input
            v-model="registerInfo.identityCard"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号" prop="tel">
          <el-input
            v-model="registerInfo.tel"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
        <el-button @click="handleDialogCancel">取 消</el-button>
      </div>
    </el-dialog>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div class="footer-txt">
        <p>
          <span class="mr">版权所有©2021-2022</span>
          <span>HUBU CS 12305</span>
        </p>
        <p>
          <span class="mr">鄂YYDD备368号</span>
          <span class="mr">|</span>
          <span>鄂YYDD证368号</span>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { isIdentityId,isTel } from "@/views/validate";
import VabVerify from '../plugin/vabVerify'
export default {
  components: { VabVerify },
  data() {
    const checkIdentitytionId  = (rule, value, callback) => {
      let errorMsg = isIdentityId(value);
      if (errorMsg !== "") {
        callback(new Error(errorMsg));
      } else {
        callback();
      }

    };
    const checkMobile  = (rule, value, callback) => {
      let errorMsg = isTel(value);
      if (errorMsg !== "") {
        callback(new Error(errorMsg));
      } else {
        callback();
      }
    };
    return {
      backgroundImgUrl: require('@/assets/image/bus.jpg'),
      text: "向右滑动",
      loading:false,
      VabVerifyVis:false,
      loginInfo: {
        pwd: "",
        tel: "",
      },
      registerInfo: {
        userName: "",
        pwd: "",
        gender: "男",
        identityCard: "", // 默认为失信人员身份证
        tel: null
      },
      registerInfoRules: {
        userName: [
          { required: true, message: "请输入新用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        identityCard: [
          { validator: checkIdentitytionId , trigger: "change" }
        ],
        tel: [
          { validator: checkMobile , trigger: "change" }
        ],
      },
      loginInfoRules: {
        tel: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          }
        ],
        pwd:
        [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
      },
      registerDialogVis: false,
    };
  },
  methods: {
    ...mapMutations({
      setRole: "SET_ROLE",
    }),
    handleLogin () {
      this.$refs.loginInfoForm.validate( (valid => {
        if  (valid) {
          // this.VabVerifyVis = !this.VabVerifyVis
          console.log(valid)
        }
      }))
    },
    // 验证成功则登陆
    handleSuccess () {
      this.onLogin()
    },
    handleError () {
      this.$message.error('验证失败')
    },
    onLogin() {
      this.$refs["loginInfoForm"].validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await this.$http.post(
              "/user/login",
              this.loginInfo
            );
            const { data: res } = data;
            console.log(res);
            if (res.success) {
              this.$message({
                message: "登录成功",
                type: "success",
                showClose: true,
                duration: 1500,
              });

              let role = res.role;
              if (role === 0) {
                role = 'user'
              } else if (role === 1) {
                role = 'admin'
              } else {
                role = 'super_admin'
              }
              const accountID = res.id;
              const token = res.token
              window.sessionStorage.setItem('token', token)
              this.setRole({role, accountID})
              console.log('存储数据ing');
              if (role === "admin" || role === "super_admin") {
                await this.$router.replace({path: "/admin"});
              } else {
                await this.$router.replace({path: "/home"});
              }
            } else {
              this.$message({
                message: `登录失败！${data.message}`,
                type: "error",
                showClose: true,
                duration: 1500,
              });
              this.$refs.slideDiv.reset()
            }
          } catch (err) {
            this.$message({
              type: "error",
              message: err,
              duration: 1500,
            });
          }
        }
      });
    },

    onRegistry() {
      this.registerDialogVis = true;
    },
    handleDialogClosed() {
      this.$refs["registerInfoForm"].resetFields();
    },

    handleDialogConfirm() {
      this.$refs["registerInfoForm"].validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await this.$http.post("/user/register", this.registerInfo);
            console.log(data);
            if (data.success) {
              this.$message({
                type: "success",
                message: "注册成功",
                duration: 1500,
              });
              this.registerDialogVis = false;
            } else {
              this.$message({
                type: "error",
                message: "注册失败",
                duration: 1500,
              });
            }
          } catch (err) {
            this.$message({
              type: "error",
              message: err,
              duration: 1500,
            });
          }
        }
      });
    },

    handleDialogCancel() {
      this.registerDialogVis = false;
    },
  }
};
</script>


<style scoped lang="less">
.loginVue {
  height: 100%;
}
.header {
  height: 10%;
}
.wrapper {
  width: 1200px;
  padding: 0 0.31rem;
  margin: auto;
}

.header-con {
  &::before{
    content:"";
    display: table;
  }
  &::after{
    content:"";
    display: table;
    clear: both;
    overflow: hidden;
  }
  .logo {
    float: left;
    margin: 1rem 0 0 0;
    padding: 0;
    a {
      text-decoration:none;
    }
  }
  .header-welcome {
    float: left;
    line-height: 4em;
    padding-left: 40px;
    color: #000;
    font-size: 20px;
  }
}

.login {
  position: relative;
  height: 79.9%;
  .login-slide {
    height: 100%;
  }
  .loginSlide {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
}

#login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  .login-form-wrap {
    width: 400px;
    height: 230px;
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    font-weight: bold;
    .login-form {
      width: 80%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .item-btn {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
    .item-btn .el-button {
      margin-left: 10px;
    }
  }
}

.footer {
  box-sizing: border-box;
  background: #fff;
  &::before{
    content:"";
    display: table;
  }
  &::after{
    content:"";
    display: table;
    clear: both;
    overflow: hidden;
  }
  .footer-con {
    padding: 20px 0;
    &::before{
      content:"";
      display: table;
    }
    &::after{
      content:"";
      display: table;
      clear: both;
      overflow: hidden;
    }
    .foot-links {
      float: left;
      width: 420px;
      margin-left: 60px;
      margin-right: 20px;
      .foot-con-tit {
        height: 54px;
        line-height: 54px;
        font-size: 14px;
        color: #000;
      }
      .foot-links-list {
        box-sizing: border-box;
        height: 100px;
        &::before{
          content:"";
          display: table;
        }
        &::after{
          content:"";
          display: table;
          clear: both;
          overflow: hidden;
        }
        li {
          float: left;
          margin: 0 10px 10px 0;
          img {
            box-sizing: border-box;
          }
        }
      }
    }
    .foot-code {
      float: left;
      li {
        float: left;
        text-align: center;
        .foot-con-tit {
          color: #000;
          height: 54px;
          line-height: 54px;
          font-size: 14px;
        }
        .code-pic {
          width: 80px;
          height: 80px;
          background: #fff;
          margin: 0 auto;
          position: relative;
          img {
            box-sizing: border-box;
            display: block;
            width: 80px;
            height: 80px;
            border: 1px solid #EFEFEF;
          }
          .code-tips {
            box-sizing: border-box;
            position: absolute;
            top: 0px;
            left: 96px;
            width: 190px;
            height: 80px;
            border: 1px solid #EFEFEF;
            background-color: #fff;
            background-position: right bottom;
            background-repeat: no-repeat;
            line-height: 18px;
            padding: 12px 10px;
            font-size: 12px;
            color: #000;
            text-align: left;
            &::before{
              content: "";
              position: absolute;
              left: -6px;
              top: 34px;
              display: inline-block;
              width: 0;
              height: 0;
              line-height: 0;
              font-size: 0;
              overflow: hidden;
              border-width: 6px;
              cursor: pointer;
              border-style: dashed solid dashed dashed;
              border-color: transparent #EFEFEF transparent transparent;
              border-left: none;
            }
            &::after{
              content: "";
              position: absolute;
              left: -5px;
              top: 34px;
              display: inline-block;
              width: 0;
              height: 0;
              line-height: 0;
              font-size: 0;
              overflow: hidden;
              border-width: 6px;
              cursor: pointer;
              border-style: dashed solid dashed dashed;
              border-color: transparent #fff transparent transparent;
              border-left: none;
            }
          }
        }
      }
    }
  }
  .footer-txt {
    box-sizing: border-box;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    color: #000;
    background: #666;
    color: #c1c1c1;
    p {
      line-height: 30px;
      .mr {
        margin-right: 10px;
      }
    }
  }
}
</style>
