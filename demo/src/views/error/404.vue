<template>
    <div class="container">
        <el-empty
        description="网页被外星人劫持走啦！">
            <el-button
            type="primary"
            round
            size="mini"
            @click="backLogin()">返回登录页面</el-button>
        </el-empty>
    </div>
</template>

<script>
    export default {
        name: "notFound",
        methods: {
            backLogin() {
                this.$router.push("/");
            }
        }
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>