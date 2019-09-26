import Vue from 'vue'
import Router from 'vue-router'
import HrmLogin from "../components/HrmLogin";
import HrmRegister from "../components/HrmRegister";
import HrmUser from "../components/HrmUser";
import HrmUserEdit from "../components/HrmUserEdit";
import HrmDepartment from "../components/HrmDepartment";
import HrmDepartmentEdit from "../components/HrmDepartmentEdit";
import HrmPosition from "../components/HrmPosition";
import HrmPositionEdit from "../components/HrmPositionEdit";
import HrmStaff from "../components/HrmStaff";
import HrmStaffEdit from "../components/HrmStaffEdit";
import HrmBulletin from "../components/HrmBulletin";
import HrmBulletinEdit from "../components/HrmBulletinEdit";
import HrmFile from "../components/HrmFile";
import HrmFileEdit from "../components/HrmFileEdit";

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'HrmLogin',
      component: HrmLogin
    },
    {
      path: '/register',
      name: 'HrmRegister',
      component: HrmRegister
    },
    {
      path: '/user',
      name:'HrmUser',
      component:HrmUser
    },
    {
      path: '/useredit',
      name:'HrmUserEdit',
      component:HrmUserEdit
    },
    {
      path:'/department',
      name:'HrmDepartment',
      component:HrmDepartment
    },
    {
      path:'/departmentedit',
      name:'HrmDepartmentEdit',
      component:HrmDepartmentEdit
    },
    {
      path: '/position',
      name:'HrmPosition',
      component:HrmPosition
    },
    {
      path:'/positionedit',
      name:'HrmPositionEdit',
      component:HrmPositionEdit
    },
    {
      path:'/staff',
      name:'HrmStaff',
      component:HrmStaff
    },
    {
      path:'/staffedit',
      name:'HrmStaff',
      component:HrmStaffEdit
    },
    {
      path:'/bulletin',
      name:'HrmBulletin',
      component:HrmBulletin
    },
    {
      path:'/bulletinedit',
      name:'HrmBulletinEdit',
      component:HrmBulletinEdit
    },
    {
      path:'/file',
      name:'HrmFile',
      component:HrmFile
    },
    {
      path: '/fileedit',
      name:'HrmFileEdit',
      component:HrmFileEdit
    }
  ]
})
