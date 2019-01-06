import { ConnecterConfig, ApiList } from "./interface";
import axiosCreater from "./http";
import { jClone } from "./utils"
export default class Connecter {
  readonly config: ConnecterConfig;
  private apiList;
  public _axios;
  
  constructor(config: ConnecterConfig) {
    // 配置项初始化
    this.config = new ConnecterConfig(config);
    // 生成供调用的api列表
    this.apiList = new ApiList(this.config);
    
    // 生成用于http请求的axios实例
    // 未来准备增加对websock的支持, 采用socket.io
    this._axios = axiosCreater(this.config);
  }

  // 或许我应该在初始化时就尽量完成提交行为的结构
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
    const api = this.apiList.list[name];
    const token = this.config.token;
    if(!api){
      throw new Error( `${name} is undefined` )
    }
    
    payload = api.transform(jClone(payload));
    if (api.needToken) {
      if (!!token) {
        const { key, getter } = token;
        if( typeof getter === 'string' ){
          payload[key] = getter;  
        }else{
          payload[key] = getter();
        }
      }else{
        throw new Error('token is undefined')
      }
    }

    return request(api, payload);
  }

  install(Vue) {
    Vue.prototype[this.config.vuePluginName] = this.action.bind(this)
    Vue.prototype.$connecter = this;
  }
}
