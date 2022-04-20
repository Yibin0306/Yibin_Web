<template>
    <div>
        <el-input placeholder="测试信息" v-if="inputVis"></el-input>
        <el-button type="primary" v-if="buttonVis">按钮</el-button>
        {{msg}}
    </div>
</template>

<script>
export default {
    name: "loginUtils",
    props: {
        inputVis: Boolean,
        buttonVis: Boolean,
        msg: String
    },
    data() {
    }
}
</script>