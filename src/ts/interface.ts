class ConnecterHooks {
  beforeEach?: Function = conf => {};
  afterEach?: Function = () => {};
  successEach?: Function = res => res;
  failEach?: Function = e => Promise.reject(e);
  private hookNames = new Set([
    "beforeEach",
    "afterEach",
    "successEach",
    "failEach"
  ]);
  constructor(hooks) {
    for (let name in hooks) {
      if (this.hookNames.has(name)) {
        this[name] = hooks[name];
      }
    }
  }
}

class ConnecterToken {
  getter: Function|string;
  key?: string = "api_token";
  mode?: string;
  isCache?: boolean = false;
  private tokenNames = new Set(["getter", "key", "mode", "isCache"]);
  constructor(token: ConnecterToken) {
    for (let name in token) {
      if (this.tokenNames.has(name)) {
        this[name] = token[name];
      }
    }
    if(this.isCache && this.getter instanceof Function ){
      this.getter = this.getter();
    }
  }
}

class ApiValidatItem{
  type?:string
  required?: boolean
  default?: any
}

class ApiValidat {
  [ name:string ]: ApiValidatItem | Function
  constructor( validats:ApiValidat ){
    for( const name in validats ){
      this.name = validats[ name ]
    }
  }
}

class Api {
  name?: string;
  uri: string;
  moduleName?: string;
  alias?: string;
  needToken?: boolean;
  transform?: Function = data => data;
  before?: Function = config => config;
  after?: Function = res => res;
  extra?: Object = {}
  // validat?: ApiValidat
  constructor(child: Api) {
    for (let key of Object.keys(child)) {
      this[key] = child[key];
    }
  }
}

class ConnecterModules {
  // [name: string]: ConnecterModuleItem;
  [name: string]: Array<Api>;
  constructor(modules) {}
}

export class ConnecterConfig {
  env?: string = "vue";
  baseURL?: string = "/";
  timeout?: number = 10000;
  vuePluginName?: string = "$connect";
  connectChar?: string = "-";
  mode?: string = "";
  modules?: ConnecterModules;
  token?: ConnecterToken;
  hooks?: ConnecterHooks;
  constructor(config: ConnecterConfig) {
    for (let key of Object.keys(config)) {
      switch (key) {
        case "token":
          this[key] = new ConnecterToken(config[key]);
          break;
        case "hooks":
          this[key] = new ConnecterHooks(config[key]);
          break;
        default:
          this[key] = config[key];
      }
    }
  }
}

export class ApiList {
  list: Object;
  // [name:string]: Api|Function;

  constructor(config: ConnecterConfig) {
    this.list = this.generator(config);
  }
  // get [name](){
  //   return this.list[name]
  // }
  private moduleModeInit(config) {
    let r = {};
    const modules = config.modules;
    // 遍历 modules
    for (let moduleName in modules) {
      let moduleItem = modules[moduleName];
      // 遍历 module<Array>
      for (let api of moduleItem) {
        r[`${moduleName}${config.connectChar}${api.name}`] = new Api(api);
        if (api.alias) {
          r[api.alias] = new Api(api);
        }
      }
    }
    return r;
  }
  // private modulesInit( module ) {}
  private simpleModeInit(config) {
    return {};
  }
  private generator(config: ConnecterConfig) {
    if (!!config.modules && Object.keys(config.modules).length >= 0) {
      config.mode = "module";
    } else {
      config.mode = "simple";
    }

    switch (config.mode) {
      case "module":
        return this.moduleModeInit(config);
      case "simple":
        return this.simpleModeInit(config);
    }
  }
}
