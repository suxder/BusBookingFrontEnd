<template>
  <div id="home">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 头部左部 -->
        <div class="header-left">
          <div
            :class="[
              currRouteName === 'train_ticket'
                ? 'header-active'
                : 'header-inactive',
              'book-mall-logo',
            ]"
            @click="handleHeaderClick('train_ticket')"
          >
            车票
          </div>
          <div
            :class="[
              currRouteName === 'order' ? 'header-active' : 'header-inactive',
              'my-cart',
            ]"
            @click="handleHeaderClick('order')"
          >
            订单
          </div>
          <div
            :class="[
              currRouteName === 'user_info' ? 'header-active' : 'header-inactive',
              'my-order',
            ]"
            @click="handleHeaderClick('user_info')"
          >
            个人信息
          </div>
        </div>
        <!-- 头部右边 -->
        <div class="header-right">
          <div class="header-search-wrap">
            <el-autocomplete
              class="search-input"
              v-model="searchVal"
              size="small"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSearchSelect"
              :trigger-on-focus="false"
              suffix-icon="el-icon-search"
              value-key="bookName"
            ></el-autocomplete>
          </div>
          <el-dropdown class="user-info">
            <span class="el-dropdown-link">
              {{ operator }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="changePWD"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item @click.native="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <div
            class="to-admin-stage"
            v-if="operator === 'admin'"
            @click="goAdminStage"
          >
            <i class="el-icon-position"></i>
            <span>后台管理</span>
          </div>
        </div>
      </el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
    <!-- 修改密码登录框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="changePasswordDialogVis"
      width="25%"
      @closed="handleDialogClosed"
    >
      <el-form
        :model="changeInfo"
        label-width="80px"
        label-position="left"
        size="medium"
        :rules="changeInfoRules"
        ref="changeInfoForm"
        hide-required-asterisk
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            v-model="changeInfo.oldPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="changeInfo.newPassword"
            autocomplete="off"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPWD">
          <el-input
            v-model="changeInfo.confirmPWD"
            autocomplete="off"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogConfirm">确 定</el-button>
        <el-button @click="handleDialogCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const checkconfirmPWD = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.changeInfo.newPassword) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      searchVal: "",
      currRouteName: "",
      operator: "",
      changeInfo: {
        oldPassword: "",
        newPassword: "",
        confirmPWD: "",
      },
      changePasswordDialogVis: false,
      changeInfoRules: {
        oldPassword: [
          { required: true, message: "请输入新用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        confirmPWD: [{ validator: checkconfirmPWD, trigger: "change" }],
      },
    };
  },
  created() {
    this.operator = localStorage.role;
  },
  mounted() {
    this.currRouteName = this.$route.name;
  },
  methods: {
    // 头部点击
    handleHeaderClick(name) {
      this.$router.push({ name });
      this.currRouteName = name;
    },

    async logout() {
      try {
        const { data } = await this.$http.get("/user/logout");
        console.log(data)
        if (data.success) {
          console.log(data)
          window.sessionStorage.clear()
          this.$store.commit("REMOVE_ROLE");
          this.$router.replace({
            name: "login",
          });
        } else {
          this.$message({
            type: "error",
            message: "退出失败！",
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
    },

    goAdminStage() {
      const path = "/admin/station_management"
      this.$router.push({ path });
    },

    changePWD() {
      this.changePasswordDialogVis = true;
    },
    handleDialogCancel() {
      this.changePasswordDialogVis = false;
    },
    handleDialogConfirm() {
      this.$refs["changeInfoForm"].validate(async (valid) => {
        if (valid) {
          try {
            const { data } = await this.$http.post("/user/modifyPassword", {
              pwd: this.changeInfo.newPassword,
              userName: window.localStorage.getItem('username')
            });
            console.log(data);
            if (data.success) {
              this.$message({
                type: "success",
                message: data.message,
                duration: 1500,
              });
              this.changePasswordDialogVis = false;
            } else {
              this.$message({
                type: "error",
                message: data.message,
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
        } else return;
      });
    },

    handleDialogClosed() {
      this.$refs["changeInfoForm"].resetFields();
    },

    async querySearch(queryString, cb) {
      const { data } = await this.$http.get("/book/select", {
        params: {
          key: this.searchVal,
        },
      });
      const list = data.data;
      cb(list);
    },

    handleSearchSelect(item) {
      this.$router.push({
        name: "book_detail",
        params: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
#home {
  background-color: #f5f5f5;
}
.header-active {
  background-color: #2676e3;
}
.center() {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hover-style() {
  background-color: #3685EC;
  cursor: pointer;
}
.el-container {
  margin-left: 10%;
  margin-right: 10%;
  .el-header {
    background-color: #409EFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px !important;
    padding: 0;
    .header-left {
      display: flex;
      width: 30%;
      height: 100%;
      color: #FFFFFF;
      .book-mall-logo,
      .my-cart,
      .my-order {
        &:hover {
          .hover-style;
        }
        flex: 1;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 46px;
      }
    }
    .header-center {
      display: flex;
      width: 40%;
      justify-content: space-between;
      height: 100%;
      .el-steps {
        flex: 1;
        color: #67C23A;
      }
    }
    .header-right {
      display: flex;
      width: 30%;
      justify-content: space-between;
      font-size: 14px;
      height: 100%;
      color: #FFFFFF;
      .header-search-wrap {
        flex: 2;
        .center;
      }
      .user-info {
        flex: 1;
        .center;
        &:hover {
          .hover-style;
        }
        .el-dropdown-link {
          color: #FFFFFF;
          display: block;
          width: 100%;
          height: 100%;
          .center;
        }
      }
      .to-admin-stage {
        flex: 1;
        .center;
        font-size: 14px;
        &:hover {
          .hover-style;
        }
      }
    }
  }
  .el-main {
    padding: 0;
  }
}
</style>
