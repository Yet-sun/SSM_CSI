<template>
  <div>
    <el-form style="width: 400px" :model="userForm" :rules="userFormRules" ref="userForm" label-width="100px">

      <el-form-item label="登录名" prop="account">
        <el-input v-model="userForm.account"></el-input>
      </el-form-item>

      <el-form-item label="用户名" prop="nickName">
        <el-input v-model="userForm.nickName"></el-input>
      </el-form-item>

      <el-form-item label="账户类型" prop="type">
        <el-select v-model="userForm.type" placeholder="请选择活动区域">
          <el-option label="管理员" value="1"></el-option>
          <el-option label="普通用户" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="CreateUserClick('userForm')">立即创建</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {CreateUser} from "../api/hrmUser";

  export default {
        name: "HrmUserEdit",
        data(){
            return{
                userForm:{
                    account:'',
                    nickName:'',
                    type:'',
                    password:''
                },
                userFormRules:{
                    account: [
                        { required: true, message: '请输入登录名', trigger: 'blur' }
                    ],
                    nickName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    type:[
                        { required: true, message: '请选择账户类型', trigger: 'change' }
                    ],
                    password: [
                        { required: true, message: '请输入登陆密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            CreateUserClick(formName) {
                let that=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        CreateUser(that.userForm).then(function (e) {
                            if(e.status=='ok'){
                                that.$message({
                                    message:'创建成功',
                                    type:'success'
                                })
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
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
