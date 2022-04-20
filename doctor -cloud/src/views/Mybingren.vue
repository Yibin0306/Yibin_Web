<template>
  <div>
    <div>
      <p>
        <span class="defaulttit activetit">我的病人</span>
      </p>

      <div class="conterdiv">
        <!-- 搜索框 -->
        <el-input class="inputwidth" placeholder="请输入姓名" v-model="search">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <!-- list for  病人列表 -->
        <div v-if="searchfun.length>0">
          <el-row class="rowcon">
            <el-col class="colevery" :span="6" v-for="(item,i) in searchfun" :key="i">
              <i
                v-if="show"
                :class="['el-icon-circle-check',item.choose?'red':'']"
                @click="yeschoose(i)"
              ></i>
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                      <img :src="item.headimg" alt />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content bg-purple-light righttext">
                      <p>
                        <span>姓名：{{item.name}}</span>
                      </p>
                      <p>
                        <span>性别：{{item.sex}}</span>
                      </p>
                      <p>
                        <span>年龄：{{item.age}}</span>
                      </p>
                      <p>
                        <span>序号：{{item.num}}</span>
                      </p>
                      <p>
                        <i class="el-icon-view"></i>
                        <i class="el-icon-edit"></i>
                        <i class="el-icon-delete" @click="del(i)"></i>
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>

          <!-- 分页 -->
          <el-row>
            <el-col :span="12">
              <el-button
                class="choosebtn"
                @click="choosefun"
                type="primary"
                icon="el-icon-check"
              >批量选择</el-button>
              <el-button class="delbtn" type="danger" @click="alldel" icon="el-icon-delete">批量删除</el-button>
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
        <div v-else class="notext">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mybingren",
  data() {
    return {
      page: 1,
      show: false,
      search: "",
      listp: [
        {
          id: "1",
          headimg: require("../assets/img/patient_pic.png"),
          name: "张三",
          age: 40,
          sex: "男",
          num: "1",
          choose: false
        },

        {
          id: "1",
          headimg: require("../assets/img/patient_pic.png"),
          name: "王三",
          age: 22,
          sex: "男",
          num: "12222",
          choose: false
        },
          {
          id: "1",
          headimg: require("../assets/img/patient_pic.png"),
          name: "王三",
          age: 22,
          sex: "男",
          num: "12222",
          choose: false
        }
      ]
    };
  },

  computed:{
       searchfun(){
           return this.listp.filter((item)=>{
               return  item.name.indexOf(this.search)!=-1
           })
       }
  },
  methods: {
    choosefun() {
      //批量选择
      this.show = !this.show;
    },
    yeschoose(i) {
      this.listp.forEach(() => {
        this.listp[i].choose = true;
      });
    },
    alldel() {
      //批量删除
        var arr=[];

        this.listp.forEach((item)=>{
             if(!item.choose){
                 arr.push(item)
             }

        });
       this.listp=arr;

    },
    del(i) {
      //删除
      this.listp.splice(i, 1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="stylus">
.red {
  color: red;
}

.righttext {
  color: #999;

  p {
    line-height: 1.8;
  }
}

.colevery {
  position: relative;
}

.el-icon-circle-check {
  position: absolute;
  right: 10px;
  top: 0;
  z-index: 2;
}

.rowcon {
  padding: 10px 0;
}
</style>