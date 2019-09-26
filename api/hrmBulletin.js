import request from '../util/request'

export function GetBulletin(data) {
  return request({
    method:'get',
    url:'/api/bulletin',
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

export function SearchBulletin(data) {
  return request({
    method: 'get',
    url: '/api/bulletin',
    params:{
      search:data.searchText,
      mode:'search'
    }
  })
}

export function UpdateBulletin(data) {
  var data={
    buletinTitle:data.buletinTitle,
    bulletinDetail:data.bulletinDetail,
    bulletinId:data.bulletinId
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

export function CreateBulletin() {
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
