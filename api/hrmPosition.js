import request from '../util/request'

export function GetPosition(data) {
  return request({
    method:'get',
    url:'/api/position',
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

export function SearchPosition(data) {
  return request({
    method: 'get',
    url:'/api/position',
    params:{
      search:data.searchText,
      mode:'search'
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

export function UpdatePosition(data) {
  var data={
    positionName:data.positionName,
    positionDetail:data.positionDetail,
    positionId:data.positionId
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

export function CreateUser(data) {
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
