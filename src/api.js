import axios from "axios";
// import qs from 'qs'
// axios.defaults.timeout = 3000; //响应时间
//测试
axios.defaults.baseURL = "http://qrhhl.yunyutian.cn/huanghelou1916-boat"; //配置接口地址
//正式
// axios.defaults.baseURL = 'https://qr.hhl1916.com/huanghelou1916-boat';   //配置接口地址
axios.defaults.withCredentials = true;

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    //在发送请求之前做某件事
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      let token = JSON.parse(localStorage.getItem("userInfo")).user.token;
      config.headers.token = token;
    }
    return config;
  },
  error => {
    alert("错误的传参");
    return Promise.reject(error);
  }
);

/*const jsSign =(url)=>{
	return axios.get('/yq/jsSign',{
		params:url
	})
}
const start =(data)=>{
	return axios.post('/yq/shout/start',data)
}*/
const userInfo = data => {
  return axios.post("/users/" + data);
};
export default {
  userInfo
};
