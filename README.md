# Connecter

一个基于axios的api模块化插件。由于一开始的目的仅是为了支持Vue中全局调用相应api，所以目前只支持Vue插件的注册。
不过可以通过调用相应的实例函数支持其他的框架或环境。
目前只针对http协议的接口进行了支持，未来准备准对websocket协议进行支持。
目前处于早期开发阶段，文档可用性较差，也无法保证文档能够跟随代码进行更新。

本项目采用 ES2015/ES6 标准，请自行 polyfill 。

a modular api npm package which base on axios.

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
    // api服务地址 默认为 '/'
    baseUri: 'api.example.com',

    // 连接模块名和接口名的连接符，连接后的字符串是访问api的名称，默认为中划线'-'
    connector: '_',

    // 挂载到vue全局插件的函数名称，默认值为'$connecter'
    vuePluginName: '$post',
    /**
     *  @todo
     *  @name mode
     *  @type <enum:simple|module>
     *  @default '"simple"||"module"'
     *  @description 用来标记api列表的生成模式,如果不填写该字段，将根据传入的其他字段，自动判定模式，如：传入了 modules 对象，将自动判定为module模式； 如果使用了该选项，将强制执行相应模式，对应的将忽略其他模式的配套参数，如：使用 simple 模式，将忽略 module 模式下需要用到的 modules 参数。
     */
    mode:'simple'

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
          before: id => ( {id} ) // <function> 访问前置钩子，传入参数是载荷参数，返回值将用于访问的实际载荷，通常用于访问数据的预处理
        },
        ...
      ],

      // 也可以是对象
      b: {
        // 对象模式下不需要name字段 对象名即为name
        example:{
          url: '/example',  // <string> <required>  api路径
          alia: 'Example',  // <string> 别名，用于快速访问
          needToken:  true, // <boolen> 该访问是否需要token，默认值为 false
          before: id => ( {id} ) // <function> 访问前置钩子，传入参数是载荷参数，返回值将用于访问的实际载荷，通常用于访问数据的预处理
        },
        ...
      }
    },

    // 基础的身份验证配置
    token: {
      mode: 'payload' // <enum:['payload','cookie']> 选择提交token的方式，默认为'payload'(暂时只支持payload模式)
      path: store.getters.token, // <function> <requied> 用于需要token的访问的token路径
      key: 'api_token' // <string> 用于提交时，token的键名，默认为'api_token'
    },

    // 全局钩子
    hooks: {
      /**
       * @todo 访问发起前的全局钩子
       */
      beforeEach: ()=>{},

      // 访问完成后的全局后置钩子
      afterEach: ()=>{},
    },

  }

```
