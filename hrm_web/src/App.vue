<template>
  <div>
    <div v-if="isLogin">
      <el-container>
        <el-header>
          <HrmHeader/>
        </el-header>
        <el-container>
          <el-aside style="max-width: 200px">
            <HrmAside/>
          </el-aside>
          <el-main>
<!--            <HrmTabs/>-->
<!--            <el-card>-->
              <router-view/>
<!--            </el-card>-->
          </el-main>
        </el-container>
      </el-container>
    </div>
    <div v-else>
      <router-view/>
    </div>
  </div>
</template>
<script>
    import HrmHeader from "./components/HrmHeader";
    import HrmAside from "./components/HrmAside";
    import HrmTabs from "./components/HrmTabs";
    import {GetUserInfo} from "./api/account";

    export default {
        name: 'App',
        components: {HrmTabs, HrmAside, HrmHeader},
        data(){
            return{
                isLogin: false
            }
        },
        mounted() {
            let that =this
            if(that.$store.state.sessionId){
                GetUserInfo().then(function (e) {
                    if(e.status=='ok'){
                        // store user info
                        that.$store.commit('SetUserInfo',e.data)
                        that.isLogin=true
                        that.$router.push({path:'/user'})
                    }else {
                        that.$router.push({path:'/login'})
                    }
                }).catch(function (e) {
                    console.log(e)
                })
            }else {
                that.$router.push({path:'/login'})
            }
        },
        updated() {
            let that=this
            if(that.$store.state.sessionId&&!that.isLogin){
                GetUserInfo().then(function (e) {
                    if(e.status=='ok'){
                        // store user info
                        that.$store.commit('SetUserInfo',e.data)
                        that.isLogin=true
                        that.$router.push({path:'/user'})
                    }else {
                        that.$router.push({path:'/login'})
                    }
                }).catch(function (e) {
                    console.log(e)
                })
            }else {
                console.log("i don't know do what")
            }
            if(that.$store.state.isLogOut){
                that.isLogin=false
            }
        }
    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
