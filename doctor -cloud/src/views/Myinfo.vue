<template>
  <div>
    <span class="defaulttit activetit">个人信息</span>

    <div class="conterdiv">
      <h5>
        病历夹
        <i class="el-icon-edit" @click="edit"></i>
      </h5>
      <el-container>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="8">
              <p>姓名</p>
              <el-form-item prop="name">
                <el-input :disabled="disable" v-model="ruleForm.name"></el-input>
              </el-form-item>

              <p>性别</p>
              <el-form-item prop="sex">
                <el-select :disabled="disable" v-model="ruleForm.sex" placeholder="请选择性别">
                  <el-option value="男"></el-option>
                  <el-option value="女"></el-option>
                </el-select>
              </el-form-item>

              <!-- <p> 年龄</p>
              <el-form-item prop="age">
                <el-input v-model.number="ruleForm.age"></el-input>
              </el-form-item>-->

              <p>出生日期</p>
              <el-form-item prop="date1">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.date1"
                  :disabled="disable"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>

              <p>联系电话</p>
              <el-form-item prop="phone">
                <el-input :disabled="disable" v-model.number="ruleForm.phone"></el-input>
              </el-form-item>

              <p>地址</p>

              <el-form-item prop="address">
                <el-input :disabled="disable" v-model.number="ruleForm.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <p>就职医院</p>
              <el-form-item prop="yiyuan">
                <el-input :disabled="disable" v-model="ruleForm.yiyuan"></el-input>
              </el-form-item>

              <p>医院级别</p>
              <el-form-item prop="level">
                <el-select :disabled="disable" v-model="ruleForm.level" placeholder="请选择级别">
                  <el-option value="1"></el-option>
                  <el-option value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-col :span="12">
                <p>省</p>
                <el-form-item prop="sheng">
                  <el-select :disabled="disable" v-model="ruleForm.sheng" placeholder="请选择省">
                    <el-option value="1"></el-option>
                    <el-option value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <p>市</p>
                <el-form-item prop="city">
                  <el-select :disabled="disable" v-model="ruleForm.city" placeholder="请选择市">
                    <el-option value="1"></el-option>
                    <el-option value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <p>科室</p>
              <el-form-item prop="keshi">
                <el-input :disabled="disable" v-model="ruleForm.keshi"></el-input>
              </el-form-item>

              <p>医院地址</p>
              <el-form-item prop="yiyuanaddress">
                <el-input :disabled="disable" v-model="ruleForm.yiyuanaddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <p>医生简介</p>
              <el-form-item prop="jianjie">
                <el-input :disabled="disable" type="textarea" v-model="ruleForm.jianjie"></el-input>
              </el-form-item>

              <p>工作经历</p>
              <el-form-item prop="express">
                <el-input :disabled="disable" type="textarea" v-model="ruleForm.express"></el-input>
              </el-form-item>

              <p>上传图片</p>
              <p>上传图片</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ebingliadd",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空手机号"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;

        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      ruleForm: {
        name: "",
        sex: "",
        age: "",
        date1: "",
        phone: "",
        address: "",
        keshi: "",
        desc: "",
        history: "",
        doctor: "",
        yongyao: "",
        beizhu: "",
        level: "",
        sheng: "",
        city: "",
        yiyuan: "",
        yiyuanaddress: "",
        jianjie: "",
        express: ""
      },
      rules: {
        jianjie: [
          { required: true, message: "请输入个人简介", trigger: "blur" }
        ],
        express: [
          { required: true, message: "请输入工作经历", trigger: "blur" }
        ],

        yiyuan: [{ required: true, message: "请输入医院", trigger: "blur" }],
        yiyuanaddress: [
          { required: true, message: "请输入医院地址", trigger: "blur" }
        ],
        sheng: [{ required: true, message: "请选择省", trigger: "blur" }],
        city: [{ required: true, message: "请选择市", trigger: "blur" }],
        level: [{ required: true, message: "请选择医院级别", trigger: "blur" }],
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],

        age: [
          { required: true, message: "年龄不能为空" },
          { type: "number", message: "年龄必须为数字值" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],

        phone: [{ validator: checkPhone, required: true, trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],

        keshi: [{ required: true, message: "请输入科室", trigger: "blur" }],
        desc: [{ required: true, message: "请输入病情描述", trigger: "blur" }],
        history: [{ required: true, message: "请输入过敏史", trigger: "blur" }],
        doctor: [
          { required: true, message: "请输入就诊医生", trigger: "blur" }
        ],
        yongyao: [{ required: true, message: "请输入用药", trigger: "blur" }],
        beizhu: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      disable: true
    };
  },
  created() {
    // this.open();
  },
  methods: {
    edit() {
      this.disable = !this.disable;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open() {
      this.$prompt("请输入手机号", "查询", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
        inputErrorMessage: "手机格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的手机是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>

<style lang="stylus">
h5 {
  border-bottom: 1px solid #f1f1f1;
  width: 100%;
  padding: 10px 0;
  display: block;
}

.el-input input {
  border-radius: 4px;
}



p {
  color: #999;
  line-height: 1.8;
}
</style>