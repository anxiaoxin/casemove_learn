// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/mnt/d/work/tmp/casemove_learn/app/client/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.tsx').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": require('@/pages/404.tsx').default
      },
      {
        "path": "/account",
        "exact": true,
        "component": require('@/pages/account/index.tsx').default
      },
      {
        "path": "/details",
        "exact": true,
        "component": require('@/pages/details/index.tsx').default
      },
      {
        "path": "/home",
        "exact": true,
        "component": require('@/pages/home/index.tsx').default
      },
      {
        "path": "/home/index_tmp",
        "exact": true,
        "component": require('@/pages/home/index_tmp.tsx').default
      },
      {
        "path": "/loading",
        "exact": true,
        "component": require('@/pages/loading.tsx').default
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('@/pages/login/index.tsx').default
      },
      {
        "path": "/message",
        "exact": true,
        "component": require('@/pages/message/index.tsx').default
      },
      {
        "path": "/moveout",
        "exact": true,
        "component": require('@/pages/moveout/index.tsx').default
      },
      {
        "path": "/moveout/items",
        "exact": true,
        "component": require('@/pages/moveout/items.tsx').default
      },
      {
        "path": "/todo",
        "exact": true,
        "component": require('@/pages/todo/index.tsx').default,
        "title": "TOTO",
        "icon": "toto-icon",
        "badge": "5"
      },
      {
        "component": require('@/pages/404.tsx').default
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
