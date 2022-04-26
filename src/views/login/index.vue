<template>
  <div class="loginbox">
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="148"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    ></vue-particles>

    <div class="login-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="inner">
          <div class="title-container">
            <h2 class="title">锄头NFT管理系统</h2>
            <p>Hoe NFT Management System</p>
          </div>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              v-model="loginForm.username"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
              placeholder="用户账户"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="loginForm.password"
              :type="passwordType"
              name="password"
              auto-complete="on"
              tabindex="2"
              show-password
              placeholder="登录密码"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>

          <el-form-item prop="code">
            <span class="svg-container">
              <svg-icon icon-class="lock" />
            </span>
            <el-input
              v-model="loginForm.code"
              auto-complete="off"
              name="code"
              tabindex="2"
              placeholder="验证码"
              class="width-60"
              @keyup.enter.native="handleLogin"
            />
            <div class="login-code">
              <img :src="codeImg" @click="getCode" />
            </div>
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            class="login-btn"
            @click.native.prevent="handleLogin"
            >立即登录</el-button
          >
          <div class="title-bottom">锄头分布式存储实验室</div>
          <div class="title-bottom">
            Copyright2020-2021 CT.All Rights Reserved.
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.$t("form.limitAdministrator")));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: this.$t("form.emptyAdministrator"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("form.emptyPassword"),
            trigger: "blur",
          },
          { validator: validatePassword, trigger: "blur" },
        ],
      },
      passwordType: "password",
      loading: false,
      redirect: "",
      codeImg: "",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const { redirect, ...otherQuery } = route.query;
        this.redirect = redirect;
        this.otherQuery = otherQuery;
      },
      immediate: true,
    },
  },
  created() {
    this.getCode();
  },
  destroyed() {},
  methods: {
    changeNetwork(e) {
      this.$store.commit("SET_NETWORK", e);
      this.getCode();
    },
    getCode() {
      this.$api("getKaptcha.kaptcha").then((response) => {
        this.codeImg = response.data;
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid && !this.loading) {
          this.loading = true;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then((res) => {
              this.loading = false;
              if (this.$tool.checkResponse(res)) {
                this.$router.push({
                  path: this.redirect || "/dashboard",
                  query: this.otherQuery,
                });
              } else {
                this.getCode();
              }
            })
            .catch((response) => {
              this.getCode();
              this.$notify.error({
                title: this.$t("notify.title"),
                message: this.$t("response." + response.errno),
              });
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 40px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 40px;
      caret-color: #333;
      color: #333;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #333 !important;
      }
    }
  }

  .el-form-item {
    // border-bottom: 1px solid #f0f0f0;
    color: #454545;
    margin-bottom: 30px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  .login-form {
    // box-shadow: 3px 3px 3px 3px rgb(0 0 0 / 30%);
    // background: rgba(255, 255, 255, 0.3);
    // background: #11928d;
    // position: relative;
    width: 470px;
    // max-width: 100%;
    // padding: 10px;
    // margin: 120px auto;
    // overflow: hidden;
    // border-radius: 20px;
    background: rgba(17, 146, 141, 0.39);
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.16);
    .inner {
      padding: 30px 35px;
      // background: #fff;
      background: #11928d;
      border-radius: 20px;
    }
    P {
      margin: 0px auto 20px auto;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }
    .title-bottom {
      margin: 0px auto 20px auto;
      text-align: center;
      color: #dadada;
    }
  }
  .login-code {
    // padding-top: 5px;
    height: 40px;
    float: right;
    img {
      height: 100%;
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0px 5px 0px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 36px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .copyright {
    font-size: 12px;
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-bottom: 20px;
    letter-spacing: 0.6px;
    a {
      font-weight: bold;
      border-bottom: 1px solid #fff;
      font-family: "PingFangSC-Semibold", sans-serif;
    }
  }
}

.login-btn {
  width: 100%;
  margin-bottom: 20px;
  height: 40px;
}
.width-60 {
  width: 60%;
}
.loginbox {
  position: relative;
  width: 100%;
  background-color: #11928d;
}
.lizi {
  height: 100vh;
}
::v-deep .el-form-item__content {
  background: #27a7a2 !important;
  border-radius: 4px;
}
.svg-icon {
  font-size: 16px;
  color: #fff;
}
</style>

