import request from '../util/request'

export function GetStaff(data) {
  return request({
    method:'get',
    url:'/api/staff',
    params:{
      offset:data.offset,
      limit:data.limit,
      searchText:data.searchText
    }
  })
  /*
return{
    status:ok|error
    data:{
        users:[
            {
                id:
                name:
                sex:
                phone:
                mail:
                position:
                academic:
                department:
                address:
                createDate:
            }
            ...
        ]
        total:
    }|error msg
}
   */
}


export function UpdateStaff(data) {
  var data={
    // staff info include id
  }
  return request({
    method:'put',
    url:'/api/staff',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}

export function DeleteStaff(data) {
  // staff id list
  return request({
    method:'delete',
    url:'/api/staff',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}

export function CreateStaff(data) {
  // staff info except id dict
  return request({
    method:'post',
    url:'/api/staff',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}
