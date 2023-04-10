/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { defineConfig } from 'umi';
import config from './config/config';

export default defineConfig({
  ...config,
  define: {
    'process.env.baseUrl': 'https://super-admin-uat1.cloudpc.lenovo.com/',
    'process.env.iconUrl': 'https://api-gw-external-uat1.cloudpc.lenovo.com/',
    'process.env.authName': 'cloudpc-api-gateway',
    'process.env.authPassword': 'gaBKgJSGG6475hfkb3GV',
    'process.env.currentEnv': 'uat1',
    'process.env.issuerValue': 'HWSA-UAT1',
  },
});
