import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
const instance = axios.create({
    baseURL: process.env.VUE_APP_address //由于get和post请求的前缀一样，频繁写造成重复，axios提供了这个方法
  });

  //只要有axios请求都会走这段代码
  // 添加请求拦截器
instance.interceptors.request.use(function (config) { //axios全改为instance
    // 在发送请求之前做些什么
     let {url,method, params,data}=config
     let args=data||params
     if (args) {//post请求参数是在data中，如果data存在则表示为post请求，打印data
         if (process.env.NODE_ENV==='development') { //判断只在开发模式下打印
            console.log(`${method}了${url},参数是：`,args); //这样以后调试时可以判断有没有发送请求，是不是代码写错了
         }       
     }
     
    NProgress.start() //请求前动画开始
    return config;
  }, function (error) {
    // 对请求错误做些什么
    NProgress.done() //出错动画也要停止
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    NProgress.done() //响应后动画结束 
    return response;
  }, function (error) {
    // 对响应错误做点什么
    NProgress.done() //出错动画也要停止
    return Promise.reject(error);
  });  
  export default instance  //导出到mixin中