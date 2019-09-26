<template>
  <div>
    <el-form style="width: 400px" :model="createForm" :rules="createFormRules" ref="createForm" label-width="100px">

      <el-form-item label="职位名称" prop="name">
        <el-input v-model="createForm.name"></el-input>
      </el-form-item>

      <el-form-item label="职位详情" prop="detail">
        <el-input v-model="createForm.detail"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="CreatUser('createForm')">立即创建</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {CreatePosition} from "../api/hrmPosition";

  export default {
        name: "HrmPositionEdit",
        data(){
            return{
                createForm:{
                    name:'',
                    detail:'',
                },
                createFormRules:{
                    name: [
                        { required: true, message: '请输入职位名称', trigger: 'blur' }
                    ],
                    detail: [
                        { required: true, message: '请输入职位详情', trigger: 'blur' },
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
                            'name':that.createForm.name,
                            'detail':that.createForm.detail
                        }
                        CreatePosition(temp).then(function (e) {
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
