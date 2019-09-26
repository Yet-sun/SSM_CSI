<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col style="width: 400px;margin-top: 50px">
        <el-card>
          <div style="text-align: center">
            <h1>注册用户</h1>
          </div>

          <el-form :model="registerForm" :rules="registerRules" ref="registerForm" style="margin: 20px">
            <el-form-item prop="account">
              <el-input v-model="registerForm.account" placeholder="account">
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input v-model="registerForm.password" placeholder="password">
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="nickName">
              <el-input v-model="registerForm.nickName" placeholder="nick name">
                <i slot="prefix" class="el-input__icon el-icon-tickets"></i>
              </el-input>
            </el-form-item>


            <el-form-item style="margin-top: 20px;text-align: center">
              <el-row type="flex" justify="center">
                <el-col>
                  <el-button type="primary" @click="RegisterClick('registerForm')">注册</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {RegisterUser} from "../api/account";

  export default {
        name: "HrmRegister",
        data(){
            return{
                registerForm:{
                    account:'',
                    password:'',
                    nickName:''
                },
                registerRules:{
                    account:[
                        { required: true, message: '请输入账户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    nickName:[
                        { required: true, message: '请输入用户昵称', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ]
                },
            }
        },
        methods:{
            RegisterClick(formName){
                let that=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        RegisterUser(that.registerForm).then(function (e) {
                            if(e.status=='ok'){
                                that.$message({
                                    message:'注册成功',
                                    type:'success'
                                })
                                that.$router.push({path:'/login'})
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
