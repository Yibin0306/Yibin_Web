<template>
  <div>
       <p>
            <span>姓名：{{lookdata.name}}</span>
             <span>性别：{{lookdata.sex}}</span>
              <span>年龄：{{lookdata.age}}</span>
             <span>科室：**</span>
              <span>时间：**</span>  
       </p>
       <p>
           <span>住院号：**</span>
             <span>病床号：**</span>
              <span>主治医师：**</span>
             <span>护士：**</span>
       </p>
       <div class="middiv">
           <p>诊断症状：**</p>
           <p>手术：**</p>
           <p>恢复情况：ok</p>

           <p>备注：**</p>
       </div>
       <p>123</p>
  </div>
</template>

<script>
export default {
    name:"Chuyuanprint",
    props:['lookdata']

}
</script>

<style scoped lang="stylus">
.middiv
  border-top 2px solid #dedede
  border-bottom 2px solid #dedede
  padding 20px 0
span 
  margin-right 80px
p
 padding 10px 0
</style>