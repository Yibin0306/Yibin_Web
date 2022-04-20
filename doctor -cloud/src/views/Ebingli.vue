<template>
  <div>
     <p>
        <span v-show="show" @click="tabshow('blindex')" :class="['defaulttit', activetab=='blindex'?'activetit':'']">电子病历</span>
         <span v-show="show"  @click="tabshow('bliadd')" :class="['defaulttit', activetab=='bliadd'?'activetit':'']">添加病历</span>
        <span v-show="!show" class="defaulttit activetit">病历查看</span>
         
         
          <i  v-show="!show"  @click="back" class="el-icon-circle-close"></i>
         
      </p>

      

      <div class="conterdiv">
             <component v-bind:is="activetab" @lookbl="getbl" :lookdata="lookdata">
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

<style scoped>

  

</style>