<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col>
<!--        <el-image src="https://www.baidu.com/img/baidu_jgylogo3.gif" fit="cover"></el-image>-->
        <p style="font-size: 20px;font-weight: bold">CSI员工之家</p>
      </el-col>
      <el-col>
        <p>欢迎使用: {{nickName}}</p>
      </el-col>
      <el-col style="text-align: right">
        <el-dropdown trigger="click">
          <el-image src="https://i2.hdslb.com/bfs/face/eb700365433f923cd3f73666873a95e2cbfc0d08.jpg@72w_72h.webp" style="width: 60px; height: 60px" fit="cover"></el-image>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="passwordFormVisible = true">修改密码</el-dropdown-item>
            <el-dropdown-item disabled>人脸注册</el-dropdown-item>
            <el-dropdown-item @click.native="LogOut()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

<!--    form-->
    <el-dialog title="修改密码" :visible.sync="passwordFormVisible">
      <el-form label-width="150px" :model="passwordForm" :rules="passwordRules" ref="passwordForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input style="max-width: 300px" v-model="passwordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input style="max-width: 300px" v-model="passwordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword2">
          <el-input style="max-width: 300px" v-model="passwordForm.newPassword2"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AlterPassword('passwordForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {ChangePassword} from "../api/account";

  export default {
        name: "HrmHeader",
        data(){
            var validatePass = (rule, value, callback) => {
                if (value !== this.passwordForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                nickName:this.$store.state.nickName,
                passwordFormVisible: false,
                passwordForm: {
                    oldPassword:'',
                    newPassword:'',
                    newPassword2:'',
                },
                passwordRules:{
                    oldPassword: [
                        { required: true, message: '请输入旧密码', trigger: 'blur' },
                    ],
                    newPassword: [
                        { required: true, message: '请输入新密码', trigger: 'blur' }
                    ],
                    newPassword2: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        {validator: validatePass, trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            AlterPassword(formName){
                let that=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        ChangePassword(that.passwordForm).then(function (e) {
                            if(e.status=='ok'){
                                that.$message({
                                    message:'修改成功',
                                    type:'success'
                                })
                                that.passwordFormVisible=false
                                // may route to login page
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
                })
            },
            LogOut(){
                this.$store.commit('LogOut')
                this.$router.push({path:'/login'})
            }
        }
    }
</script>

<style scoped>

</style>
