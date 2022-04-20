import VueRouter from "vue-router"
// 登录界面
import login from "@/views/login"
// 主页
import MainContainer from "@/views/Container"
import dashboard from "@/views/Container/dashboard"
import studentList from "@/views/user/student/"
import teacherList from "@/views/user/teacher/"
import CourseSelection from "@/views/Course/CourseSelection"
import notFound from "@/views/error/404"

export default new VueRouter({
    routes: [
        {
            path: "/",
            component: login,
            hidden: true
        },
        {
            path: "/system",
            component: MainContainer,
            children: [
                {
                    // 如果没有的话，自动跳转路径到控制台(首页)
                    path: "/",
                    redirect: "dashboard",
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    // 首页   控制台
                    path: "dashboard",
                    component: dashboard,
                    meta: {
                        requiresAuth: true
                    }
                },{
                    // 学生管理页面
                    path: "student",
                    component: studentList,
                    meta: {
                        requiresAuth: true
                    }
                },{
                    // 学生管理页面
                    path: "teacher",
                    component: teacherList,
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: "/course",
            component: MainContainer,
            children: [
                {
                    path: "/",
                    redirect: "selection",
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: "selection",
                    component: CourseSelection,
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        },
        {
         // 404 页面 
          path: '/404',
          component: notFound,
          hidden: true
        },
        {
            // 如果找不到页面，路由自动定义到404
            path: "*",
            redirect: "/404"
        }
    ]
})
