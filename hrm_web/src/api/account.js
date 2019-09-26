import request from '../util/request'
import md5 from 'js-md5'

export function RegisterUser(data) {
  // for the fucking deepclone
  var data={
    account:data.account,
    password:md5(data.password),
    nickName:data.nickName
  }
  return request({
    method:'post',
    url:'/api/account',
    data
  })
  /*
  return{
    status:ok|error
    data:null|error msg
  }
   */
}

export function Login(data) {
  return request({
    method: 'get',
    url:'/api/login',
    params:{
      account: data.account,
      password: md5(data.password)
    }
  })
  // return{
  //   status:ok|error
  //   data:sessionId|error msg
  // }
}

export function GetUserInfo() {
  return request({
    method:'get',
    url:'/api/account'
  })
  // retun{
  //   status:ok|error
  //   data:{
  //     type:
  //       nickName
  //   }|error msg
  // }
}

export function ChangePassword(data) {
  var data={
    oldPassword:md5(data.oldPassword),
    newPassword:md5(data.newPassword),
    newPassword2:md5(data.newPassword2)
  }
  return request({
    method:'put',
    url:'/api/account',
    data
  })
  // return{
  //   status:ok|error
  //   data:null|error msg
  // }
}
