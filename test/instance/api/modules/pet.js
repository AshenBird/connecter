export default [
  {
    name: 'add',
    url: '/api/admin/add_pet',
    needToken: true,
    transform: pet => {
      let keys = new Set([
        'add_user_id',
        'owner_user_id',
        'name',
        'age',
        'health_info',
        'vaccination_status',
        'special_info',
        'more_info',
        'gender',
        'type',
        'status',
        'show_status',
        'attachment_id',
        'all_attachment',
        'all_labels'
      ])
      // 'add_user_id': '' ,     <nullable> <numeric> // 添加用户ID
      // 'owner_user_id': ''     <nullable> <numeric> // 主人用户ID (添加人ID和主人ID不传的话存储的就是当前用户的ID了)
      // 'name': ''              <required> <string>  // 宠物名字
      // 'age' : ''              <nullable> <string>  // 宠物年龄(可以填中文：不到1岁，2岁3个月等)
      // 'health_info': ''       <nullable> <string>  // 宠物健康状况
      // 'vaccination_status':'' <nullable> <string>  // 宠物疫苗状况
      // 'special_info':''       <nullable> <string>  // 宠物特殊领养情况
      // 'more_info':''          <nullable> <string>  // 宠物其他补充情况
      // 'gender': ''            <required> <enum>    // 宠物性别
      // 'type': ''              <required> <numeric> // 宠物类型(传输宠物类型ID)(2018.12.14修改)
      // 'status': ''            <required> <enum> // 宠物状态
      // 'show_status': ''       <nullable> <enum> // 宠物展示状态
      // 'attachment_id': ''     <nullable> <numeric> // 宠物的头像
      // 'all_attachment':       [1,2,3,4] // 关于宠物的多图照片
      // 'all_labels':           [1,2,3,4] // 宠物标签ID
      let r = {}
      for (const key in pet) {
        if (!keys.has(key)) continue
        if (!pet[key]) continue
        r[key] = pet[key]
      }
      return r
    }
  },
  {
    name: 'update',
    url: '/api/admin/update_pet',
    needToken: true,
    transform: pet => {
      const lawful_keys = new Set([
        'id',
        'owner_user_id',
        'name',
        'age',
        'health_info',
        'vaccination_status',
        'special_info',
        'more_info',
        'gender',
        'type',
        'status',
        'show_status',
        'attachment_id',
        'all_attachment',
        'all_labels'

        // 'id': '' ,              <required> <numeric> // 宠物ID
        // 'owner_user_id': ''     <nullable> <numeric> // 主人用户ID
        // 'name': ''              <nullable> <string>  // 宠物名字
        // 'age' : ''              <nullable> <string>  // 宠物年龄(可以填中文：不到1岁，2岁3个月等)
        // 'health_info': ''       <nullable> <string>  // 宠物健康状况
        // 'vaccination_status':'' <nullable> <string>  // 宠物疫苗状况
        // 'special_info':''       <nullable> <string>  // 宠物特殊领养情况
        // 'more_info':''          <nullable> <string>  // 宠物其他补充情况
        // 'gender': ''            <nullable> <enum>    // 宠物性别
        // 'type': ''              <nullable> <numeric> // 宠物类型 (传输宠物类型ID)(2018.12.14修改)
        // 'status': ''            <nullable> <enum> // 宠物状态
        // 'show_status': ''       <nullable> <enum> // 宠物展示状态
        // 'attachment_id': '' ,    <nullable> <numeric> // 附件ID
        // 'all_attachment':       [1,2,3,4] // 关于宠物的多图照片
        // 'all_labels':           [1,2,3,4] // 宠物标签ID
      ])
      let r = {}
      for (const key in pet) {
        if (!lawful_keys.has(key)) continue
        if (!pet[key]) continue
        r[key] = pet[key]
      }
      return r
    }
  },
  {
    name: 'info',
    url: '/api/admin/get_pet',
    transform: id => ({ id }),
    needToken: true
  },
  {
    name: 'list',
    url: '/api/admin/list_pet',
    needToken: true
  }
  // {
  //   name: 'to_adopt_list',
  //   url: '/api/admin/list_pet',
  //   needToken: true
  // }
]
