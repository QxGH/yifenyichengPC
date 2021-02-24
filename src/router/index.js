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
            path: 'editStore',
            name: 'EditStore', // 编辑门店
            component: () => import('@/views/store/edit'),
            meta: {
              roles: ['master'],
              breadcrumb: '门店管理'
            }
          }
        ]
      }, {
        path: 'setting', // 平台设置
        component: () => import('@/views/setting/index'),
        meta: {
          roles: ['master'],
        },
        children: [
          {
            path: '/',
            name: 'PlatformSetting',  // 平台设置 - 平台设置
            component: () => import('@/views/setting/platform_setting'),
            meta: {
              roles: ['master'],
              breadcrumb: '平台设置'
            }
          }, {
            path: 'certification',
            name: 'Certification',  // 平台设置 - 个人设置 \ 企业设置
            component: () => import('@/views/setting/certification'),
            meta: {
              roles: ['master'],
              parentRouter: '/setting/',
              breadcrumb: '平台设置'
            }
          }, {
            path: 'certificationDetails',
            name: 'CertificationDetails',  // 平台设置 - 个人详情
            component: () => import('@/views/setting/certification_details'),
            meta: {
              roles: ['master'],
              parentRouter: '/setting/',
              breadcrumb: '平台设置'
            }
          }, {
            path: 'shopManage',
            name: 'ShopManage',  // 平台设置 - 门店管理
            component: () => import('@/views/setting/shop_manage'),
            meta: {
              roles: ['master'],
              breadcrumb: '门店管理'
            }
          }, {
            path: 'createShop/:shopID',
            name: 'CreateShop',  // 平台设置 - 创建门店
            component: () => import('@/views/setting/create_shop'),
            meta: {
              roles: ['master'],
              parentRouter: '/setting/shopManage',
              breadcrumb: '门店管理'
            }
          }, {
            path: 'shopSetting',
            name: 'ShopSetting',  // 平台设置 - 门店设置
            component: () => import('@/views/setting/shop_setting'),
            meta: {
              roles: ['master'],
              parentRouter: '/setting/shopSetting',
              breadcrumb: '门店设置'
            }
          }, {
            path: 'shopUser/:shopID',
            name: 'ShopUser',  // 平台设置 - 门店核销员管理
            component: () => import('@/views/setting/shop_user'),
            meta: {
              roles: ['master'],
              parentRouter: '/setting/shopManage',
              breadcrumb: '门店管理'
            }
          }, {
            path: 'editShopUser/:shopID/:userId/:prevPage',
            name: 'EditShopUser',  // 平台设置 - 门店核销员编辑
            component: () => import('@/views/setting/edit_shop_user'),
            meta: {
              roles: ['master'],
              parentRouter: '/setting/shopManage',
              breadcrumb: '门店管理'
            }
          }, {
            path: 'appManage',
            name: 'AppManage',  // 平台设置 - 应用管理
            component: () => import('@/views/setting/app_manage/'),
            meta: {
              roles: ['master'],
              breadcrumb: '应用管理'
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
