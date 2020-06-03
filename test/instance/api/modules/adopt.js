export default [
  {
    name: 'info',
    url: '/api/adopt_order/get',
    transform: id => ({ id }),
    needToken: true
  },
  {
    name: 'list',
    url: '/api/admin/adopt_order/list',
    needToken: true
  },
  {
    name: 'add_log',
    url: '/api/admin/adopt_order/add_log',
    needToken: true
  }
]
