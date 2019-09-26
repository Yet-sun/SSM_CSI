<template>
  <div>
    <el-form style="width: 400px" :model="createForm" :rules="createFormRules" ref="createForm" label-width="100px">

      <el-form-item label="部门名称" prop="departmentName">
        <el-input v-model="createForm.departmentName"></el-input>
      </el-form-item>

      <el-form-item label="部门详情" prop="departmentDetail">
        <el-input v-model="createForm.departmentDetail"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="CreatUser('createForm')">立即创建</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {CreateDepartment} from "../api/hrmDepartment";

  export default {
        name: "HrmDepartmentEdit",
        data(){
            return{
                createForm:{
                    departmentName:'',
                    departmentDetail:'',
                },
                createFormRules:{
                    departmentName: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' }
                    ],
                    departmentDetail: [
                        { required: true, message: '请输入部门详情', trigger: 'blur' },
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
                        let temp={
                            'name':that.createForm.departmentName,
                            'detail':that.createForm.departmentDetail
                        }
                        CreateDepartment(temp).then(function (e) {
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
