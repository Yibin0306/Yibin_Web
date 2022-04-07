<template>
    <div style="height: 100%;">
        <el-container style="height: 100%;">
            <el-aside :width='sideWidth + "px"'
                style="background-color: rgb(238, 241, 246);height: 100%;box-shadow: 2px 0 6px rgb(0 21 41 / 35%);overflow: hidden;">
                <el-menu :default-openeds="['1', '3']" style="min-height: 100%;overflow-x: hidden;overflow-y: hidden;"
                    background-color="rgb(48, 65, 86)" text-color="#fff" active-text-color="#0098FA"
                    :collapse-transition="false" :collapse="isCollapse" router="true">
                    <div style="height: 60px;line-height: 60px;text-align: center;">
                        <b><i class="el-icon-place" style="color: #fff;"></i></b>
                        <b style="color: #fff;margin-left: 8px;" v-show="logoTextShow">教务管理系统</b>
                    </div>
                    <el-menu-item index="dashboard">
                        <i class="el-icon-odometer"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span slot="title">用户管理</span>
                        </template>
                        <el-menu-item index="/system/student">学生管理</el-menu-item>
                        <el-menu-item index="/system/teacher">教师管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <!-- 头部设置 -->
                <el-header
                    style="text-align: right; font-size: 12px;display: flex;align-items: center;justify-content: flex-start;box-shadow: 2px 0 6px rgb(0 21 41 / 35%);position: relative;">
                    <i class="el-icon-s-unfold" style="font-size: 18px;cursor: pointer" @click="collapse"></i>
                    <div class="userData">
                        <i class="el-icon-user-solid" style="font-size: 18px;margin-right: 5px;"></i>
                        <el-dropdown trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-s-promotion" command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>

                <el-main>
                    <!-- 主体内容 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    export default {
        name: "MainContainer",
        data() {
            return {
                isCollapse: false,
                sideWidth: 200,
                logoTextShow: true,
                name: localStorage.getItem("name"),
                token: localStorage.getItem("token")
            }
        },
        methods: {
            // 控制菜单栏伸缩
            collapse() {
                this.isCollapse = !this.isCollapse;
                if (this.isCollapse) {
                    this.sideWidth = 64
                    this.logoTextShow = false;
                } else {
                    this.sideWidth = 200
                    this.logoTextShow = true;
                }
            },
            logout() {
                console.log("你好")
            },
            handleCommand(command) {
                if( command == "logout" ){
                    localStorage.clear("token");
                    localStorage.clear("name");
                    this.$router.push("/");
                }
            }
        }
    }
</script>

<style>
    .userData {
        position: absolute;
        right: 25px;
    }
</style>