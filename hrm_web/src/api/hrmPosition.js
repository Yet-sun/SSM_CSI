import request from '../util/request'

export function GetPosition(data) {
  return request({
    method:'get',
    url:'/api/position',
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
                detail:
            }
            ...
        ]
        total:
    }|error msg
}
   */
}

export function UpdatePosition(data) {
  var data={
    name:data.name,
    detail:data.detail,
    id:data.id
  }
  return request({
    method:'put',
    url:'/api/position',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}

export function DeletePosition(data) {
  // position id list
  return request({
    method:'delete',
    url:'/api/position',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}

export function CreatePosition(data) {
  // position info except id dict
  return request({
    method:'post',
    url:'/api/position',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}
