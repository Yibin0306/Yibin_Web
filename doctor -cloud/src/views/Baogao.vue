<template>
  <div>
     <p>
        <span v-show="show" @click="tabshow('blindex')" :class="['defaulttit', activetab=='blindex'?'activetit':'']">报告查询</span>
         <span v-show="show"  @click="tabshow('baogaoadd')" :class="['defaulttit', activetab=='baogaoadd'?'activetit':'']">添加报告</span>
        
      <span v-show="!show" class="defaulttit activetit">报告查看</span>
       <i  v-show="!show"  @click="back" class="el-icon-circle-close"></i>
      </p>

      

      <div class="conterdiv">
             <component v-bind:is="activetab" @lookbl="getbl" :lookdata="lookdata" :xiangmu='xiangmu'>

                  <el-input class="inputwidth" slot="xiangmu" placeholder="请输入检查项目" v-model="xiangmu"></el-input>
             </component>
      </div>
  </div>
</template>

<script>
import blindex from '../components/Ebingliindex'
import baogaoadd from '../components/Baogaoadd'

export default {
       name:"Ebingli",
       data() {
         return {
             xiangmu:"",
           activetab:'blindex',
           show:true,
           lookdata:""
         }
       },
       components:{
        blindex,
        baogaoadd

       },
       methods:{
         tabshow(tab){
 
           this.activetab=tab;

         },
         getbl(arg){

           this.activetab='baogaoadd';

           this.show=false;

           this.lookdata=arg;

           console.log(arg)

         },
          back(){
            this.show=!this.show
         }
       }
}
</script>

<style>

</style>