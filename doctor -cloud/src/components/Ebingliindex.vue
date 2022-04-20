<template>
  <div>

       <el-input class="inputwidth" placeholder="请输入姓名" v-model="name"></el-input>
      <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
      <!-- 下面是住院插槽 -->
       <slot name="phone"></slot>
       <slot name="num"></slot>
       <slot name="roomnum"></slot>
       <!-- 下面是报告 -->
        <slot name="xiangmu"></slot>
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
              <el-button size="mini" v-show="path=='ebingli'" type="success" @click.stop = "emitfun(i)">查看</el-button>
              <i class="el-icon-edit" v-show="path=='zhuyuan'"  @click.stop = "emitfun(i)"></i>
              <!-- 下面是住院 -->
              <i class="el-icon-delete delicon" v-show="path=='zhuyuan'" ></i>
              <!-- 下面是报告查询 -->
                 <el-button size="mini" v-show="path=='baogao'" type="success" @click.stop = "emitfun(i)">报告</el-button>
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
</template>

<script>
export default {
  name: "Ebingliindex",
  props:['phone','num','roomnum','xiangmu'],
  data() {
    return {
   
      allchoose: false,
      name: "",
      date: "",
      checked: false,
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
      ],
      path:""
    };
  },
  created(){
       let path=this.$route.path.replace('/index/',"");
        this.path=path;
  },
  methods: {
     search(){
       console.log(this.xiangmu)
     },
    emitfun(i){//电子病历
        console.log()
        this.$emit("lookbl",this.list[i])

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
.delicon{
  color: red;
}
</style>