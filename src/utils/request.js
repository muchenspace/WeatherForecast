//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from "@/router"

const baseURL = '';
const instance = axios.create({ baseURL })


//添加响应拦截器
instance.interceptors.response.use(
    result => {
        if (result.data.code != 200) {
            console.log(`服务失败 code:${result.data.code}`);
            if (result.data.code == 401) {
                console.log(`key错误`);
            }
            else if(result.data.code == 400)
            {
                console.log("location错误")
                router.push("/settings")
            }
            return Promise.reject(err);//异步的状态转化成失败的状态
        }
        return result.data;
    },
    err => {
        ElMessage.error('服务异常');
        console.log(`状态码：${err.response.status == 401}`)
        console.log(`错误信息：${err}`)
        return Promise.reject(err);//异步的状态转化成失败的状态

    }
)

export default instance;