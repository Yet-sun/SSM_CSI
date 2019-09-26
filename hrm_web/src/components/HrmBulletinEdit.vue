<template>
  <div>
    <el-form style="width: 400px" :model="createForm" :rules="createFormRules" ref="createForm" label-width="100px">

      <el-form-item label="公告名称" prop="title">
        <el-input v-model="createForm.title"></el-input>
      </el-form-item>

      <el-form-item label="公告内容" prop="content">
        <el-input v-model="createForm.content"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="CreatUser('createForm')">立即创建</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {CreateBulletin} from "../api/hrmBulletin";

  export default {
        name: "HrmBulletinEdit",
        data(){
            return{
                createForm:{
                    title:'',
                    content:'',
                },
                createFormRules:{
                    title: [
                        { required: true, message: '请输入公告名称', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入公告内容', trigger: 'blur' },
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
                            'title':that.createForm.title,
                            'content':that.createForm.content
                        }
                        CreateBulletin(temp).then(function (e) {
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
