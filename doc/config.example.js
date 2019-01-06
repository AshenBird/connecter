let config = {
  /**
   * @todo
   * @default 'vue'
   * @param <enum>: 'vue'|'browser'|'node'|'custom'
   * @description 主要用于实例的install的执行目标，install是用来挂载实例及相关函数的一个实例函数，以Vue环境为例，install函数将会把网络访问函数绑定至vue.prototype，作为全局插件使用（也是本包最开始的用途）
   */
  env: 'vue',

  /**
   * api服务地址
   * @type string
   * @default '/'
   */
  baseUri: 'api.example.com',

  /**
   * @type string
   * @default '-'
   * 连接模块名和接口名的连接符，连接后的字符串是访问api的名称，默认为中划线'-'
   */
  connector: '_',

  /**
   * @description 挂载到vue全局插件的函数名称
   * @default '$connecter'
   */
  vuePluginName: '$post',

  /**
   * @description api 路径等选项
   */
  modules: {
    /** 
     *  可以是对象数组 
     */
    a: [{
        name: 'example', // <string> <required> api名称
        url: '/example', // <string> <required>  api路径
        alia: 'Example', // <string> 别名，用于快速访问
        needToken: true, // <boolen> 该访问是否需要token，默认值为 false
        transform: id => ({ id }) // <function> 访问前置钩子，传入参数是载荷参数，返回值将用于访问的实际载荷，通常用于访问数据的预处理
      },
      //...
    ],
  },

  // 基础的身份验证配置
  token: {
    /**
     * @todo
     * <enum:['payload','cookie']> 选择提交token的方式，默认为'payload'(暂时只支持payload模式)
     */
    mode: 'payload',

    /**
     * @type Function|string
     * @required
     * @description 用于需要token的访问的token路径
     */
    path: () => store.getters.token,

    /**
     * @type string
     * @description 用于提交时，token的键名，默认为'api_token'
     */
    key: 'api_token', 

    /**
     * @description 是否缓存，避免每次访问都重新获取一次token
     */
    isCache: false
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
    afterEach: () => {},

    // 访问成功时的全局钩子
    successEach: res => res,

    // 访问失败时的全局钩子
    failEach: e => Promise.reject(e)
  },

}