export default [
  {
    name: 'add',
    url: '/api/admin/add_user',
    needToken: true,
    transform: user => {
      let keys = new Set([
        'birthday',
        'name',
        'password',
        'email',
        'gender',
        'address',
        'nick_name',
        'mobile',
        'lat',
        'lng',
        'role',
        'status',
        'attachment_id',
        'real_name',
        'ID_num',
        'province',
        'city',
        'area',
        'cer_id'
      ])

      let r = {}
      for (const key in user) {
        if (!keys.has(key)) continue
        if (!user[key]) continue
        if (key === 'birthday') user[key] = Math.ceil(user[key] / 1000)
        r[key] = user[key]
      }
      return r
    }
  },
  {
    name: 'update',
    url: '/api/admin/update_user',
    needToken: true,
    transform: user => {
      const lawful_keys = new Set([
        'id',
        'name',
        'email',
        'nick_name',
        'attachment_id',
        'province',
        'city',
        'area',
        'address',
        'mobile',
        'lat',
        'lng',
        'role',
        'status',
        'real_name',
        'ID_num',
        'gender',
        'cer_id'
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
    url: '/api/admin/detail_user',
    transform: id => ({ id }),
    needToken: true
  },
  {
    name: 'list',
    url: '/api/admin/list_user',
    needToken: true
  },
  {
    alias: 'SelfInfo',
    name: 'self',
    url: '/api/admin/detail_user',
    transform: () => ({ id: 0 }),
    needToken: true
  }
]
