<template>
  <div>
    <el-form style="width: 400px" :model="createForm" :rules="createFormRules" ref="createForm" label-width="100px">

      <el-form-item label="姓名" prop="name">
        <el-input v-model="createForm.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="cardId">
        <el-input v-model="createForm.cardId"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="createForm.sex"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input v-model="createForm.position"></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="academic">
        <el-input v-model="createForm.academic"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="createForm.mail"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="createForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="createForm.address"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="department">
        <el-input v-model="createForm.department"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码" prop="postCode">
        <el-input v-model="createForm.postCode"></el-input>
      </el-form-item>
      <el-form-item label="QQ号码" prop="qq">
        <el-input v-model="createForm.qq"></el-input>
      </el-form-item>
      <el-form-item label="政治面貌" prop="party">
        <el-input v-model="createForm.party"></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-input v-model="createForm.birthday"></el-input>
      </el-form-item>
      <el-form-item label="民族" prop="race">
        <el-input v-model="createForm.race"></el-input>
      </el-form-item>
      <el-form-item label="所学专业" prop="speciality">
        <el-input v-model="createForm.specialality"></el-input>
      </el-form-item>
      <el-form-item label="爱好" prop="hobby">
        <el-input v-model="createForm.hobby"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="createForm.remark"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="CreatUser('createForm')">立即创建</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {CreateStaff} from "../api/hrmStaff";

  export default {
        name: "HrmStaffEdit",
        data(){
            return{
                createForm:{
                    name:'test',
                    sex:'1',
                    phone:'16601169545',
                    mail:'123456789@qq.com',
                    position:'20190917191906803',
                    academic:'本科',
                    department:'20190917191906803',
                    address:'云南省昆明市呈贡区云南大学',
                    postCode:'12345',
                    cardId:'123456789038475612',
                    qq:'483286868',
                    party:'党员',
                    birthday:'19970101',
                    race:'汉',
                    specialality:'软件工程',
                    hobby:'绘画',
                    remark:'备注'
                },
                createFormRules:{
                    name: [
                        { required: true, message: '请输入员工姓名', trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: '请输入员工性别', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入员工手机', trigger: 'blur' },
                    ],
                    mail: [
                        { required: true, message: '请输入员工邮件', trigger: 'blur' },
                    ],
                    position: [
                        { required: true, message: '请输入员工职位', trigger: 'blur' },
                    ],
                    academic: [
                        { required: true, message: '请输入员工学历', trigger: 'blur' },
                    ],
                    department: [
                        { required: true, message: '请输入员工部门', trigger: 'blur' },
                    ],
                    address: [
                        { required: true, message: '请输入员工地址', trigger: 'blur' },
                    ],
                    postCode: [
                        { required: true, message: '请输入员工邮编', trigger: 'blur' },
                    ],
                    cardId: [
                        { required: true, message: '请输入员工身份证', trigger: 'blur' },
                    ],
                    qq: [
                        { required: true, message: '请输入员工QQ', trigger: 'blur' },
                    ],
                    party: [
                        { required: true, message: '请输入政治面貌', trigger: 'blur' },
                    ],
                    birthday: [
                        { required: true, message: '请输入员工生日', trigger: 'blur' },
                    ],
                    race: [
                        { required: true, message: '请输入员工民族', trigger: 'blur' },
                    ],
                    specialality: [
                        { required: true, message: '请输入特长', trigger: 'blur' },
                    ],
                    hobby: [
                        { required: true, message: '请输入兴趣爱好', trigger: 'blur' },
                    ],
                    remark: [
                        { required: true, message: '请输入备注', trigger: 'blur' },
                    ]
                }
            }
        },
        methods:{
            CreatUser(formName) {
                let that=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // creat item
                        // let temp={
                        //     id:that.createForm.id,
                        //     name:that.createForm.name,
                        //     sex:that.createForm.sex,
                        //     phone:that.createForm.phone,
                        //     mail:that.createForm.mail,
                        //     position:that.createForm.position,
                        //     academic:that.createForm.academic,
                        //     department:that.createForm.department,
                        //     address:that.createForm.address
                        // }
                        CreateStaff(that.createForm).then(function (e) {
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
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
