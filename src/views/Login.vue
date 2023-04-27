<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="wrapper">
        <div class="header-con">
          <h1 class="logo"><a href="#">HUBU12305</a></h1>
          <div class="header-welcome">欢迎登录12305</div>
        </div>
      </div>
    </div>
    <!-- 登录 -->
    <div class="login">
      <div class="login-slide">
        <el-image
          style="height: 600px;width: 100%;"
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
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="loginInfo.userName" class="login-input"></el-input>
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
      <div class="footer-con wrapper">
        <div class="foot-links">
          <h2 class="foot-con-tit">友商链接</h2>
          <ul class="foot-links-list">
            <li>
              <a href="http://www.china-railway.com.cn/" title="中国国家铁路集团有限公司" aria-label="中国国家铁路集团有限公司">
                <img style="height: 34px; width: 200px; display: block; border: 1px solid #EFEFEF;" src="https://kyfw.12306.cn/otn/resources/images/link05.png" title="中国国家铁路集团有限公司" alt="中国国家铁路集团有限公司">
              </a>
            </li>
            <li>
              <a href="http://www.china-ric.com/" title="中国铁路财产保险自保有限公司" aria-label="中国铁路财产保险自保有限公司">
                <img style="height: 34px; width: 200px; display: block; border: 1px solid #EFEFEF;" src="https://kyfw.12306.cn/otn/resources/images/link02.png" title="中国铁路财产保险自保有限公司" alt="中国铁路财产保险自保有限公司">
              </a>
            </li>
            <li>
              <a href="http://www.95306.cn/" title="中国铁路95306网" aria-label="中国铁路95306网">
                <img style="height: 34px; width: 200px; display: block; border: 1px solid #EFEFEF;" src="https://kyfw.12306.cn/otn/resources/images/link03.png" title="中国铁路95306网" alt="中国铁路95306网">
              </a>
            </li>
            <li>
              <a href="http://www.cre.cn/" title="中铁快运股份有限公司" aria-label="中铁快运股份有限公司">
                <img style="height: 34px; width: 200px; display: block; border: 1px solid #EFEFEF;" src="https://kyfw.12306.cn/otn/resources/images/link04.png" title="中铁快运股份有限公司" alt="中铁快运股份有限公司">
              </a>
            </li>
          </ul>
        </div>
        <ul class="foot-code">
          <li style="width: 140px">
            <h2 class="foot-con-tit">中国铁路官方微信</h2>
            <div class="code-pic">
              <img src="https://kyfw.12306.cn/otn/resources/images/zgtlwb.png" alt="中国铁路官方微信" title="中国铁路官方微信">
            </div>
          </li>
          <li style="width: 140px">
            <h2 class="foot-con-tit">中国铁路官方微博</h2>
            <div class="code-pic">
              <img src="https://kyfw.12306.cn/otn/resources/images/zgtlwx.png" alt="中国铁路官方微博" title="中国铁路官方微博">
            </div>
          </li>
          <li style="width: 110px">
            <h2 class="foot-con-tit">12306 公众号</h2>
            <div class="code-pic">
              <img src="https://kyfw.12306.cn/otn/resources/images/public.png" alt="12306 公众号" title="12306 公众号">
            </div>
          </li>
          <li style="width: 110px">
            <h2 class="foot-con-tit">铁路12306</h2>
            <div class="code-pic">
              <img src="https://kyfw.12306.cn/otn/resources/images/download.png" alt="铁路12306" title="铁路12306">
              <div class="code-tips">
                官方APP下载，目前铁路未授权其他网站或APP开展类似服务内容，敬请广大用户注意。
              </div>
            </div>
          </li>
        </ul>
      </div>
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
      backgroundImgUrl: require('@/assets/image/train.jpeg'),
      text: "向右滑动",
      loading:false,
      VabVerifyVis:false,
      loginInfo: {
        pwd: "",
        userName: "",
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
        userName: [
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
            if (data.success) {
              this.$message({
                message: "登录成功",
                type: "success",
                showClose: true,
                duration: 1500,
              });
              const role = data.data.auth;
              const accountId = data.data.id;
              const username = data.data.userName;
              const pwd = data.data.pwd;
              const tel = data.data.tel;
              const gender = data.data.gender;
              const identityCard = data.data.identityCard;
              const token = data.data.token
              window.sessionStorage.setItem('token', token)
              this.setRole({ role, accountId, username, pwd, tel, gender, identityCard });
              if (role === "admin" || role === "finance" || role === "manager") {
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
.wrapper {
  width: 1200px;
  padding: 0 5px;
  margin-left: auto;
  margin-right: auto;
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
    margin: 15px 0 0 0;
    padding: 0;
    a {
      text-decoration:none;
    }
  }
  .header-welcome {
    float: left;
    height: 80px;
    line-height: 80px;
    padding-left: 40px;
    color: #000;
    font-size: 20px;
  }
}

.login {
  position: relative;
  height: 600px;
  margin-bottom: -40px;
  .loginSlide {
    width: 100%;
    height: 600px;
    position: relative;
    overflow: hidden;
  }
}

#login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: url("../assets/image/beijing.webp") no-repeat;
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
  margin-top: 40px;
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
