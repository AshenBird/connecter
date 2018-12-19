import { ConnecterConfig, ApiList } from "./interface";
import axiosCreater from "./http";
import { jClone } from "./utils";
export default class Connecter {
    constructor(config) {
        // 配置项初始化
        this.config = new ConnecterConfig(config);
        // 生成供调用的api列表
        this.apiList = new ApiList(config);
        // 生成用于http请求的axios实例
        // 未来准备增加对websock的支持, 采用socket.io
        this._axios = axiosCreater(config);
    }
    action(name, payload) {
        const request = (api, data) => {
            const { url, before } = api;
            const config = {
                method: "post",
                url,
                data
            };
            return this._axios(before(config));
        };
        const api = this.apiList[name];
        const token = this.config.token;
        payload = api.transform(jClone(payload));
        if (api.needToken) {
            if (!!token) {
                const { key, getter, mode } = token;
                payload[key] = getter();
            }
            else {
                throw new Error('token is undefined');
            }
        }
        return request(api, payload);
    }
    install(Vue) {
        Vue.prototype[this.config.actionName] = this.action.bind(this);
        Vue.prototype.$connecter = this;
    }
}
//# sourceMappingURL=index.js.map