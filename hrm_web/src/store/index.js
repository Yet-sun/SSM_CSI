import Vue from 'vue'
import Vuex from 'vuex'
import {GetSession,SetSession,RemoveSession} from "../util/auth";

Vue.use(Vuex)
const state={
  sessionId:GetSession(),
  isLogOut:false,
  userType:2,
  nickName:'',
  hrmTabsValue:'/user',
  hrmTabs:[]
}

const mutations={
  SetHrmTabs:(state,title,name)=>{

  },
  SetSessionTemp:(state,sessionId)=>{
    state.sessionId=sessionId
    state.isLogOut=false
  },
  SetSession:(state,sessionId)=>{
    state.sessionId=sessionId
    SetSession(sessionId)
    state.isLogOut=false
  },
  LogOut:(state)=>{
    state.sessionId=null
    state.isLogOut=true
    RemoveSession()
  },
  SetUserInfo:(state,data)=>{
    state.userType=data.type
    state.nickName=data.nickName
  },
  AddTabs:(state,data)=>{
    let signal=true
    state.hrmTabs.forEach((tab,index)=>{
      if(tab.name==data.name){
        state.hrmTabsValue==data.name
        signal=false
        console.log("exist")
      }
    })
    if(signal){
      state.hrmTabs.push({
        title:data.title,
        name:data.name
      })
      console.log("not exist")
    }
  }
}

const actions={}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
