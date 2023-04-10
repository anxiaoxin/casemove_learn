/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { defineConfig } from 'umi';
import config from './config/config';

export default defineConfig({
  ...config,
  define: {
    'process.env.baseUrl': 'https://super-admin-uat.cloudpc.lenovo.com/',
    'process.env.iconUrl': 'https://api-gw-external-uat.cloudpc.lenovo.com/',
    'process.env.authName': 'cloudpc-api-gateway',
    'process.env.authPassword': 'gaBKgJSGG6475hfkb3GV',
    'process.env.currentEnv': 'uat',
    'process.env.issuerValue': 'HWSA-UAT',
  },
});
