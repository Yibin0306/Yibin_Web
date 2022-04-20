<template>
    <div>
        <el-form :model="form">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="学号：" label-width="68px">
                        <el-input v-model="form.username" placeholder="学号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="姓名：" label-width="68px">
                        <el-input v-model="form.name" placeholder="姓名"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="密码：" label-width="68px">
                        <el-input v-model="form.password" placeholder="密码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号：" label-width="68px">
                        <el-input v-model="form.phone" placeholder="手机号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="宿舍号：" label-width="68px">
                        <el-input v-model="form.dorm" placeholder="宿舍号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="班级：" label-width="68px">
                        <el-select style="width: 100%;" v-model="form.classname">
                            <el-option v-for="item in classList" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <el-form-item label="家庭住址：">
                        <el-input v-model="form.address" type="textarea" :rows="3" placeholder="家庭住址"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div style="text-align: right;">
            <el-button type="primary" @click="add">新增</el-button>
        </div>
    </div>
</template>

<script>
import axios from "axios"
    export default {
        name: "addUser",
        props: {
            classList: [],
            form: {
                username: "",
                password: "",
                nowPassword: "",
                name: "",
                phone: "",
                dorm: "",
                address: "",
                classname: ""
            }
        },
        data() {
            return {
                token: localStorage.getItem("token"),
                addUserStatus: 1
            }
        },
        methods: {
            add() {
                var formData = new FormData();
                formData.append("username", this.form.username);
                formData.append("password", this.form.password);
                formData.append("name", this.form.name);
                formData.append("phone", this.form.phone);
                formData.append("dorm", this.form.dorm);
                formData.append("address", this.form.address);
                formData.append("classname", this.form.classname);
                axios.post("/student/add", formData, {
                    header: {
                        "token": this.token
                    }
                }).then((res) => {
                    var result = res.data;
                    if( result.code == 101){
                        this.form.nowPassword = "";
                        this.$message({
                            showClose: true,
                            message: result.msg,
                            type: 'error'
                        });
                        this.$emit("addUserStatus", this.addUserStatus)
                        return;
                    }
                    this.$message({
                        showClose: true,
                        message: result.msg,
                        type: 'success'
                    });
                    this.$emit("addUserStatus", this.addUserStatus)
                })
                .catch(e => {
                    this.form.nowPassword = "";
                    this.$emit("addUserStatus", this.addUserStatus)
                    this.$message({
                        showClose: true,
                        message: '请联系管理员',
                        type: 'error'
                    });
                })
            }
        }
    }
</script>