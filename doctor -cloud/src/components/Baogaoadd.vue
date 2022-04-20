<template>
  <div>
     <div v-if="lookdata">
        <el-button type="primary" @click="show"  class="el-icon-edit"  circle></el-button>
     </div>
    <el-container>
      <el-row>
          <el-col :span="24">
           
          </el-col>
      </el-row>
      <el-form  :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm">
        <el-row class="inputgroup">
          <el-col :span="8">
              <el-form-item  prop="name" label="姓名">
               <el-input  :disabled="disabled" v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="sex" label="性别">
                <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                  <el-option value="男"></el-option>
                  <el-option value="女"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄" prop="age">
              <el-input   v-model.number="ruleForm.age"></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="8">
            <el-form-item prop="keshi" label="科室">
                <el-select v-model="ruleForm.keshi" placeholder="keshi">
                  <el-option value="keshi"></el-option>
                  <el-option value="keshi"></el-option>
                </el-select>
              </el-form-item>
          </el-col>

           <el-col :span="8">
            <el-form-item prop="fuzhen" label="复诊">
                <el-select v-model="ruleForm.fuzhen" placeholder="fuzhen">
                  <el-option value="fuzhen01"></el-option>
                  <el-option value="fuzhen02"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
         

            <el-col :span="24">
                     <el-form-item class="textare" prop="linchuang"  label="临床诊断">
              <el-input type="textarea" :cols="8" v-model="ruleForm.linchuang"></el-input>
              </el-form-item>
           </el-col>
            <el-col :span="24">
                     <el-form-item class="textare" prop="dati"  label="大体检查">
              <el-input type="textarea" :cols="8" v-model="ruleForm.dati"></el-input>
            </el-form-item>
           </el-col>
            <el-col :span="24">
                     <el-form-item class="textare" prop="bingli"  label="病理诊断">
              <el-input type="textarea" :cols="8" v-model="ruleForm.bingli"></el-input>
            </el-form-item>
           </el-col>
            <el-col :span="24">
                     <el-form-item class="textare" prop="mianyi"  label="免疫/组化">
              <el-input type="textarea" :cols="8" v-model="ruleForm.mianyi"></el-input>
            </el-form-item>
             </el-col>
             <el-col :span="24">
                     <el-form-item class="textare" prop="jieguo"  label="结果">
              <el-input type="textarea" :cols="8" v-model="ruleForm.jieguo"></el-input>
            </el-form-item>
             </el-col>
             <el-col :span="24">
                     <el-form-item class="textare" prop="beizhu"  label="beizhu">
                 <el-input type="textarea" :cols="8" v-model="ruleForm.beizhu"></el-input>
            
                </el-form-item>
             </el-col>
            
        </el-row>
        <el-row v-if="!disabled">
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
  name: "Baogaoadd",
  props:['lookdata'],
  created(){
    if(this.lookdata){
       this.ruleForm.name=this.lookdata.name ;

       this.disabled=!this.disabled

    }
  }
  ,
  data() {
    return {
      disabled:false,
      ruleForm: {
        name: "",
        age:"",
        sex:"",
        keshi:"",
        fuzhen:"",
        linchuang:"",
        dati:"",
        bingli:"",
        mianyi:"",
        jieguo:"",
        beizhu:""
      },
      rules: {
           linchuang: [{ required: true, message: "不能为空", trigger: "blur" }],
            dati: [{ required: true, message: "不能为空", trigger: "blur" }],
             bingli: [{ required: true, message: "不能为空", trigger: "blur" }],
              mianyi: [{ required: true, message: "不能为空", trigger: "blur" }],

           jieguo: [{ required: true, message: "请输入名字", trigger: "blur" }],
             beizhu: [{ required: true, message: "请输入名字", trigger: "blur" }],

           
         name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],

        age: [
          { required: true, message: "年龄不能为空" },
          { type: "number", message: "年龄必须为数字值" }
        ],
         keshi: [{ required: true, message: "请输入科室", trigger: "blur" }],
          fuzhen: [{ required: true, message: "请输入复诊", trigger: "blur" }],
      }
    };
  },
  methods:{
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
    show(){
      this.disabled=!this.disabled
    }
  }
};
</script>

<style lang="stylus">

.textare
  width 100%
  .el-form-item__content
    width 80%
.el-icon-edit
  color #ffffff !important
  background $color
  border 0
</style>