<template>
  <div>
    <el-container>
      <el-aside class="left-con">
           <div class="logocon">
               <img class="logo"  src="../assets/img/title1_bg.jpg" alt="">
           </div>
             <router-link v-for="(item,i) in navList" :key="i" :to="item.path"><i class="icon" :class="item.icon"></i>{{item.name}}</router-link>
         <div class="bottomcon">
             <p>
               <img class="headimg" src="../assets/img/patient_pic.png" alt="">
               张医生
             </p>

             <p>
                <span @click="gologin"><i class="el-icon-switch-button"></i> 退出登录</span>
             </p>

         </div>
      </el-aside>
      <el-main>
            <div class="right-con">
           
        <transition name="fade" mode="out-in">
          <router-view  :key="$route.path"></router-view>
        </transition>
    
                 <!-- <router-view></router-view> -->
                 
            </div>
            
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Index",
  data(){
    return {
      transitionName:"",
       navList:[
         {
            path:"/index/mybingren",
            name:"我的病人",
            icon:"el-icon-user"
         },
          {
            path:"/index/ebingli",
            name:"电子病历",
            icon:"el-icon-document"
         },
          {
            path:"/index/zhuyuan",
            name:"住院管理",
            icon:"el-icon-document-copy"
         }
         ,
          {
            path:"/index/baogao",
            name:"报告查询",
            icon:"el-icon-search"
         }
         ,
          {
            path:"/index/chuyuan",
            name:"出院管理",
            icon:"el-icon-notebook-1"
         }
         ,
          {
            path:"/index/chufang",
            name:"处方管理",
            icon:"el-icon-notebook-2"
         }
         ,
          {
            path:"/index/zixun",
            name:"就诊咨询",
            icon:"el-icon-news"
         },
          {
            path:"/index/myinfo",
            name:"个人信息",
            icon:"el-icon-chat-line-square"
         }
       ]
    }
  },


  methods:{
    gologin(){
      this.$router.replace({path:"/login"})
    }
  }
};
</script>

<style scoped lang="stylus">
  .headimg
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 10px 0;
   a
    display: block;
    padding: 8px;
    color #999
  .icon
    margin-right 10px  
  .router-link-active
    color $color
  .el-container 
       background: url('../assets/img/bg.jpg');
       height: 100vh;
       width: 100%;
       background-size: cover;
  .right-con
       padding: 20px;
   
  .logo
       width: 100px;
       height: 86px;
   
  .left-con
       width 200px !important;
       background rgba(255, 255, 255, 0.8);
       text-align center;
       position relative
   
   .logocon
       padding 10px 0;
       border-bottom 2px solid #16dcb8;
    .bottomcon
      color #999
      position absolute
      width 100%
      border-top 2px solid #dedede
      padding 20px 0
      bottom 0
    img 
      vertical-align middle
    span 
     cursor pointer
     
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>