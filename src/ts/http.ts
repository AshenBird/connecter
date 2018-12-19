// import axios from '../node_modules/axios/index'
import axios from 'axios'


export default function axiosCreater(config) {
  let { baseURL, timeout, hooks } = config;

  let httpServer = axios.create({
    baseURL,
    timeout
  });
  // 请求拦截器

  httpServer.interceptors.request.use(
    config => {
      hooks.beforeEach(config);
      return config;
    },
    e => {
      console.log("axios.request 报错");
      return Promise.reject(e);
    }
  );

  // response 拦截器
  httpServer.interceptors.response.use(
    res => {
      hooks.afterEach(res);
      hooks.successEach(res);
      return res;
    },
    e => {
      console.error(e);
      hooks.afterEach(e);
      hooks.failEach(e);
      return Promise.reject(e);
    }
  );
  return httpServer;
}
