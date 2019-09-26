<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col style="width: 400px;margin-top: 50px">
        <el-card>
          <div style="text-align: center">
            <h1>CSI 员工之家</h1>
          </div>

          <el-form :model="loginForm" :rules="loginRules" ref="loginForm" style="margin: 20px">
            <el-form-item prop="account">
              <el-input v-model="loginForm.account" placeholder="account">
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="password">
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </el-form-item>

            <el-checkbox v-model="isAutoLogin">自动登录</el-checkbox>

            <el-form-item style="margin-top: 20px;text-align: center">
              <el-row type="flex" justify="space-between">
                <el-col>
                  <el-button type="primary" @click="LoginClick('loginForm')">登录</el-button>
                </el-col>
                <el-col>
                  <el-button type="primary" disabled>人脸登录</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>

          <div style="text-align: center">
            <router-link to="/register" style="font-size: 10px;color: dodgerblue">没有账号？点击注册</router-link>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {Login} from "../api/account";

  export default {
        name: "HrmLogin",
        data(){
            return{
                loginForm:{
                    account:'sss',
                    password:'aaa'
                },
                loginRules:{
                    account:[
                        { required: true, message: '请输入账户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ]
                },
                isAutoLogin:true
            }
        },
        methods:{
            LoginClick(formName){
                let that=this
                // local input check
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        Login(that.loginForm).then(function (e) {
                            if(e.status=='ok'){
                                if(that.isAutoLogin){
                                    that.$store.commit('SetSession',e.data)
                                }else {
                                    that.$store.commit('SetSessionTemp',e.data)
                                }
                                that.$router.push({path:'/user'})
                            }else {
                                that.$message({
                                    message:e.data,
                                    type:'error'
                                })
                            }
                        }).catch(function (e) {
                            console.log(e)
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
