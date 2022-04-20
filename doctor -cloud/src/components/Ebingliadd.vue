<template>
  <div>
    <h5>病历夹 <i class="el-icon-edit" v-show="this.lookdata" @click="edit"></i></h5>
    <el-container>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <p>姓名</p>
            <el-form-item prop="name">
              <el-input :disabled="disable" v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-col :span="12">
              <p>性别</p>
              <el-form-item prop="sex">
                <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                  <el-option value="男"></el-option>
                  <el-option value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
             <p> 年龄</p>
              <el-form-item prop="age">
                <el-input v-model.number="ruleForm.age"></el-input>
              </el-form-item>
            </el-col>
            <p>就诊日期</p>
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>

            <p>联系电话</p>
            <el-form-item prop="phone">
              <el-input v-model.number="ruleForm.phone"></el-input>
            </el-form-item>

            <p>地址</p>

            <el-form-item prop="address">
              <el-input v-model.number="ruleForm.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <p>就诊科室</p>
            <el-form-item prop="keshi">
              <el-input v-model="ruleForm.keshi"></el-input>
            </el-form-item>

            <p>病情描述</p>
            <el-form-item prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>

            <p>过敏史</p>
            <el-form-item prop="history">
              <el-input v-model="ruleForm.history"></el-input>
            </el-form-item>
            <p>诊断医生</p>
            <el-form-item prop="doctor">
              <el-input v-model="ruleForm.doctor"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
              <p>用药详情</p>
            <el-form-item prop="yongyao">
              <el-input type="textarea" v-model="ruleForm.yongyao"></el-input>
            </el-form-item>

              <p>备注</p>
            <el-form-item prop="beizhu">
              <el-input type="textarea" v-model="ruleForm.beizhu"></el-input>
            </el-form-item>

              <p>上传图片</p>
              <p>上传图片</p>
              {{lookdata}}
             
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
</template>

<script>
export default {
  name: "Ebingliadd",
  props:['lookdata'],
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
        age:'',
        date1: "",
        phone: "",
        address: "",
        keshi: "",
        desc: "",
        history: "",
        doctor: "",
        yongyao:"",
        beizhu:""
      },
      rules: {
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
        doctor: [{ required: true, message: "请输入就诊医生", trigger: "blur" }],
         yongyao: [{ required: true, message: "请输入用药", trigger: "blur" }],
         beizhu: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      disable:true
    };
  },
  created(){
    // this.open();

     if(this.lookdata){
       this.disable=true,
       this.ruleForm.name=this.lookdata.name
     }else{
         this.disable=false
     }
  },
  methods: {
    edit(){
      this.disable=!this.disable
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
        this.$prompt('请输入手机号', '查询', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
          inputErrorMessage: '手机格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的手机是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
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
.el-input input
  border-radius 4px
.el-form-item__content
  text-align center
p
 color #999
 line-height 1.8
</style>