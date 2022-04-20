<template>
    <div>
        <el-form :inline=true :model="form" ref="form">
            <el-row :gutter="5">
                <el-col :span="24">
                    <el-form-item label="学号" label-width="68px">
                        <el-input v-model="form.studentid" size="small" placeholder="学号"
                            @keyup.enter.native="searchStudent(1)">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="姓名" label-width="68px">
                        <el-input v-model="form.name" size="small" placeholder="学生姓名"
                            @keyup.enter.native="searchStudent(1)">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="宿舍" label-width="68px">
                        <el-input v-model="form.dorm" size="small" placeholder="宿舍号"
                            @keyup.enter.native="searchStudent(1)">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="班级" label-width="68px">
                        <el-select v-model="form.classname" filterable size="small">
                            <el-option v-for="item in classList" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini" @click="searchStudent(1)">搜索</el-button>
                        <el-button size="mini" @click="resetFields('form')">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row :gutter="1">
            <el-col :span="1">
                <el-button type="primary" plain icon="el-icon-refresh-right" circle size="mini" @click="reloadData">
                </el-button>
            </el-col>
            <el-col :span="1">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="addUser">新增
                </el-button>
            </el-col>
        </el-row>
        <el-table v-loading="tableDataLoading" :data="tableData" border style="margin-top: 15px;">
            <el-table-column prop="username" label="学号" width="180" align="center">
            </el-table-column>
            <el-table-column prop="classname" label="班级" align="center">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180" align="center">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" align="center">
            </el-table-column>
            <el-table-column prop="dorm" label="宿舍" align="center">
            </el-table-column>
            <el-table-column prop="address" label="家庭住址">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="editStudent(scope)" icon="el-icon-edit" size="small" circle>
                    </el-button>
                    <el-button type="primary" @click="showStudent(scope)" icon="el-icon-view" size="small" circle>
                    </el-button>
                    <el-button type="danger" @click="deleteStudent(scope)" icon="el-icon-delete" size="small" circle>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div align="right">
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage"
                :page-size="pagesize" @size-change="handleChangePageSize" :page-sizes="[10, 50, 80, 100]"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- 显示学生信息 -->
        <el-dialog :visible.sync="studentInfoVis">
            <studentInfo :studentInfo="studentInfo"></studentInfo>
        </el-dialog>
        <!-- 增加学生信息 -->
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="addUserVis" title="增加学生" @close="dialogClose">
            <addUser :classList="classList" :form="userData" v-on:addUserStatus="addUserStatus"></addUser>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="editUserVis" title="修改学生" @close="dialogClose">
            <editUser :classList="classList" :form="userData" v-on:editUserStatus="editUserStatus"></editUser>
        </el-dialog>
    </div>
</template>
<script>
    import axios from "axios"
    import studentInfo from "@/components/student"
    import addUser from "@/components/student/add"
    import editUser from "@/components/student/edit"

    export default {
        name: "studentList",
        components: {
            studentInfo,
            addUser,
            editUser
        },
        data() {
            return {
                form: {
                    studentid: "",
                    name: "",
                    classname: "",
                    dorm: ""
                },
                classList: [],
                tableDataLoading: false,
                tableData: [],
                currentPage: 1,
                total: 0,
                studentInfoVis: false,
                addUserVis: false,
                pagesize: 10,
                type: "get",
                studentInfo: {
                    username: Number,
                    phone: Number,
                    dorm: String,
                    address: String
                },
                editUserVis: false,
                token: localStorage.getItem("token"),
                userData: {
                    username: "",
                    password: "",
                    nowPassword: "",
                    name: "",
                    phone: "",
                    dorm: "",
                    address: "",
                    classname: ""
                },
            }
        },
        mounted() {
            // 挂载
            this.getClassNameList();
            this.getStudentList(1);
        },
        methods: {
            reloadData() {
                this.getStudentList(1);
            },
            searchStudent(page) {
                // 查询学生
                this.tableDataLoading = true;
                var formData = new FormData();
                formData.append("username", this.form.studentid);
                formData.append("name", this.form.name);
                formData.append("classname", this.form.classname);
                formData.append("dorm", this.form.dorm);
                formData.append("page", page);
                formData.append("pagesize", this.pagesize)
                axios
                    .post("/student/find", formData)
                    .then(res => {
                        this.tableDataLoading = false;
                        var result = res.data;
                        if (result.code == 200) {
                            this.type = "search";
                            this.total = result.total
                            this.tableData = result.list;
                            return;
                        }
                        this.$message({
                            showClose: true,
                            message: '获取学生信息错误',
                            type: 'error'
                        });
                    })
            },
            getStudentList(page) {
                // 获取学生信息
                this.tableDataLoading = true;
                axios
                    .get("/student/list?page=" + page + "&pagesize=" + this.pagesize)
                    .then(res => {
                        this.tableDataLoading = false;
                        var result = res.data;
                        if (result.code == 200) {
                            this.tableData = result.list;
                            this.total = result.total;
                            return;
                        }
                        this.$message({
                            showClose: true,
                            message: '获取学生信息错误',
                            type: 'error'
                        });
                    })
            },
            getClassNameList() {
                // 获取班级列表
                axios
                    .get("/system/getClassList")
                    .then(res => {
                        var result = res.data;
                        if (result.code == 200) {
                            this.classList = result.list;
                            return;
                        }
                        this.$message({
                            showClose: true,
                            message: '获取班级信息失败',
                            type: 'error'
                        });
                    })
            },
            resetFields(form) {
                this.form.studentid = ""
                this.form.name = ""
                this.form.classname = ""
                this.form.dorm = ""
                this.type = "get";
                this.currentPage = 1;
                this.getStudentList(this.currentPage)
            },
            showStudent(scope) {
                var data = scope.row;
                this.studentInfo.username = data.username;
                this.studentInfo.phone = data.phone;
                this.studentInfo.dorm = data.dorm;
                this.studentInfo.address = data.address;
                this.studentInfoVis = true;
            },
            deleteStudent(scope) {
                this.$confirm("您确定要删除此学生？", "温馨提示", {
                    type: "warning"
                }).then(res => {
                    var studentid = scope.row.username;
                    axios
                        .delete("/student/delete?username=" + studentid)
                        .then(res => {
                            var result = res.data;
                            if (result.code == 200) {
                                if (this.type == "search") {
                                    this.searchStudent(this.currentPage);
                                    return;
                                }
                                this.getStudentList(this.currentPage);
                                this.$message({
                                    message: '删除学生成功！',
                                    type: 'success'
                                });
                                return;
                            }
                            this.$message.error("删除学生失败！");
                        })
                })
            },
            handleCurrentChange(val) {
                // 当页数变换的时候
                if (this.type == "search") {
                    this.searchStudent(val)
                    return;
                }
                this.getStudentList(val);
            },
            handleChangePageSize(val) {
                this.pagesize = val;
                if (this.type == "search") {
                    this.searchStudent(this.currentPage)
                    return;
                }
                this.getStudentList(this.currentPage)
            },
            addUser() {
                this.addUserVis = true;
            },
            editStudent(scope) {
                this.editUserVis = true;
                this.userData = scope.row
            },
            addUserStatus() {
                this.addUserVis = false;
            },
            editUserStatus() {
                this.editUserVis = false
            },
            dialogClose() {
                this.userData.username = "";
                this.userData.password = "";
                this.userData.nowPassword = "";
                this.userData.name = "";
                this.userData.phone = "";
                this.userData.dorm = "";
                this.userData.address = "";
                this.userData.classname = "";
                if(this.type == "get"){
                    this.getStudentList(this.currentPage);
                    return;
                }
                this.searchStudent(this.currentPage);
            }
        }
    }
</script>

<style scoped>
    .el-input {
        width: 12rem;
    }
</style>