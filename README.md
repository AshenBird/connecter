# Connecter
一个基于axios的api模块化插件。由于一开始的目的仅是为了支持Vue中全局调用相应api，所以目前只支持Vue插件的注册。
不过可以通过调用相应的实例函数支持其他的框架或环境。
目前只针对http协议的接口进行了支持，未来准备准对websocket协议进行支持。
目前处于早期开发阶段，文档可用性较差，也无法保证文档能够跟随代码进行更新。

本项目采用 ES2015/ES6 标准，请自行 polyfill 。

a modular api npm package which base on axios.

<!-- TOC -->

- [Connecter](#connecter)
  - [usage 用法](#usage-%E7%94%A8%E6%B3%95)
    - [install 安装包](#install-%E5%AE%89%E8%A3%85%E5%8C%85)
    - [import & use 引入&初始化](#import--use-%E5%BC%95%E5%85%A5%E5%88%9D%E5%A7%8B%E5%8C%96)
      - [作为Vue插件](#%E4%BD%9C%E4%B8%BAvue%E6%8F%92%E4%BB%B6)
  - [Documentation 文档](#documentation-%E6%96%87%E6%A1%A3)
    - [config 配置项](#config-%E9%85%8D%E7%BD%AE%E9%A1%B9)
    - [模式](#%E6%A8%A1%E5%BC%8F)
      - [module mode](#module-mode)
      - [simple mode](#simple-mode)

<!-- /TOC -->

## usage 用法

### install 安装包

使用npm
```bash
npm i @mcswift/connecter -S
```

使用yarn
```bash
yarn add @mcswift/connecter
```

### import & use 引入&初始化

#### 作为Vue插件
``` javascript
import Vue from 'vue';
import Connecter from '@mcswift/connecter';

const connecter = new Connecter({
  // connecter config...
})

Vue.use( connecter );

const app = new Vue({
  // Vue option...
})

const payload = {
  // payload
}

async function connect(){
  await app.$connecter( 'moduleName-apiName',payload )
  .then( ( res )=>{
    // response handle
  })
  .catch( ( err )=>{
    // error handle
  })
}

```
## Documentation 文档

### config 配置项

```javascript

  config = {
    /**
     * @todo
     * @default 'vue'
     * @param <enum>: 'vue'|'browser'|'node'|'custom'
     * @description 主要用于实例的install的执行目标，install是用来挂载实例及相关函数的一个实例函数，以Vue环境为例，install函数将会把网络访问函数绑定至vue.prototype，作为全局插件使用（也是本包最开始的用途）
     */
    env: 'vue'
    // api服务地址 默认为 '/'
    baseUri: 'api.example.com',

    // 连接模块名和接口名的连接符，连接后的字符串是访问api的名称，默认为中划线'-'
    connector: '_',

    // 挂载到vue全局插件的函数名称，默认值为'$connecter'
    vuePluginName: '$post',

    // api 路径等选项
    modules:{
      
      /** 
       * @todo 可以是对象数组 
       */
      a: [
        {
          name: 'example',  // <string> <required> api名称
          url: '/example',  // <string> <required>  api路径
          alia: 'Example',  // <string> 别名，用于快速访问
          needToken:  true, // <boolen> 该访问是否需要token，默认值为 false
          transform: id => ( {id} ) // <function> 访问前置钩子，传入参数是载荷参数，返回值将用于访问的实际载荷，通常用于访问数据的预处理
        },
        ...
      ],

      // // 也可以是对象
      // b: {
      //   // 对象模式下不需要name字段 对象名即为name
      //   example:{
      //     url: '/example',  // <string> <required>  api路径
      //     alia: 'Example',  // <string> 别名，用于快速访问
      //     needToken:  true, // <boolen> 该访问是否需要token，默认值为 false
      //     before: id => ( {id} ) // <function> 访问前置钩子，传入参数是载荷参数，返回值将用于访问的实际载荷，通常用于访问数据的预处理
      //   },
      //   ...
      // }
    },

    // 基础的身份验证配置
    token: {
      mode: 'payload' // <enum:['payload','cookie']> 选择提交token的方式，默认为'payload'(暂时只支持payload模式)
      path: () => store.getters.token, // <function> <requied> 用于需要token的访问的token路径
      key: 'api_token', // <string> 用于提交时，token的键名，默认为'api_token'
      isCache: false // 是否缓存，避免每次访问都重新获取一次token
    },

    // 全局钩子
    hooks: {
      /**
       * @todo 访问发起前的全局钩子
       * @param conf: axios 配置对象，详情参阅axios文档
       * @default <function>: conf => {}
       */
      beforeEach: conf => {},

      // 访问完成后的全局后置钩子
      afterEach: () =>{},

      // 访问成功时的全局钩子
      successEach:  res => res,

      // 访问失败时的全局钩子
      failEach: e => Promise.reject(e)
    },

  }

```

已废弃配置

```javascript

config={
    /**
     *  @delete
     *  @name mode
     *  @type <enum:simple|module>
     *  @default '"simple"||"module"'
     *  @description 
     *  原： 用来标记api列表的生成模式,如果不填写该字段，将根据传入的其他字段，自动判定模式，如：传入了 modules 对象，将自动判定为module模式； 如果使用了该选项，将强制执行相应模式，对应的将忽略其他模式的配套参数，如：使用 simple 模式，将忽略 module 模式下需要用到的 modules 参数。
     *  现在：只会根据module参数是否存在判断
     */
    mode:'simple'//
    modules:{
    /**
     * 由于这一功能没有实际意义，暂时废弃这一功能
     */
      b: {
        // 对象模式下不需要name字段 对象名即为name
        example: {
          url: '/example', // <string> <required>  api路径
          alia: 'Example', // <string> 别名，用于快速访问
          needToken: true, // <boolen> 该访问是否需要token，默认值为 false
          before: id => ({ id }) // <function> 访问前置钩子，传入参数是载荷参数，返回值将用于访问的实际载荷，通常用于访问数据的预处理
        },
        //...
      }
    }
}

```

### 模式

目前支持两种模式，一种是 module 模式，另一种是 simple 模式。
根据是否存在 config.modules 是否存在进行判断，如果不存在则为simple模式；
```javascript
if( !!config.modules && Object.keys(config.modules).length >= 0 ){
  config.mode = 'module';
}else{
  config.mode = 'simple';
}
```
未来可能添加对于混合模式的支持，如果需要简短名称添加接口，可以通过 alias 属性添加

#### module mode

#### simple mode


