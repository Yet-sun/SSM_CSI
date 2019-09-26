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


      <el-table-column label="姓名" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="性别" width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.sex==1">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>

      <el-table-column label="手机号码" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.phone}}</span>
        </template>
      </el-table-column>

      <el-table-column label="邮箱" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.mail}}</span>
        </template>
      </el-table-column>

      <el-table-column label="职位" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.position}}</span>
        </template>
      </el-table-column>

      <el-table-column label="学历" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.academic}}</span>
        </template>
      </el-table-column>

      <el-table-column label="身份证号码" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.department}}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系地址" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.address}}</span>
        </template>
      </el-table-column>

      <el-table-column label="建档时间" width="130">
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

    <el-dialog title="员工信息修改" :visible.sync="editFormVisible">
      <el-form label-width="150px" :model="editForm" :rules="editRules" ref="editForm">

        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="cardId">
          <el-input v-model="editForm.cardId"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="editForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="editForm.position"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="academic">
          <el-input v-model="editForm.academic"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="editForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
          <el-input v-model="editForm.department"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input v-model="editForm.postCode"></el-input>
        </el-form-item>
        <el-form-item label="QQ号码" prop="qq">
          <el-input v-model="editForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" prop="party">
          <el-input v-model="editForm.party"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-input v-model="editForm.birthday"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="race">
          <el-input v-model="editForm.race"></el-input>
        </el-form-item>
        <el-form-item label="所学专业" prop="speciality">
          <el-input v-model="editForm.speciality"></el-input>
        </el-form-item>
        <el-form-item label="爱好" prop="hobby">
          <el-input v-model="editForm.hobby"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="editForm.remark"></el-input>
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
  import {GetStaff} from "../api/hrmStaff";

  export default {
        name: "HrmStaff",
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
                    id:'',
                    name:'',
                    sex:'',
                    phone:'',
                    mail:'',
                    position:'',
                    academic:'',
                    department:'',
                    address:''

                },
                editRules:{
                    id: [
                        { required: true, message: '请输入员工身份证', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入员工名称', trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: '请输入员工性别', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入员工号码', trigger: 'blur' },
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
                GetStaff(temp).then(function (e) {
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
                        UpdateBulletin(that.editForm).then(function (e) {
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
                            DeleteBulletin(tempArray).then(function (e) {
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
