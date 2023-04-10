/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { MENU_KEYS } from '../constants/index';

interface PathNameProps {
  [key: string]: string;
}

export const PathName: PathNameProps = {
  [MENU_KEYS.cloudpc]: '/cloudPc',
  [MENU_KEYS.user]: '/user',
  [MENU_KEYS.mirror]: '/mirror',
  [MENU_KEYS.record]: '/record',
  [MENU_KEYS.addcop]: '/cloudPc/addcop',
  [MENU_KEYS.addmirror]: '/mirror/addmirror',
  [MENU_KEYS.editMirror]: '/mirror/editMirror',
  [MENU_KEYS.addUser]: '/user/addUser',
  [MENU_KEYS.editUser]: '/user/editUser',
};

export default {
  routes: [
    // { path: '/login', component: '@/pages/login' },
    { path: '/home', component: '@/pages/Home' },
    { path: '/login', component: '@/pages/Login' },
    // { path: '/succeed', component: '@/pages/ActiveS' },
    // { path: '/failed', component: '@/pages/ActiveF' },
    // { path: '/clogin', component: '@/pages/CLogin' },
    // { path: '/logincb', component: '@/pages/Cb' },
    // {
    //   path: '/',
    //   component: '@/index',
    //   routes: [
    //     {
    //       path: '/cloudPc',
    //       component: '@/pages/Company',
    //     },
    //     {
    //       path: '/cloudPc/addcop',
    //       component: '@/pages/AddCop',
    //     },
    //     {
    //       path: '/user',
    //       component: '@/pages/Cost',
    //     },
    //     { path: '/mirror', component: '@/pages/Resource' },
    //     {
    //       path: '/mirror/addmirror',
    //       component: '@/pages/AddMirror',
    //     },
    //     {
    //       path: '/mirror/editMirror',
    //       component: '@/pages/AddMirror',
    //     },
    //     {
    //       path: '/user/addUser',
    //       component: '@/pages/AddUser',
    //     },
    //     {
    //       path: '/user/editUser',
    //       component: '@/pages/AddUser',
    //     },
    //     { path: '/record', component: '@/pages/Record' },
    //   ],
    // },
  ],
};
