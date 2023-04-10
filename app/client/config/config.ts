/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import routes from '../src/routes/index';

export default {
  title: 'app',
  links: [{ rel: 'icon', href: './logo.ico' }],
  nodeModulesTransform: {
    type: 'none',
  },
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  routes: routes.routes,
  fastRefresh: {},
};
