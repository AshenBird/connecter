class ConnecterHooks {
    constructor(hooks) {
        this.beforeEach = conf => { };
        this.afterEach = () => { };
        this.successEach = res => res;
        this.failEach = e => Promise.reject(e);
        this.hookNames = new Set([
            'beforeEach',
            'afterEach',
            'successEach',
            'failEach',
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
        this.key = 'api_token';
    }
}
class ConnecterModuleChild {
    constructor(child) {
        this.transform = data => data;
        this.before = config => config;
        for (let key of Object.keys(child)) {
            this[key] = child[key];
        }
    }
}
class ConnecterModules {
    constructor(modules) {
    }
}
export class ConnecterConfig {
    constructor(config) {
        this.baseURL = '/';
        this.timeout = 10000;
        this.vuePluginName = '$connect';
        this.connectChar = '-';
        this.mode = '';
        for (let key of Object.keys(config)) {
            switch (key) {
                case 'hooks':
                    this[key] = new ConnecterHooks(config[key]);
                    break;
                default:
                    this[key] = config[key];
            }
        }
    }
}
class Api {
    constructor(child) {
        this.transform = data => data;
        this.before = config => config;
        for (let key of Object.keys(child)) {
            this[key] = child[key];
        }
    }
}
export class ApiList {
    // [name:string]:Api;
    constructor(config) {
        this.list = ApiList.generator(config);
    }
    ;
    static moduleModeInit(config) {
        let r = {};
        for (let moduleName in config.modules) {
            for (let api of config.modules[moduleName]) {
                r[`${moduleName}${config.connectChar}${api.name}`] = new Api(api);
                if (api.alias) {
                    r[api.alias] = new Api(api);
                }
            }
        }
        return r;
    }
    static simpleModeInit(config) {
        return {};
    }
    static generator(config) {
        if (!!config.modules && Object.keys(config.modules).length >= 0) {
            config.mode = 'module';
        }
        else {
            config.mode = 'simple';
        }
        switch (config.mode) {
            case 'module':
                return ApiList.moduleModeInit(config);
            case 'simple':
                return ApiList.simpleModeInit(config);
        }
    }
    ;
}
//# sourceMappingURL=interface.js.map