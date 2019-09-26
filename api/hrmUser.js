import request from '../util/request'
import md5 from 'js-md5'

export function GetUsers(data) {
  return request({
    method:'get',
    url:'/api/user',
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
                account:
                password:
                nickName:
                type:
                createDate:
            }
            ...
        ]
        total:
    }|error msg
}
   */
}

export function SearchUser(data) {
  return request({
    method:'get',
    url:'/api/user',
    params:{
      search:data.search,
      type:data.type,
      mode:'search'
    }
  })
  /*
return{
    status:ok|error
    data:[
        {
            id:
            account:
            password:
            nickName:
            type:
            createDate:
        }
        ...
    ]|error msg
}
   */
}

export function UpdateUser(data) {
  var data={
    account:data.account,
    nickName:data.nickName,
    type:data.type,
    userId:data.userId
  }
  return request({
    method: 'put',
    url:'/api/user',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}

export function DeleteUser(data) {
  // user id list
  return request({
    method:'delete',
    url:'/api/user',
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
  var data={
    account: data.account,
    password:md5(data.password),
    nickName:data.nickName,
    type:data.type
  }
  return request({
    method:'post',
    url:'/api/user',
    data
  })
  /*
return{
    status:ok|error
    data:null|error msg
}
   */
}
