<template>
  <div class="loginBody">
    <div class="login">
      <img
        src="https://public-aibiyag.oss-cn-shanghai.aliyuncs.com/operator/sso/sso_login_bg.png"
        alt
        srcset
      />
      <p class="logoName">后台登录系统</p>
      <div class="logoForm">
        <el-form
          ref="loginForm"
          :model="loginForm"
          label-width="80px"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button type="primary" @click="submitClick('loginForm')"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      loginForm: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    submitClick(formName) {
      // 表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            username: this.loginForm.username,
            password: this.loginForm.password,
          };
          console.log('得到提交的data====', data);
          // 跳转到home页面
          if (data) {
            // 保存信息
            this.saveUserInfo(data);
            // 跳转页面
            this.$router.push('/home');
          }
        } else {
          console.log('error submit！');
          return false;
        }
      });
    },
    ...mapMutations('login', ['saveUserInfo']),
  },
};
</script>
<style lang="scss">
.loginBody {
  width: 100%;
  height: 100%;
  background: url('https://public-aibiyag.oss-cn-shanghai.aliyuncs.com/operator/sso/aibiyag_sso_login.png')
    center center no-repeat;
  overflow: hidden;
  .login {
    float: right;
    width: 35%;
    margin: 10% 3%;
    position: relative;
    img {
      width: 100%;
    }
    .logoName {
      width: 100%;
      position: absolute;
      top: 25%;
      text-align: center;
      font-size: 25px;
      font-weight: bold;
    }
    .logoForm {
      position: absolute;
      width: 85%;
      top: 50%;
      left: 5%;
    }
    .submit {
      position: absolute;
      width: 100%;
      bottom: 10%;
      text-align: center;
    }
  }
}
</style>
