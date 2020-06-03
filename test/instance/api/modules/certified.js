export default [
  {
    name: 'add',
    url: '/api/admin/certified/add',
    needToken: true,
    transform: user => {
      let keys = new Set([
        'api_token', //  <string> <required>登陆用户api_token
        'certified_name', //  <string> <required>机构名字
        'province', //  <required><numeric>机构省代码
        'city', //  <required><numeric>机构市代码
        'area', //  <required><numeric>机构区代码
        'address', //  <required><string> 机构具体地址
        'mobile', //  <numeric> <required>机构电话
        'contact_name', //  <string> <required>机构联系人姓名
        'certified_status', //  <string> <required>机构状态
        'brand_id', //  <string> <numeric> 机构图标(附件ID)
        'images' //  <string> <array>   机构介绍图(一组附件ID)
      ])

      let r = {}
      for (const key in user) {
        if (!keys.has(key)) continue
        if (!user[key]) continue
        r[key] = user[key]
      }
      return r
    }
  },
  {
    name: 'update',
    url: '/api/admin/certified/update',
    needToken: true,
    transform: user => {
      const lawful_keys = new Set([
        'api_token', //  <string> <required> 登陆用户api_token
        'certified_name', //  <string> <nullable> 机构名字
        'province', //  <required><numeric> 机构省代码
        'city', //  <required><numeric> 机构市代码
        'area', //  <required><numeric> 机构区代码
        'address', //  <required><string>  机构具体地址
        'mobile', //  <numeric><nullable> 机构电话
        'contact_name', //  <string> <nullable> 机构联系人姓名
        'certified_status', //  <string> <nullable> 机构状态
        'brand_id', //  <numeric><nullable> 机构图标(附件ID)
        'images' //  <array>  <nullable> 机构介绍图(一组附件ID)
      ])
      let r = {}
      for (const key in user) {
        if (!lawful_keys.has(key)) continue
        r[key] = user[key]
      }
      return r
    }
  },
  {
    name: 'info',
    url: '/api/certified/get',
    transform: certified_id => ({ certified_id }),
    needToken: true
  },
  {
    name: 'list',
    url: '/api/admin/certified/list',
    needToken: true
  }
]
