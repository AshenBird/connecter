class ConnecterHooks {
    constructor(hooks) {
        this.beforeEach = conf => { };
        this.afterEach = () => { };
        this.successEach = res => res;
        this.failEach = e => Promise.reject(e);
        this.hookNames = new Set([
            "beforeEach",
            "afterEach",
            "successEach",
            "failEach"
        ]);
        for (let name in hooks) {
            if (this.hookNames.has(name)) {
                this[name] = hooks[name];
            }
        }
    }
}
class ConnecterToken {
    constructor(token) {
        this.key = "api_token";
        this.isCache = false;
        this.tokenNames = new Set(["getter", "key", "mode", "isCache"]);
        for (let name in token) {
            if (this.tokenNames.has(name)) {
                this[name] = token[name];
            }
        }
        if (this.isCache && this.getter instanceof Function) {
            this.getter = this.getter();
        }
    }
}
class ApiValidatItem {
}
class ApiValidat {
    constructor(validats) {
        for (const name in validats) {
            this.name = validats[name];
        }
    }
}
class Api {
    // validat?: ApiValidat
    constructor(child) {
        this.transform = data => data;
        this.before = config => config;
        this.after = res => res;
        this.extra = {};
        for (let key of Object.keys(child)) {
            this[key] = child[key];
        }
    }
}
class ConnecterModules {
    constructor(modules) { }
}
export class ConnecterConfig {
    constructor(config) {
        this.env = "vue";
        this.baseURL = "/";
        this.timeout = 10000;
        this.vuePluginName = "$connect";
        this.connectChar = "-";
        this.mode = "";
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
    // [name:string]: Api|Function;
    constructor(config) {
        this.list = this.generator(config);
    }
    // get [name](){
    //   return this.list[name]
    // }
    moduleModeInit(config) {
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
    simpleModeInit(config) {
        return {};
    }
    generator(config) {
        if (!!config.modules && Object.keys(config.modules).length >= 0) {
            config.mode = "module";
        }
        else {
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
//# sourceMappingURL=interface.js.map