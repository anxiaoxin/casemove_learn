/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
export default {
  baseUrl: process.env.baseUrl,
  iconUrl: process.env.iconUrl,
  authName: process.env.authName,
  authPassword: process.env.authPassword,
  currentEnv: process.env.currentEnv,
  issuerValue: process.env.issuerValue,
  domain:
    process.env.currentEnv === 'dev' ? document.domain : 'cloudpc.lenovo.com',
};
