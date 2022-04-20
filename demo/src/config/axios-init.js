import axios from "axios"

// 响应过期时间五秒钟
axios.defaults.timeout = 5000;

axios.interceptors.request.use(
    config => {
        axios.defaults.headers.token = localStorage.getItem("token")
    }
)