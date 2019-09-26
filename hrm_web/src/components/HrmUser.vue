<template>
  <div>
    <el-form :inline="true" :model="userForm">
      <el-form-item label="搜索内容">
        <el-input v-model="userForm.account" placeholder="请输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="userForm.status" placeholder="请选择用户类型">
          <el-option v-for="item in userForm.options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="SearchButtonClick">搜索</el-button>
        <el-button type="danger" :disabled="deleteButtonDisable" @click="DeleteUserClick()">删除选中项</el-button>
      </el-form-item>
    </el-form>

    <!--    table-->
    <el-table
      ref="multipleTable"
      :data="userTable"
      height="400px"
      style="width: 100%"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column label="登录名" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.account}}</span>
        </template>
      </el-table-column>

      <el-table-column label="密码" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.password}}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户名" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="账户类型" width="100">
        <template slot-scope="scope">
          <el-tag size="medium" v-if="scope.row.type==2">普通用户</el-tag>
          <el-tag size="medium" v-if="scope.row.type==1">管理员</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.createDate}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 25]"
          :page-size="currentPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="用户信息修改" :visible.sync="editFormVisible">
      <el-form label-width="150px" :model="editForm" :rules="editRules" ref="editForm">
        <el-form-item label="登录名" prop="account">
          <el-input style="max-width: 300px" v-model="editForm.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="nickName">
          <el-input style="max-width: 300px" v-model="editForm.nickName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户类型" prop="type">
          <el-select  v-model="editForm.type" placeholder="请选择用户类型">
            <el-option v-for="item in editForm.options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditUser('editForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {GetUser,UpdateUser,DeleteUser} from "../api/hrmUser";

  export default {
        name: "HrmUser",
        data() {
            return {
                userForm: {
                    account: '',
                    status: '0',
                    options: [{
                        value: '0',
                        label: '全部'
                    }, {
                        value: '1',
                        label: '管理员'
                    }, {
                        value: '2',
                        label: '普通用户'
                    }]
                },
                isSearch:false,
                userTable: null,
                multipleSelection: [],
                totalPage:0,
                currentPage:1,
                currentPageSize:5,
                deleteButtonDisable:true,
                editFormVisible: false,
                editForm: {
                    userId:'',
                    account: '',
                    nickName:'',
                    type:'',
                    options: [{
                        value: '1',
                        label: '管理员'
                    }, {
                        value: '2',
                        label: '普通用户'
                    }]
                },
                editRules:{
                    account:[
                        { required: true, message: '请输入账户名称', trigger: 'blur' },
                    ],
                    nickName:[
                        { required: true, message: '请输入用户昵称', trigger: 'blur' },
                    ],
                    type:[
                        { required: true, message: '请选择用户类型', trigger: 'change' }
                    ]
                }
            }
        },
        methods:{
            UpdateTableData(){
                let that = this
                let temp
                if (that.isSearch) {
                    temp = {
                        'offset': this.currentPageSize * (this.currentPage - 1),
                        'limit': this.currentPageSize,
                        'searchText': this.userForm.account,
                        'type': this.userForm.status
                    }
                } else {
                    temp = {
                        'offset': this.currentPageSize * (this.currentPage - 1),
                        'limit': this.currentPageSize
                    }
                }
                GetUser(temp).then(function (e) {
                    if(e.status=='ok'){
                        if(e.data.users.length){
                            that.userTable = e.data.users
                            that.totalPage=e.data.total
                        }else {
                            that.$message({
                                message: "暂无匹配数据",
                                type: 'info'
                            })
                        }
                    }else {
                        that.$message({
                            message:e.data,
                            type:'error'
                        })
                    }
                }).catch(function (e) {
                    console.log(e)
                })
            },
            handleEdit(index, row) {
                this.editForm.account=row.account
                this.editForm.nickName=row.nickName
                this.editForm.userId=row.id
                this.editForm.type=null
                this.editFormVisible=true
            },
            handleSizeChange(val) {
                this.currentPageSize=val
                this.currentPage=1
                this.UpdateTableData()
            },
            handleCurrentChange(val) {
                this.currentPage=val
                this.UpdateTableData()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if(this.multipleSelection.length==0){
                    this.deleteButtonDisable=true
                }else {
                    this.deleteButtonDisable=false
                }
            },
            SearchButtonClick(){
                if(this.userForm.account){
                    this.isSearch=true
                    this.currentPage=1
                    this.UpdateTableData()
                }else {
                    this.isSearch=false
                    this.currentPage=1
                    this.UpdateTableData()
                }
            },
            EditUser(formName){
                let that=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        UpdateUser(that.editForm).then(function (e) {
                            if(e.status=='ok'){
                                that.$message({
                                    message:'修改成功',
                                    type:'success'
                                })
                                that.UpdateTableData()
                                that.editFormVisible=false
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
            },
            DeleteUserClick(){
                let that=this
                let tempArray=new Array()
                for(var i=0;i<this.multipleSelection.length;i++){
                    tempArray[i]=this.multipleSelection[i].id
                }
                that.$alert('是否删除选中的条目', '删除提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        if(action=='confirm'){
                            DeleteUser(tempArray).then(function (e) {
                                if(e.status=='ok'){
                                    that.$message({
                                        message:'删除成功',
                                        type:'success'
                                    })
                                    that.UpdateTableData()
                                }else {
                                    that.$message({
                                        message:e.data,
                                        type:'error'
                                    })
                                }
                            }).catch(function (e) {
                                console.log(e)
                            })
                        }
                    }
                });
            }
        },
        mounted() {
            this.UpdateTableData()
        }
    }
</script>

<style scoped>

</style>
