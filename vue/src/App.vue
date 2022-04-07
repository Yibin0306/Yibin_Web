<template>
  <div id="app">
    <div style="text-align:center">
    <!-- 获取学生按钮 -->
    <el-button plain type="primary" @click="getData">
      获取数据
    </el-button>
    <!-- 新增学生按钮 -->
    <el-button plain type="primary" @click="handleAddStudent('add')">
      添加学生
    </el-button>
    </div>
    <!-- 新增学生对话框Dialog -->
    <!-- 绑定事件，可调用多种方法 -->
    <el-dialog
    :visible.sync="addStudent"
    title="添加学生"
    @close="getData">
    <!-- 添加学生表单 -->
      <el-form>
        <el-form-item label="学生ID">
          <el-input v-model="addStudentFrom.username"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="密码">
          <el-input v-model="addStudentFrom.password"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="姓名">
          <el-input v-model="addStudentFrom.name"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="班级">
          <el-input v-model="addStudentFrom.classname"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="宿舍">
          <el-input v-model="addStudentFrom.dorm"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="手机号">
          <el-input v-model="addStudentFrom.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="地址">
          <el-input v-model="addStudentFrom.address"></el-input>
        </el-form-item>
      </el-form>
      <div align="right">
        <!-- 绑定取消和添加按钮 -->
        <el-button type="danger" @click="handleAddStudent('canle')">取消</el-button>
        <el-button type="primary" @click="handleSaveStudent">添加</el-button>
      </div>
    </el-dialog>
    <!-- 创建一个表格装学生数据 -->
    <!-- list对应js中data -->
    <el-table :data="list">
      <!-- prop获取数据对应的名字 -->
      <el-table-column prop="username" label="学生ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="classname" label="班级"></el-table-column>
      <el-table-column prop="dorm" label="宿舍"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作">
      <template>
        <el-button size="mini" type="primary" >编辑</el-button>
        <el-button size="mini" type="danger" >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入Element
import axios from "axios"

export default { 
  //对应页面中id
  name: 'App',
  //请求数据类型
  data(){
    return{
      list:[],
      addStudent: false,
      addStudentFrom:{
        username:"",
        password:"",
        name:"",
        phone:"",
        dorm:"",
        address:"",
        classname:""
      }
    }
  },
  methods:{
    //查询学生方法
    getData(){
      //请求链接
      axios.get("/user/StudentList?page=1&pagesize=10")
      //判断数据
      .then((res) => {
        //多个数据只拿有用的数据
        var result = res.data
        //请求成功进行的操作
        this.list = result.list
        console.log(res)
      })
      .catch((e)=>{
        //请求异常执行的操作
      })
    },
    //取消操作
    handleAddStudent(type){
      if(type == "canle"){
        this.addStudent = false
        return ;
      }
      this.addStudent=true;
    },
    //操作操作，添加学生方法
    handleSaveStudent(){
      // Paylod -> FormData
      // new 出 FormData 然后将值传在这里 
      var formData = new FormData();
      formData.append("username",this.addStudentFrom.username);
      formData.append("password",this.addStudentFrom.password);
      formData.append("name",this.addStudentFrom.name);
      formData.append("phone",this.addStudentFrom.phone);
      formData.append("dorm",this.addStudentFrom.dorm);
      formData.append("address",this.addStudentFrom.address);
      formData.append("classname",this.addStudentFrom.classname);
      axios.post("/user/addStudent",formData)
      .then((res) => {
        // 添加学生成功后关闭弹窗
        this.addStudent = false;
        //多个数据只拿有用的数据
        var result = res.data;
        //请求成功进行的操作
        if(result.code == 101){
          alert("新增学生失败")
          return;
        }
        alert("新增学生成功")
      })
      .catch((e)=>{
        //请求异常执行的操作
      })
    }
  }
}
</script>