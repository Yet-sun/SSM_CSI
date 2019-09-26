import request from '../util/request'

// only file info api no download
export function GetFile(data) {
  return request({
    method:'get',
    url:'/api/file',
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

export function SearchFile(data){
  return request({
    method: 'get',
    url:'/api/file',
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

export function UpdateFile(data) {
  var data={
    fileName:data.fileName,
    fileDetail:data.fileDetail,
    fileId:data.fileId
  }
  return request({
    method:'put',
    url:'/api/file',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}

export function DeleteFile(data) {
  // file id list
  return request({
    method:'delete',
    url:'/api/file',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}

export function CreateFile(data) {
  // file info except id dict
  return request({
    method:'post',
    url:'/api/file',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}
