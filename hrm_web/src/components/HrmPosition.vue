<template>
  <div>
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="搜索内容">
        <el-input v-model="searchForm.text" placeholder="请输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="SearchButtonClick">搜索</el-button>
        <el-button type="danger" :disabled="deleteButtonDisable" @click="DeleteUserClick()">删除选中项</el-button>
      </el-form-item>
    </el-form>

    <!--    table-->
    <el-table
      ref="multipleTable"
      :data="tableData"
      height="300px"
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

      <el-table-column label="部门名称" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门详情" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.detail}}</span>
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

    <el-dialog title="部门信息修改" :visible.sync="editFormVisible">
      <el-form label-width="150px" :model="editForm" :rules="editRules" ref="editForm">
        <el-form-item label="部门名称" prop="name">
          <el-input style="max-width: 300px" v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门详情" prop="detail">
          <el-input style="max-width: 300px" v-model="editForm.detail" auto-complete="off"></el-input>
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
  import {GetPosition,UpdatePosition,DeletePosition} from "../api/hrmPosition";

  export default {
        name: "HrmPosition",
        data() {
            return {
                searchForm: {
                    text: ''
                },
                isSearch:false,
                tableData: null,
                multipleSelection: [],
                totalPage:0,
                currentPage:1,
                currentPageSize:5,
                deleteButtonDisable:true,
                editFormVisible: false,
                editForm: {
                    name:'',
                    detail:''
                },
                editRules:{
                    name:[
                        { required: true, message: '请输入职位名称', trigger: 'blur' },
                    ],
                    detail:[
                        { required: true, message: '请输入职位详情', trigger: 'blur' },
                    ]
                }
            }
        },
        methods:{
            UpdateTableData(){
                let that = this
                let temp
                console.log(this.isSearch)
                if (that.isSearch) {
                    temp = {
                        'offset': this.currentPageSize * (this.currentPage - 1),
                        'limit': this.currentPageSize,
                        'searchText': this.searchForm.text,
                    }
                    console.log(this.searchForm.text)
                } else {
                    temp = {
                        'offset': this.currentPageSize * (this.currentPage - 1),
                        'limit': this.currentPageSize
                    }
                }
                GetPosition(temp).then(function (e) {
                    if(e.status=='ok'){
                        if(e.data.datas.length){
                            that.tableData = e.data.datas
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
                this.editForm=row
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
                if(this.searchForm.text){
                    this.isSearch=true
                    this.currentPage=1
                    console.log(this.searchForm.text)
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
                        UpdatePosition(that.editForm).then(function (e) {
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
                            DeletePosition(tempArray).then(function (e) {
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
