<template>
  <div>
    <span class="defaulttit activetit">出院管理</span>

    <div v-if="show" class="conterdiv">
      <el-input class="inputwidth" placeholder="请输入姓名" v-model="name"></el-input>
      <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
      <el-input class="inputwidth" placeholder="请输入病号" v-model="num"></el-input>
      <i class="el-icon-search" @click="search"></i>
      <div v-if="list.length>0">
        <table>
          <thead>
            <th>
              <el-checkbox @change="allchoosefun" v-model="allchoose"></el-checkbox>
            </th>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>就诊科室</th>
            <th>省</th>
            <th>市</th>
            <th>诊断类型</th>
            <th>就诊时间</th>
            <th>操作</th>
          </thead>

          <tbody>
            <tr v-for="(item,i) in list" :key="i" @change="choosefun">
              <td>
                <el-checkbox v-model="item.choose"></el-checkbox>
              </td>
              <td>{{item.name}}</td>
              <td>{{item.sex}}</td>
              <td>{{item.age}}</td>
              <td>{{item.keshi}}</td>
              <td>{{item.precent}}</td>

              <td>{{item.city}}</td>
              <td>{{item.type}}</td>
              <td>{{item.date}}</td>
              <td>
                <el-button @click.stop="emitfun(i)">查看</el-button>
                <!-- 下面是住院 -->
                <i class="el-icon-delete" @click="del(i)"></i>
              </td>
            </tr>
          </tbody>
        </table>

        <el-row>
          <el-col :span="12">
            <el-button type="danger" @click="alldel" icon="el-icon-delete">批量删除</el-button>
          </el-col>
          <el-col :span="12">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="50"
            ></el-pagination>
          </el-col>
        </el-row>
      </div>
      <div v-else>暂无数据</div>
    </div>
    <div v-if="!show" class="conterdiv">
          <print :lookdata="lookdata"></print>
    </div>
    
  </div>
</template>

<script>
import print from '../components/Chuyuanprint'

export default {
  name: "Chuyuan",
 components:{
     print
 },
  data() {
    return {
      show:true,
      allchoose: false,
      name: "",
      date: "",
      num: "",
      checked: false,
      lookdata:"",
      page: 1,
      list: [
        {
          choose: false,
          name: "小明",
          sex: "男",
          age: 18,
          keshi: "骨科",
          precent: "省",
          city: "郑州",
          type: "骨折",
          date: "2020-3-17"
        },
        {
          choose: false,
          name: "小明02",
          sex: "男",
          age: 19,
          keshi: "骨科",
          precent: "省",
          city: "郑州",
          type: "骨折",
          date: "2020-3-17"
        }
      ]
    };
  },
  methods: {
    search() {
      console.log("查找");
    },
    del(i){
      this.list.splice(i,1)
    },
    emitfun(i) {
      //查看
      console.log(i);
    //    this.list[i]
    this.show=!this.show
    this.lookdata=this.list[i];
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    choosefun() {
      var len = 0;
      this.list.forEach((item, i) => {
        if (this.list[i].choose) {
          len++;

          if (this.list.length == len) {
            this.allchoose = true;
          }
        } else {
          this.allchoose = false;
        }
      });
    },
    allchoosefun() {
      if (this.allchoose) {
        this.list.forEach((item, i) => {
          this.list[i].choose = true;
        });
      } else {
        this.list.forEach((item, i) => {
          this.list[i].choose = false;
        });
      }
    },
    alldel() {
      //批量删除
      var arr = [];

      this.list.forEach(item => {
        if (!item.choose) {
          arr.push(item);
        }
      });
      this.list = arr;
    }
  }
};
</script>

<style>
</style>