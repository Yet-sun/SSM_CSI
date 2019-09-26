<template>
  <div>
    <el-form style="width: 400px" :model="createForm" :rules="createFormRules" ref="createForm" label-width="100px">

      <el-form-item label="文件名称" prop="title">
        <el-input v-model="createForm.title"></el-input>
      </el-form-item>

      <el-form-item label="文件描述" prop="content">
        <el-input v-model="createForm.content"></el-input>
      </el-form-item>

      <el-upload style="margin-bottom: 10px"
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <el-form-item>
        <el-button type="primary" @click="CreatUser('createForm')">立即创建</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {CreateBulletin} from "../api/hrmBulletin";

  export default {
        name: "HrmFileEdit",
        data(){
            return{
                createForm:{
                    title:'',
                    content:'',
                },
                createFormRules:{
                    title: [
                        { required: true, message: '请输入文件名称', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入文件描述', trigger: 'blur' },
                    ]
                },
                fileList: []
            }
        },
        methods:{
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            CreatUser(formName) {
                this.$refs.upload.submit();
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
