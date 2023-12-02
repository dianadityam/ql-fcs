import {
  mdiAccountCircle,
  mdiEmailOutline,
  mdiLock,
  mdiAlertCircle,
  mdiBagChecked,
  mdiWrench,
  mdiViewList,
  mdiCart,
  mdiDatabase,
  mdiScaleBalance,
} from '@mdi/js';

import { ref } from 'vue';

const menu = ref([
  {
    to: '/',
    icon: mdiEmailOutline,
    label: 'NOTIFICATION',
    toggle: false,
  },
  {
    label: 'SETUP',
    icon: mdiWrench,
    toggle: false,
    menu: [
      {
        label: 'MASTER',
        toggle: false,
        to: '/pricelist-supplier',
        menu: [
          {
            label: 'PROFIE',
            to: '/master/profile',
          },
          {
            label: 'ROLE',
            to: '/master/role',
          },
          {
            label: 'GENERAL',
            to: '/master/general',
          },
          {
            label: 'APPROVAL USER',
            to: '/master/user-approval',
          },
          {
            label: 'WAREHOUSE',
            to: '/master/warehouse',
          },
          {
            label: 'KARYAWAN',
            to: '/master/karyawan',
          },
          {
            label: 'MERK',
            to: '/master/merk',
          },
          {
            label: 'SUPPLIER',
            to: '/master/pricelist-supplier',
          },
        ],
      },
    ],
  },
  // {
  //   to: '/marketing',
  //   label: 'MARKETING',
  //   icon: mdiBagChecked,
  // },
  // {
  //   to: '/purchasing',
  //   label: 'PURCHASING',
  //   icon: mdiCart,
  // },
  // {
  //   to: '/inventory',
  //   label: 'INVENTORY',
  //   icon: mdiDatabase,
  // },
  // {
  //   to: 'accounting',
  //   label: 'ACCOUNTING',
  //   icon: mdiScaleBalance,
  // },
  // {
  //   to: '/fixedAsset',
  //   label: 'FIXED ASSET',
  //   icon: mdiAccountCircle,
  // },
  // {
  //   to: '/hris',
  //   label: 'HRIS',
  //   icon: mdiAlertCircle,
  // },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One',
  //     },
  //     {
  //       label: 'Item Two',
  //     },
  //   ],
  // },
  // {
  //   href: 'https://github.com/justboil/admin-one-vue-tailwind',
  //   label: 'GitHub',
  //   icon: mdiGithub,
  //   target: '_blank'
  // },
  // {
  //   href: 'https://github.com/justboil/admin-one-react-tailwind',
  //   label: 'React version',
  //   icon: mdiReact,
  //   target: '_blank'
  // }
]);

export default menu;
