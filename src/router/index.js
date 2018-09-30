import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from "nprogress" //添加进度条插件
import "nprogress/nprogress.css" 

Vue.use(Router)

const components = {
  login:()=>import("../views/login/login"),
  layout:()=>import("../views/layout/layout"),
  index:()=>import("../views/index/index"),
  users:()=>import("../views/users/index"),
  category:()=>import("../views/category/index"),
  bookList: () =>import("../views/bookList/bookList"),
  addBook: () =>import("../views/bookList/addBook"),
  editBook: () =>import("../views/bookList/editBook"),
  addAdmin: () =>import("../views/admin/addAdmin"),
  editCategory: () =>import("../views/category/editCategory"),
  addCategory: () =>import("../views/category/addCategory"),
  userEdit: () =>import("../views/users/userEdit"),
  swiperList: () =>import("../views/swiper/index"),
  addSwiper: () =>import("../views/swiper/addSwiper"),
  swipeDetail: () => import("../views/swiper/swipeDetail"),
  editSwiper: () => import("../views/swiper/editSwiper")
}
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'login',
      component: components.login,
      meta:{
        title:"登录"
      }
    },
    {
      path: "/layout",
      component:components.layout,
      redirect: "layout/index",
      meta:{
        title:"首页" 
      },
      children:[
        {
          path: "index",
          component: components.index
        },
        {
          path: "users",
          component: components.users,
          meta:{
            title:"用户管理页"
        }
        },
        {
          path: "category",
          component: components.category,
          meta:{
            title:"分类管理页"
              }     
        }, 
        {
          path: "category/editCategory",
          name: "editCategory",
          component: components.editCategory,
          meta: {
            title: "编辑分类"
          }
        },
        {
          path:"bookList",
          component:components.bookList,
          meta: {
            title: "图书列表"
          }
        },
        {
          path: "bookList/editBook",
          name: "editBook",
          component: components.editBook,
          meta: {
            title: "编辑图书"
          }
        },
        {
          path: "addBook",
          component: components.addBook,
          meta: {
            title: "添加图书"
          }
        },
        
        {
          path: "addAdmin",
          name: "addAdmin",
          component: components.addAdmin,
          meta: {
            title: "添加管理员"
          }
        },
        {
          path: "userEdit",
          name: "userEdit",
          component: components.userEdit,
          meta: {
            title: "修改个人信息"
          }
        },
        {
          path: "category/addCategory",
          name: "addCategory",
          component: components.addCategory,
          meta: {
            title: "添加分类"
          }
        },
        {
          path: "swiperList",
          name: "swiperList",
          component: components.swiperList,
          meta: {
            title: "轮播图列表"
          }
        },
          {
            path: "swiperList/addSwiper",
            name: "addSwiper",
            component: components.addSwiper,
            meta: {
              title: "添加轮播图"
            }
          },
          {
            path: "swiperList/swipeDetail",
            name: "swipeDetail",
            component: components.swipeDetail,
            meta: {
              title: "轮播图详情"
            }
          },
          {
            path: "swiperList/editSwiper",
            name: "editSwiper",
            component: components.editSwiper,
            meta: {
              title: "修改轮播图"
            }
          },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  Nprogress.start()  
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
router.afterEach((to, from) => {
  Nprogress.done()
})
export default router