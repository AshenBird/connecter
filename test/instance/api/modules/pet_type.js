export default [
  {
    name: 'update',
    url: '/api/pet_type/update',
    needToken: true
  },
  {
    name: 'list',
    url: '/api/admin/pet_type/list',
    transform: () => ({}),
    needToken: true
  }
]
