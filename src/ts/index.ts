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
  action(name, payload = {}) {
    // 找到接口
    const api = this.apiList.list[name];
    if(!api){
      throw new Error( `Api ${name} is undefined` )
    }
    // 初始化相应数据
    let _payload = jClone(payload) // 隔绝相应数据
    let token = this.config.token;
    const { transform, url, before, needToken, extra } = api;

    _payload = transform(_payload);
    if (needToken) {
      if( !token )throw new Error('token is undefined');
      const { key, getter } = token;
      if( typeof getter === 'string' ){
        payload[key] = getter;
      }else{
        payload[key] = getter();
      }
    }

    const requestConfig = {
      method: "post",
      url,
      data:payload,
      extra
    };
    
    return this._axios(before(requestConfig));
  }

  test(){}

  install(Vue) {
    Vue.prototype[this.config.vuePluginName] = this.action.bind(this)
    Vue.prototype.$connecter = this;
  }
}
