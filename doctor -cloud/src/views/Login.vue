<template>
  <div>
    <div class="bigmid">
      <span class="tit">医生管理后台</span>
      <img class="imgbg" src="../assets/img/login.png" alt />
      <div class="rightcon">
        <span class="doctortit">医生登录</span>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
         
          class="demo-ruleForm"
        >
          <el-form-item  prop="name">
            <el-input v-model="ruleForm.name"  prefix-icon="el-icon-user"></el-input>
          </el-form-item>

            <el-form-item  prop="password">
            <el-input v-model="ruleForm.password" show-password  prefix-icon="el-icon-lock"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="btn" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <router-link to="/index">登录</router-link> -->
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        name: "",
        password:""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
         
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) { // 请求后台的接口
          this.$router.push({path:"/index"}) //跳转首页
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus">
.el-input {
  width: 100%;
}

.btn {
  background: -webkit-gradient(linear, left top, right top, from(rgb(49, 192, 229)), to(rgb(22, 219, 184)));
  background: linear-gradient(to right, rgb(49, 192, 229), rgb(22, 219, 184));
  display: block;
  width: 100%;
  border-radius: 16px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  -webkit-box-shadow: rgb(49, 192, 229) 2px -1px 5px;
  box-shadow: rgb(49, 192, 229) 2px -1px 5px;
}

.bigmid {
  width: 770px;
  height: 441px;
  margin: 50px auto;
  position: relative;
}

.tit {
  color: #ffffff;
  position: absolute;
  top: 8px;
  left: 197px;
  z-index: 2;
}

.imgbg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.rightcon {
  position: absolute;
  right: 0;
  top: 68px;
  background: #f1f1f1;
  height: 230px;
  width: 256px;
  padding: 30px 30px 30px 212px;

  .doctortit {
    line-height: 4;
    color: rgb(49, 192, 229);
    padding-bottom: 5px;
    border-bottom: 2px solid rgb(49, 192, 229);
  }
}
</style>