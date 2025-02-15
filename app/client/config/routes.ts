/**
 * 路由配置
 * 更多路由请查询 https://umijs.org/zh-CN/docs/routing
 */
export default [
  { exact: true, path: '/', redirect: '/tabBar/index' },
  {
    path: '/',
    component: '@/layouts/index', // 采用umi 约定的全局路由， 因为umi不能针对不同的路由配置不同的 layout，所以需要在全局的layout中特殊处理。
    routes: [
      {
        path: '/tabBar/index',
        title: '首页',
        icon: 'AlipayCircleFill',
        component: '@/pages/home/index',
      },
      {
        path: '/tabBar/todo',
        title: '我的待办',
        badgeKey: 'todoBadge',
        icon: 'UnorderedListOutline',
        wrappers: [
          // 配置路由的高阶组件封装
          '@/authority/index', //用于路由级别的权限校验
        ],
        component: '@/pages/todo/index',
      },
      {
        path: '/tabBar/message',
        title: '我的消息',
        icon: 'MessageOutline',
        badgeKey: 'messageBadge',
        wrappers: [
          // 配置路由的高阶组件封装
          '@/authority/index', //用于路由级别的权限校验
        ],
        component: '@/pages/message/index',
      },
      {
        path: '/tabBar/personalCenter',
        title: '个人中心',
        icon: 'UserOutline',
        wrappers: [
          // 配置路由的高阶组件封装
          '@/authority/index', //用于路由级别的权限校验
        ],
        component: '@/pages/account/index',
      },
      { path: '/detail', title: '详情页', component: '@/pages/details/index' },
      { path: '/login', component: '@/pages/login/index' },
      { path: '/genkey', component: '@/pages/genskey/index' },
      { path: '/moveout', component: '@/pages/moveout/index' },
      { path: '/*', component: '@/pages/404' },
      { path: '/move', component: '@/pages/move/index' },
      { path: '/**/*', redirect: '/404' },
    ],
  },
];
