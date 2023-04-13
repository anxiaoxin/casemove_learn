// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/mnt/d/work/tmp/casemove_learn/app/web/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/pages/loading';

export function getRoutes() {
  const routes = [
  {
    "exact": true,
    "path": "/",
    "redirect": "/tabBar/index"
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__index' */'@/layouts/index'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/tabBar/index",
        "title": "首页",
        "icon": "AlipayCircleFill",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__home__index' */'@/pages/home/index'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/tabBar/todo",
        "title": "我的待办",
        "badgeKey": "todoBadge",
        "icon": "UnorderedListOutline",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/authority/index'), loading: LoadingComponent})],
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__todo__index' */'@/pages/todo/index'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/tabBar/message",
        "title": "我的消息",
        "icon": "MessageOutline",
        "badgeKey": "messageBadge",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/authority/index'), loading: LoadingComponent})],
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__message__index' */'@/pages/message/index'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/tabBar/personalCenter",
        "title": "个人中心",
        "icon": "UserOutline",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'@/authority/index'), loading: LoadingComponent})],
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__account__index' */'@/pages/account/index'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/detail",
        "title": "详情页",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__details__index' */'@/pages/details/index'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__login__index' */'@/pages/login/index'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/moveout",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__moveout__index' */'@/pages/moveout/index'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/*",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "path": "/**/*",
        "redirect": "/404",
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
