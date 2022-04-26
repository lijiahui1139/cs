import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
import AppMain from '@/views/layout/components/AppMain'

export const constantRouterMap = [{
  path: '/',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    components: {
      default: () => import('@/views/dashboard/index')
    },
    name: 'dashboard',
    meta: {
      title: 'router.dashboard',//首页
      icon: 'icon-shouye',
      affix: false
    }
  }]
},
{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  meta: {
    title: '登录',
    icon: 'dashboard',
    affix: false
  },
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/errorPage/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/errorPage/401'),
  hidden: true
}
]

export const asyncRouterMap = [{
  path: '/userManagement',
  component: Layout,
  redirect: 'noredirect',
  name: 'userManagement',
  meta: {
    title: "router.userManagement",// 用户管理
  },
  children: [{
    path: 'userData',
    component: () => import('@/views/userManagement/userData'),
    name: 'userData',
    meta: {
      // title: '用户管理',
      title: 'router.userManagement',// 用户管理
      noCache: true,
      icon: 'icon-zhanghaoguanli',
      perms: ['POST /admin/user/stat', 'POST /admin/user/detail', 'POST /admin/user/update', 'POST /admin/user/delete', 'POST /admin/user/list', 'POST /admin/user/verify', 'POST /admin/user/enable', 'POST /admin/user/disable'],
    }
  }],
},
{
  path: '/category',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: 'category',
    components: {
      default: () => import('@/views/category/list')
    },
    name: 'category',
    meta: {
      title: 'router.sortManagement',// 分类管理
      icon: 'icon-peizhiguanli',
      affix: false,
      perms: ['POST /admin/category/update', 'POST /admin/category/delete', 'POST /admin/category/create', 'POST /admin/category/list'],
    }
  }]
},
{
  path: '/paytoken',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: 'paytoken',
    components: {
      default: () => import('@/views/paytoken/list')
    },
    name: 'paytoken',
    meta: {
      title: 'router.paytoken',// 币种管理
      icon: 'icon-bizhongguanli',
      affix: false,
      perms: ['POST /admin/paytoken/list', 'POST /admin/paytoken/save', 'POST /admin/paytoken/update', 'POST /admin/paytoken/enable', 'POST /admin/paytoken/disable'],
    }
  }]
},

{
  path: '/nft',
  component: Layout,
  redirect: 'noredirect',
  // alwaysShow: true,
  name: 'nftManagement',
  meta: {
    title: 'router.nftManagement',// NFT管理
    icon: 'icon-Subtract',
  },
  children: [{
    path: '/list',
    component: () => import('@/views/nft/list'),
    name: 'nftList',
    meta: {
      title: 'router.nftManagement',// NFT管理
      noCache: true,
      perms: ['POST /admin/nft/detail', 'POST /admin/nft/list', 'POST /admin/nft/verify', 'POST /admin/nft/enable', 'POST /admin/nft/disable'],
    }
  },
  ]
},
{
  path: '/config',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: 'config',
    components: {
      default: () => import('@/views/config/config')
    },
    name: 'config',
    meta: {
      title: 'router.config',// 配置
      icon: 'icon-kuangji',
      affix: false,
      perms: ['POST /admin/config/update', 'POST /admin/config/fetch'],
    }
  }]
},
{
  path: '/pledge',
  component: Layout,
  redirect: 'noredirect',
  name: 'pledge',
  meta: {
    title: 'router.pledgeManagement',// 质押管理
    icon: 'icon-zhiya',
  },
  children: [{
    path: 'setPeriods',
    component: () => import('@/views/pledge/setPeriods'),
    name: 'setPeriods',
    meta: {
      perms: ['POST /admin/pledge/list'],
      title: 'router.setPeriods',// 期数设置
      noCache: true,
      icon: 'goods',
    }
  }, {
    path: 'record',
    component: () => import('@/views/pledge/record'),
    name: 'record',
    meta: {
      perms: [],
      title: 'router.pledgeRecord',// 质押记录
      noCache: true,
      icon: 'goods',
    }
  },
  {
    path: 'award',
    component: () => import('@/views/pledge/award'),
    name: 'award',
    meta: {
      perms: [],
      title: 'router.awardRecord',// 奖励记录
      noCache: true,
      icon: 'goods',
    }
  }
  ]
},
{
  path: '/sys',
  component: Layout,
  redirect: 'noredirect',
  name: 'system',
  meta: {
    title: 'router.systemManagement',// 系统管理
    icon: 'icon-xitongguanli',
  },
  children: [{
    path: 'admin',
    component: () => import('@/views/sys/admin'),
    name: 'admin',
    meta: {
      perms: ['POST /admin/adminuser/list', 'POST /admin/adminuser/create', 'POST /admin/adminuser/update', 'POST /admin/adminuser/delete'],
      title: 'router.administratorManagement',// 管理员管理
      noCache: true,
      icon: 'goods',
    }
  },
  {
    path: 'log',
    component: () => import('@/views/sys/log'),
    name: 'log',
    meta: {
      perms: ['POST /admin/log/list'],
      title: 'router.operationLog',// 操作日志
      noCache: true,
      icon: 'goods',
    }
  },
  {
    path: 'role',
    component: () => import('@/views/sys/role'),
    name: 'role',
    meta: {
      perms: ['POST /admin/role/list', 'POST /admin/role/create', 'POST /admin/role/update', 'POST /admin/role/delete', 'POST /admin/role/permissions', 'POST /admin/role/permissions'],
      title: 'router.roleManagement',// 角色管理
      noCache: true,
      icon: 'goods',
    }
  },
  ]
},
{
  path: '/profile',
  component: Layout,
  redirect: 'noredirect',
  // alwaysShow: true,
  name: 'profile',
  meta: {
    title: 'router.setting',// 设置
    icon: 'system'
  },
  children: [{
    path: 'password',
    component: () => import('@/views/profile/password'),
    name: 'password',
    meta: {
      title: 'router.passwordUpdate',// 修改密码
      noCache: true
    }
  },
  {
    path: 'language',
    component: () => import('@/views/profile/language'),
    name: 'language',
    meta: {
      title: 'router.languageUpdate',// 修改语言
      noCache: true
    }
  }
  ],
  hidden: true
},
{
  path: '*',
  redirect: '/404',
  hidden: true
},
]

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
