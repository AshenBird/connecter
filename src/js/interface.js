class PosterHooks {
    constructor(hooks) {
        this.beforeEach = () => { };
        this.afterEach = () => { };
        this.successEach = () => { };
        this.failEach = () => { };
    }
}
class PosterToken {
    constructor(token) {
        this.key = 'api_token';
    }
}
class PosterModuleChild {
    constructor(child) {
        this.transform = data => data;
        this.before = config => config;
        for (let key of Object.keys(child)) {
            this[key] = child[key];
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
    constructor(config) {
        for (let moduleName in config.modules) {
            for (let api of config.modules[moduleName]) {
                this[`${moduleName}${config.connectChar}${api.name}`] = api;
                if (api.alias) {
                    this[api.alias] = api;
                }
            }
        }
    }
}
class PosterModules {
    constructor(modules) {
    }
}
export class ConnecterConfig {
    constructor(config) {
        this.baseURL = '/';
        this.timeout = 10000;
        this.vuePluginName = '$connect';
        this.connectChar = '-';
        for (let key of Object.keys(config)) {
            this[key] = config[key];
        }
    }
}
//# sourceMappingURL=interface.js.map