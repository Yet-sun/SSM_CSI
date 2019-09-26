import Axios from "axios";
import store from '../store/index'

const service=Axios.create({
  baseURL:'http://127.0.0.1:2333'
})

service.interceptors.request.use(
  config=>{
    if(store.state.sessionId){
      config.headers['X-SessionId']=store.state.sessionId
    }
    return config
  },
  error=>{
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response=>{
    if(response.status==200){
      return response.data
    }else {
      return new Promise.reject(response)
    }
  },
  error=>{
    console.log(error)
    return new Promise.reject(error)
  }
)

export default service
