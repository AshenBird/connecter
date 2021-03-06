// import axios from '../node_modules/axios/index'
import axios from 'axios';
export default function axiosCreater(config) {
    let { baseURL, timeout, hooks, headers } = config;
    let httpServer = axios.create({
        baseURL,
        timeout,
        headers
    });
    // 请求拦截器
    httpServer.interceptors.request.use(config => {
        hooks.beforeEach(config);
        return config;
    }, e => {
        console.log("axios.request 报错");
        return Promise.reject(e);
    });
    // response 拦截器
    httpServer.interceptors.response.use(res => {
        hooks.afterEach();
        return hooks.successEach(res);
    }, e => {
        console.error(e);
        hooks.afterEach();
        return hooks.failEach(e);
    });
    return httpServer;
}
//# sourceMappingURL=http.js.map