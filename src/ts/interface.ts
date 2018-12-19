class PosterHooks{
  beforeEach?:Function = ()=>{};
  afterEach?:Function = ()=>{};
  successEach?:Function = ()=>{};
  failEach?:Function = ()=>{};
  constructor( hooks ){
    
  }
}

class PosterToken{
  getter: Function;
  key?:string = 'api_token';
  mode?:string;
  constructor(token){}
}

class PosterModuleChild{
  name: string;
  uri: string;
  alias?: string;
  needToken?: boolean;
  transform?: Function = data => data;
  before?: Function = config => config;
  constructor( child:PosterModuleChild ){
    for( let key of Object.keys(child) ){
      this[key] = child[key];
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
  constructor( child:PosterModuleChild ){
    for( let key of Object.keys(child) ){
      this[key] = child[key];
    }
  }
}

export class ApiList{
  [name:string]:Api;
  constructor(config:ConnecterConfig){
    for ( let moduleName in config.modules ){
      for ( let api of config.modules[moduleName] ){
        this[`${moduleName}${config.connectChar}${api.name}`] = api;
        if (api.alias) {
          this[api.alias] = api;
        }
      }
    }
  }
}

class PosterModules{
  [name: string]: Array<PosterModuleChild>;
  constructor(modules){
  }
}

export class ConnecterConfig{
  baseURL?:string = '/';
  timeout?: number = 10000;
  vuePluginName?:string = '$connect';
  connectChar?:string = '-';
//  mode?:string = '';
//  headers?: HttpRequestHeader = new HttpRequestHeader();
  modules?: PosterModules;
  token?: PosterToken;
  hooks?: PosterHooks;
  constructor(config:ConnecterConfig){
    for( let key of Object.keys(config) ){
      this[key] = config[key];
    }
  }
}
