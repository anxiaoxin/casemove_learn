/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { defineConfig } from 'umi';
import config from './config/config';

export default defineConfig({
  ...config,
  define: {
    'process.env.baseUrl': 'https://super-admin-sit.cloudpc.lenovo.com/',
    'process.env.iconUrl': 'https://api-gw-external-sit.cloudpc.lenovo.com/',
    'process.env.authName': 'cloudpc-api-gateway',
    'process.env.authPassword': 'cloudpc-api-gateway',
    'process.env.currentEnv': 'sit',
    'process.env.issuerValue': 'HWSA-SIT',
  },
});
