import {
  mdiAccountCircle,
  mdiEmailOutline,
  mdiLock,
  mdiAlertCircle,
  mdiBagChecked,
  mdiWrench,
  mdiViewList,
  mdiCart,
  mdiAccountGroup,
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
  {
    label: 'MARKETING',
    icon: mdiCart,
    toggle: false,
    menu: [
      {
        label: 'MASTER',
        toggle: false,
        menu: [
          {
            label: 'CUSTOMER',
            to: '/master/customer',
          },
          {
            label: 'KENDARAAN',
            to: '/master/kendaraan',
          },
          {
            label: 'SPV',
            to: '/master/spv',
          },
          {
            label: 'EKSPEDISI',
            to: '/master/ekspedisi',
          },
          {
            label: 'PRICELIST',
            to: '/master/pricelist',
          },
        ],
      },
    ],
  },
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
  {
    to: '/hris',
    label: 'HRIS',
    icon: mdiAccountGroup,
    menu: [
      {
        label: 'MASTER',
        toggle: false,
        menu: [
          {
            label: 'KARYAWAN',
            to: '/master/karyawan',
          },
        ],
      },
    ],
  },
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
