import Vue from 'vue'
import VueRouter from 'vue-router'

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',  // 登录
    component: () => import('@/views/login'),
    meta: {
      roles: [],
    },
  }, {
    path: '/',
    name: 'Layout',
    redirect: '/articleManage',
    component: () => import('views/layout'),
    meta: {
      roles: [],
    },
    children: [
      {
        path: 'articleManage',
        component: () => import('views/article'),
        meta: {
          roles: ['master'],
        },
        children: [
          {
            path: '/',
            name: 'ArticleManage', // 文章管理
            component: () => import('@/views/article/manage'),
            meta: {
              roles: ['master'],
              breadcrumb: '文章管理'
            }
          }, {
            path: 'articleEdit/:id',
            name: 'ArticleEdit', // 文章编辑
            component: () => import('@/views/article/edit'),
            meta: {
              roles: ['master'],
              breadcrumb: '文章管理'
            }
          }, {
            path: 'groupManage',
            name: 'GroupManage', // 文章分组
            component: () => import('@/views/article/group'),
            meta: {
              roles: ['master'],
              breadcrumb: '文章管理'
            }
          }
        ]
      }, {
        path: 'customerIntention',
        component: () => import('views/customer'),
        meta: {
          roles: ['master'],
        },
        children: [
          {
            path: '/',
            name: 'CustomerIntention', // 客户意向
            component: () => import('@/views/customer/intention'),
            meta: {
              roles: ['master'],
              breadcrumb: '客户意向'
            }
          }
        ]
      }, {
        path: 'storeManage',
        component: () => import('views/store'),
        meta: {
          roles: ['master'],
        },
        children: [
          {
            path: '/',
            name: 'StoreManage', // 门店管理
            component: () => import('@/views/store/manage'),
            meta: {
              roles: ['master'],
              breadcrumb: '门店管理'
            }
          }, {
            path: 'storeEdit',
            name: 'StoreEdit', // 编辑门店
            component: () => import('@/views/store/edit'),
            meta: {
              roles: ['master'],
              breadcrumb: '门店管理'
            }
          }
        ]
      }, {
        path: 'bannerManage',
        component: () => import('views/banner'),
        meta: {
          roles: ['master'],
        },
        children: [
          {
            path: '/',
            name: 'BannerManage', // 轮播管理
            component: () => import('@/views/banner/manage'),
            meta: {
              roles: ['master'],
              breadcrumb: '轮播管理'
            }
          }, {
            path: 'bannerEdit',
            name: 'BannerEdit', // 轮播编辑
            component: () => import('@/views/banner/edit'),
            meta: {
              roles: ['master'],
              breadcrumb: '轮播管理'
            }
          }
        ]
      }, {
        path: 'setting', // 设置
        component: () => import('@/views/setting'),
        meta: {
          roles: ['master'],
        },
        children: [
          {
            path: '/',
            name: 'JoinDialogSetting', // 加盟弹窗设置
            component: () => import('@/views/setting/join_dialog_setting'),
            meta: {
              roles: ['master'],
              breadcrumb: '设置'
            }
          }
        ]
      }
    ]
  }, {
    path: "/404",
    name: "notFound",
    component: () => import('@/views/error/404.vue')
  }, {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404"
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
