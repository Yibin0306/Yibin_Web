<template>
    <div>
        <el-form :inline=true :model="form" ref="form">
            <el-row :gutter="5">
                <el-col :span="20">
                    <el-form-item label="职工号:" label-width="68px">
                        <el-input v-model="form.username" @keyup.enter.native="searchTeacher(1)"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名:" label-width="68px">
                        <el-input v-model="form.name" @keyup.enter.native="searchTeacher(1)"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="mini" @click="searchTeacher(1)">搜索</el-button>
                        <el-button size="mini" @click="resetFields('form')">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table v-loading="tableDataLoading" :data="tableData" border>
            <el-table-column prop="username" label="职工号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
            </el-table-column>
            <el-table-column prop="dorm" label="宿舍">
            </el-table-column>
            <el-table-column prop="address" label="家庭住址">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="deleteStudent(scope)" icon="el-icon-delete" circle>
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
    </div>
</template>
<script>
    import axios from "axios"

    export default {
        name: "teacherList",
        data() {
            return {
                form: {
                    username: "",
                    name: ""
                },
                tableDataLoading: true,
                tableData: [],
                pagesize: 10,
                currentPage: 1,
                type: "get",
                total: 0
            }
        },
        mounted() {
            // 挂载
            this.getStudentList(1);
        },
        methods: {
            searchTeacher(page) {
                this.tableDataLoading = true;
                var formData = new FormData();
                formData.append("username", this.form.username);
                formData.append("name", this.form.name);
                formData.append("page", page);
                formData.append("pagesize", this.pagesize)
                axios
                    .post("/teacher/search", formData)
                    .then(res => {
                        this.type = "search"
                        this.tableDataLoading = false;
                        var result = res.data;
                        if (result.code == 200) {
                            this.tableData = result.list;
                            this.total = result.total
                            return;
                        }
                        this.$message({
                            showClose: true,
                            message: '获取教师信息错误',
                            type: 'error'
                        });
                    })
            },
            getStudentList(page) {
                this.tableDataLoading = true;
                axios
                    .get("/teacher/List?page=" + page + "&pagesize=" + this.pagesize)
                    .then(res => {
                        this.tableDataLoading = false;
                        var result = res.data;
                        if (result.code == 200) {
                            this.tableData = result.list;
                            this.total = result.total
                            return;
                        }
                        this.$message({
                            showClose: true,
                            message: '获取教师信息错误',
                            type: 'error'
                        });
                    })
            },
            resetFields(form) {
                this.form.username = ""
                this.form.name = ""
                this.currentPage = 1;
                this.type = "get";
                this.getStudentList(1);
            },
            showStudent(scope) {
                console.log(scope.row)
            },
            deleteStudent(scope) {
                this.$confirm("您确定要删除此教师？", "温馨提示", {
                    type: "warning"
                }).then(res => {
                    var studentid = scope.row.username;
                    axios
                        .get("/teacher/delete?username=" + studentid)
                        .then(res => {
                            var result = res.data;
                            if (result.code == 200) {
                                if (this.type == "search") {
                                    this.searchTeacher(this.currentPage)
                                    return;
                                }
                                this.getStudentList(this.currentPage);
                                this.$message({
                                    message: '删除教师成功！',
                                    type: 'success'
                                });
                                return;
                            }
                            this.$message.error("删除教师成功！");
                        })
                })
            },
            handleCurrentChange(val) {
                if (this.type == "search") {
                    this.searchTeacher(val);
                    return;
                }
                this.getStudentList(val);
            },
            handleChangePageSize(val) {
                this.pagesize = val;
                if (this.type == "search") {
                    this.searchTeacher(this.currentPage);
                    return;
                }
                this.getStudentList(this.currentPage);
            }
        }
    }
</script>

<style scoped>
    .el-input {
        width: 12rem;
    }
</style>