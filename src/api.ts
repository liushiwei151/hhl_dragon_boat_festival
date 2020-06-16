import axios from "axios";
// import qs from 'qs'
// axios.defaults.timeout = 3000; //响应时间
//测试
axios.defaults.baseURL = "http://qrhhl.yunyutian.cn/huanghelou1916-boat"; //配置接口地址
//正式
// axios.defaults.baseURL = "https://qr.hhl1916.com/huanghelou1916-boat"; //配置接口地址
axios.defaults.withCredentials = true;

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    //在发送请求之前做某件事
    if (JSON.parse(localStorage.getItem("userInfo") as string)) {
      const token = JSON.parse(localStorage.getItem("userInfo") as string)
        .token;
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
const userInfo = (data: string) => {
  return axios.post("/users/" + data);
};
//排行榜接口
const rankingList = () => {
  return axios.get("/users/board");
};
//获取微信sdk权限
const getJsSign = (data: string) => {
  return axios.get("/users/getJsSign", {
    params: {
      url: data
    }
  });
};
//分享游戏+1
const shareGame = (data: string) => {
  return axios.put("/users/share/" + data);
};
//开始游戏
const playGame = (data: string) => {
  return axios.put("/users/play/" + data);
};
//获取奖品
const lotteries = (data: any) => {
  return axios.put("/lotteries/users/" + data.openid, data.gameRecordVO);
};
export default {
  userInfo,
  rankingList,
  getJsSign,
  shareGame,
  playGame,
  lotteries
};
