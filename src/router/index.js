/* eslint-disable no-unused-vars */

import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决vue-cli和vue-router版本冲突问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}



const HomeLayout = () => import('../layout/HomeLayout.vue')
const AdminLayout = () => import('../layout/AdminLayout.vue')
const Login = () => import('../views/Login.vue')
const ErrorPage = () => import('../views/ErrorPage.vue')
const BookMall = () => import('../views/home/BookMall.vue')
const Cart = () => import('../views/home/Cart.vue')
const Order = () => import('../views/home/Order.vue')
const StationManagement = () => import('../views/admin/StationManagement.vue')
const TrainManagement = () => import('../views/admin/TrainManagement.vue')
const SalesStatistics = () => import('../views/admin/SalesStatistics')
const NoPermission = () => import('../views/NoPermission.vue')
const BookDetail = () => import('../views/home/BookDetail.vue')
const FileManagemment = () => import('../views/admin/FileManagement.vue')
const ApplyForStorage = () => import('../views/admin/ApplyForStorage')
const MyToDo = () => import('../views/admin/MyToDo')
const ApplicationRecord = () => import('../views/admin/ApplicationRecord')
const PickUpTask = () => import('../views/admin/PickUpTask')




Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      roles: ['admin', 'user']
    }
  },
  {
    name: 'no_permission',
    path: '/no_permission',
    component: NoPermission,
    meta: {
      roles: ['admin', 'user']
    }
  },
  {
    name: "home",
    path: '/home',
    redirect: '/home/train_ticket',
    component: HomeLayout,
    meta: {
      roles: ['admin', 'user', 'tourist']
    },
    children: [{
        name: 'train_ticket',
        path: 'train_ticket',
        meta: {
          roles: ['admin', 'user', 'tourist']
        },
        component: BookMall
      },
      {
        name: 'user_info',
        path: 'user_info',
        meta: {
          roles: ['admin', 'user']
        },
        component: Cart
      },
      {
        name: 'order',
        path: 'order',
        meta: {
          roles: ['admin', 'user']
        },
        component: Order
      },
      {
        name: 'book_detail',
        path: 'book_detail/:id',
        meta: {
          roles: ['admin', 'user']
        },
        component: BookDetail
      },
    ]
  },
  {
    name: "admin",
    path: '/admin',
    redirect: '/admin/station_management',
    component: AdminLayout,
    meta: {
      roles: ['admin', 'super_admin']
    },
    children: [{
        name: 'station_management',
        path: 'station_management',
        meta: {
          roles: ['admin', 'super_admin']
        },
        component: StationManagement
      }, {
        name: 'train_management',
        path: 'train_management',
        meta: {
          roles: ['admin', 'super_admin']
        },
        component: TrainManagement
      },
      {
        name: 'file_management',
        path: 'file_management',
        meta: {
          roles: ['admin', 'super_admin']
        },
        component: FileManagemment
      },
      {
        name: 'sales_statistics',
        path: 'sales_statistics',
        meta: {
          roles: ['admin', 'super_admin']
        },
        component: SalesStatistics
      },
      {
        name: 'apply_for_storage',
        path: 'apply_for_storage',
        meta: {
          roles: ['admin', 'super_admin']
        },
        component: ApplyForStorage
      },
      {
        name: 'my_to_do',
        path: 'my_to_do',
        meta: {
          roles: ['admin', 'super_admin']
        },
        component: MyToDo
      },
      {
        name: 'application_record',
        path: 'application_record',
        meta: {
          roles: ['admin', 'super_admin']
        },
        component: ApplicationRecord
      },
      {
        name: 'pickup_task',
        path: 'pickup_task',
        meta: {
          roles: ['admin', 'super_admin']
        },
        component: PickUpTask
      }
    ]
  },
  {
    name: 'not_found',
    path: '/404',
    component: ErrorPage,
    meta: {
      roles: ['admin', 'user']
    }
  },

]


const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('role')
  if (to.matched.length === 0) {
    // 匹配到错误路径
    from.name ? next({
        name: from.name
      }) :
      next({
        name: 'not_found'
      })
  } else {
    //  匹配到正确路径
    if (to.path === "/login" || to.path === "/home") {
      next()
    } else {
      if (to.meta.roles.includes(role)) {
        next()
      } else {
        if (to.path === '/no_permission') {
          next()
        } else {
          next({
            name: 'login'
          })
        }
      }
    }
  }

})

export default router
