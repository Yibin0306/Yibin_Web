<template>
  <div>
     <p>
        <span v-show="show" @click="tabshow('blindex')" :class="['defaulttit', activetab=='blindex'?'activetit':'']">住院管理</span>
         <span v-show="show"  @click="tabshow('bliadd')" :class="['defaulttit', activetab=='bliadd'?'activetit':'']">添加病人</span>
        
      <span v-show="!show" class="defaulttit activetit">住院查看</span>
       <i  v-show="!show"  @click="back" class="el-icon-circle-close"></i>
      </p>

      

      <div class="conterdiv">
             <component v-bind:is="activetab" @lookbl="getbl" :lookdata="lookdata" :phone="phone" :num="num" :roomnum="roomnum">
                    <el-input slot="phone" class="inputwidth" placeholder="手机号" v-model="phone"></el-input>
                      <el-input slot="num" class="inputwidth" placeholder="住院号" v-model="num"></el-input>
                        <el-input slot="roomnum" class="inputwidth" placeholder="床号" v-model="roomnum"></el-input>

                         <i class="el-icon-delete" slot="delate"></i>
             </component>
      </div>
  </div>
</template>

<script>
import blindex from '../components/Ebingliindex'
import bliadd from '../components/Ebingliadd'

export default {
       name:"Ebingli",
       data() {
         return {
             phone:"",
             num:"",
             roomnum:"",
           activetab:'blindex',
           show:true,
           lookdata:""
         }
       },
       components:{
        blindex,
        bliadd

       },
       methods:{
         tabshow(tab){
 
           this.activetab=tab;

         },
         getbl(arg){

           this.activetab='bliadd';

           this.show=false;

           this.lookdata=arg

         },
          back(){
            this.show=!this.show
         }
       }
}
</script>

<style>

  
</style>