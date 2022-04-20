<template>
    <div>
        <el-radio-group v-model="radioType" size="mini" @change="handleChange">
            <el-radio-button label="未选课程"></el-radio-button>
            <el-radio-button label="已选课程"></el-radio-button>
        </el-radio-group>
        <el-table border :data="list" style="margin-top: 15px;">
            <el-table-column label="课程代码" align="center" width="100" prop="id"></el-table-column>
            <el-table-column label="课程名称" align="center" prop="name"></el-table-column>
            <el-table-column label="创建时间" prop="createtime" align="center"></el-table-column>
            <el-table-column label="创建者" prop="createby" align="center"></el-table-column>
            <el-table-column label="学分" width="80" align="center" prop="credit"></el-table-column>
            <el-table-column label="已选人数/课程人数" prop="upper" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" v-show="radioType == '未选课程'" @click="">选课</el-button>
                    <el-button type="danger" size="mini" v-show="radioType == '已选课程'" @click="">退课</el-button>
                    <el-button type="info" size="mini" @click="courseContent(scope)">简介</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
        :visible.sync="courseContentVis"
        title="课程简介">
            <p style="z-indent: 2em;">{{courseContentText}}</p>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "CourseSelection",
        data() {
            return {
                list: [],
                radioType: "未选课程",
                courseContentVis: false,
                courseContentText: ""
            }
        },
        mounted() {
            this.getCourseNotSelectionList();
        },
        methods: {
            // 获取未选课程
            getCourseNotSelectionList() {
                axios.get("/course/getCourseNotSelectionList").then(res => {
                    this.list = res.data.list;
                })
            },
            // 获取已选课程
            getCourseSelectionList() {
                axios.get("/course/getCourseSelectionList").then(res => {
                    this.list = res.data.list;
                })
            },
            handleChange() {
                if (this.radioType == "未选课程") {
                    this.getCourseNotSelectionList();
                } else {
                    this.getCourseSelectionList();
                }
            },
            courseContent(scope) {
                console.log(scope)
                this.courseContentText = scope.row.content
                this.courseContentVis = true;
            }
        }
    }
</script>