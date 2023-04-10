/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { defineConfig } from 'umi';
import config from './config/config';

export default defineConfig({
  ...config,
  define: {
    'process.env.baseUrl': 'https://super-admin.cloudpc.lenovo.com/',
    'process.env.iconUrl': 'https://api-gw-external.cloudpc.lenovo.com/',
    'process.env.authName': 'cloudpc-api-gateway',
    'process.env.authPassword': 'Dk4msrWx7AGUyAKP',
    'process.env.currentEnv': 'prd',
    'process.env.issuerValue': 'HWSA',
  },
});
