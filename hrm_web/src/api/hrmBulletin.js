import request from '../util/request'

export function GetBulletin(data) {
  return request({
    method:'get',
    url:'/api/bulletin',
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
                title:
                detail:
            }
            ...
        ]
        total:
    }|error msg
}
   */
}

export function UpdateBulletin(data) {
  var data={
    title:data.title,
    content:data.content,
    id:data.id
  }
  return request({
    method:'put',
    url:'/api/bulletin',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}

export function DeleteBulletin(data) {
  // bulletin id list
  return request({
    method:'delete',
    url:'/api/bulletin',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}

export function CreateBulletin(data) {
  // bulletin info except id dict
  return request({
    method:'post',
    url:'/api/bulletin',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}
