export default [
  {
    // 登录
    name: 'login',
    alias: 'Login',
    url: '/api/login'
  },
  {
    // 获取短信验证码
    name: 'send_verify_code',
    alias: 'VerifyCode',
    url: '/api/send_verify_code'
  },
  {
    // 修改密码
    name: 'update_password',
    alias: 'UpdatePassword',
    url: '/api/update_password',
    needToken: true
  },
  {
    // 获取地区信息
    name: 'get_zone',
    url: '/api/list_all_district',
    transform: type => ({ type }),
    needToken: true
  },
  {
    // 获取一级地区信息
    name: 'get_province',
    alias: 'GetProvince',
    url: '/api/list_all_district',
    transform: () => ({ type: 'province' })
  },
  {
    // 获取二级地区信息
    name: 'get_city',
    alias: 'GetCity',
    url: '/api/list_all_district',
    transform: () => ({ type: 'city' }),
    needToken: true
  },

  {
    // 获取三级地区信息
    name: 'get_area',
    alias: 'GetArea',
    url: '/api/list_all_district',
    transform: () => ({ type: 'area' }),
    needToken: true
  },
  {
    /**
     * @todo
     * 获取现存机构/待领养宠物地区列表
     */
    name: 'list_certified_district',
    url: '/api/list_certified_district',
    needToken: true
  }
]
