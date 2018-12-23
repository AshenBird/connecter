class ConnecterHooks{
  beforeEach?:Function = conf =>{};
  afterEach?:Function = ()=>{};
  successEach?:Function = res => res;
  failEach?:Function = e => Promise.reject(e);
  private hookNames = new Set([
    'beforeEach',
    'afterEach',
    'successEach',
    'failEach',
  ])
  constructor( hooks ){
    for( let name in hooks ){
      if( this.hookNames.has(name) ){
        this[name] = hooks[name];
      }
    }
  }
}

class ConnecterToken{
  getter: Function;
  key?:string = 'api_token';
  mode?:string;
  constructor(token){}
}

class ConnecterModuleChild{
  name: string;
  uri: string;
  alias?: string;
  needToken?: boolean;
  transform?: Function = data => data;
  before?: Function = config => config;
  constructor( child:ConnecterModuleChild ){
    for( let key of Object.keys(child) ){
      this[key] = child[key];
    }
  }
}



class ConnecterModules{
  [name: string]: Array<ConnecterModuleChild>;
  constructor(modules){
  }
}


export class ConnecterConfig{
  baseURL?:string = '/';
  timeout?: number = 10000;
  vuePluginName?:string = '$connect';
  connectChar?:string = '-';
  mode?:string = '';
//  headers?: HttpRequestHeader: HttpRequestHeader();
  modules?: ConnecterModules;
  token?: ConnecterToken;
  hooks?: ConnecterHooks;
  constructor(config:ConnecterConfig){
    for( let key of Object.keys(config) ){
      switch(key){
        case 'hooks':
          this[key] = new ConnecterHooks(config[key]);
          break;
        default:
          this[key] = config[key];
      }
      
    }
  }
}

class Api{
  name: string;
  uri: string;
  moduleName?: string;
  alias?: string;
  needToken?: boolean;
  transform?: Function = data => data;
  before?: Function = config => config;
  constructor( child:ConnecterModuleChild ){
    for( let key of Object.keys(child) ){
      this[key] = child[key];
    }
  }
}

export class ApiList{
  list: Object;
  // [name:string]:Api;
  
  constructor( config:ConnecterConfig ){
    this.list = ApiList.generator(config)
  };
  static moduleModeInit( config ){
    let r = {};
    for ( let moduleName in config.modules ){
      for ( let api of config.modules[moduleName] ){
        r[`${moduleName}${config.connectChar}${api.name}`] = new Api(api);
        if (api.alias) {
          r[api.alias] = new Api(api);
        }
      }
    }
    return r
  }
  static simpleModeInit( config ){
    return {}
  }
  static generator(config:ConnecterConfig){
    if( !!config.modules && Object.keys(config.modules).length >= 0 ){
      config.mode = 'module';
    }else{
      config.mode = 'simple';
    }

    switch(config.mode){
      case 'module':
        return ApiList.moduleModeInit(config);
      case 'simple':
        return ApiList.simpleModeInit(config);
    }
  };
}
