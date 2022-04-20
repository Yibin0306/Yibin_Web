\ <template>
    <div class="container">
        <el-card class="box-card" shadow="always">
            <div slot="header" class="box-card-header">
                <span>教务管理系统 - 登录</span>
            </div>
            <el-form label-width="80px" :model="form" :rules="fotmInputRules" ref="form">
                <el-form-item label="用户名：" prop="username">
                    <el-input
                    placeholder="请输入用户名"
                    v-model="form.username"
                    clearable></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input
                    placeholder="请输入密码"
                    v-model="form.password"
                    show-password
                    @keyup.enter.native="handleLogin('form')"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: right;">
                <el-button
                type="primary"
                @click="handleLogin('form')"
                round>登录</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "login",
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            fotmInputRules: {
                username: [
                    {required: true, message: "请输入用户名！", trigger: "blur"},
                    {min: 3, max: 10, message: "用户名最低3字符，最高10字符！"}
                ],
                password: [
                    {required: true, message: "请输入密码！", trigger: "blur"},
                    {min: 3, max: 32, message: "用户名最低3字符，最高32字符！"}
                ]
            },
            errorRequestMsg: "请联系管理员"
        }
    },
    mounted() {
        this.loggedIn();
    },
    methods: {
        loggedIn(){
            const token = localStorage.getItem("token");
            if( token == null
            || token == undefined ) {
                console.log("老老实实登录吧！")
                return;
            }
            this.$router.push("/system")
        },
        handleLogin(form) {
            this.$refs.form.validate((valid) => {
                if(valid){
                    // 登录操作
                    let data = new FormData();
                    data.append("username", this.form.username)
                    data.append("password", this.form.password)
                    axios
                    .post("/system/login", data)
                    .then(res => {
                        var result = res.data
                        if(result.code == 200){
                            // 存储Token，方便以后进行测试
                            console.log(result.data.token)
                            localStorage.setItem("name", result.data.name)
                            localStorage.setItem("token", result.data.token)
                            this.$router.push({path: "/system/dashboard"})
                            return;
                        }
                        console.log(result)
                        this.$notify.error({
                            title: "操作失败",
                            message: result.msg,
                            duration: 3000
                        })
                    })
                }else {
                    this.$notify.error({
                        title: "操作失败",
                        message: "请输入完整信息！",
                        duration: 3000
                    })
                    return false;
                }
            })
        }
    }
}
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100%;;
    }
    .el-card{
        width: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .box-card-header {
        text-align: center;
    }
</style>