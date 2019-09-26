import request from '../util/request'

export function GetDepartment(data) {
  return request({
    method:'get',
    url:'/api/department',
    params:{
      offset:data.offset,
      limit:data.limit,
      mode:'get'
    }
  })
  /*
return{
    status:ok|error
    data:{
        departments:[
            {
                id:
                name:
                detail:
            }
            ...
        ]
        total:
    }|error msg
}
   */
}

export function SearchDepartment(data) {
  return request({
    method: 'get',
    url: '/api/department',
    params:{
      search:data.searchText,
      mode: 'search'
    }
  })
  /*
return{
    status:ok|error
    data:[
        {
            id:
            name:
            detail:
        }
        ...
    ]|error msg
}
   */
}

export function UpdateDepartment(data) {
  var data={
    departmentName:data.departmentName,
    departmentDetail:data.departmentDetail,
    departmentId:data.departmentId
  }
  return request({
    method:'put',
    url:'/api/department',
    data
  })
  /*
 return{
    status:ok|error
    data:null|error msg
}
   */
}

export function DeleteDepartment(data) {
  // department id list
  return request({
    method:'delete',
    url:'/api/department',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}

export function CreateDepartment(data) {
  // department info except id dict
  return request({
    method:'post',
    url:'/api/department',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}
