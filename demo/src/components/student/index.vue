<template>
    <div>
        <el-descriptions title="学生详情信息" direction="vertical" :column="4" border>
            <el-descriptions-item label="学号">{{studentInfo.username}}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{studentInfo.phone}}</el-descriptions-item>
            <el-descriptions-item label="宿舍" :span="2">{{studentInfo.dorm}}</el-descriptions-item>
            <el-descriptions-item label="备注">
                <el-tag size="small">普通学生</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="家庭住址">{{studentInfo.address}}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
    export default {
        name: "studentInfo",
        props: {
            studentInfo: {
                username: Number,
                phone: Number,
                dorm: String,
                address: String
            }
        },
        data() {
            return {

            }
        },
        methods: {
            
        }
    }
</script>