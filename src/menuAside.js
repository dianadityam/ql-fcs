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
export default [
  {
    to: '/',
    icon: mdiEmailOutline,
    label: 'NOTIFICATION',
  },
  {
    label: 'SETUP',
    icon: mdiWrench,
    // to: '/setup',
    menu: [
      {
        label: 'MASTER',
        menu: [
          {
            label: 'GENERAL',
            to: '/master/general',
          },
          {
            label: 'KARYAWAN',
            to: '/master/karyawan',
          },
          {
            label: 'MERK',
            to: '/master/merk',
          },
        ],
      },
    ],
  },
  {
    to: '/marketing',
    label: 'MARKETING',
    icon: mdiBagChecked,
  },
  {
    to: '/purchasing',
    label: 'PURCHASING',
    icon: mdiCart,
  },
  {
    to: '/inventory',
    label: 'INVENTORY',
    icon: mdiDatabase,
  },
  {
    to: 'accounting',
    label: 'ACCOUNTING',
    icon: mdiScaleBalance,
  },
  {
    to: '/fixedAsset',
    label: 'FIXED ASSET',
    icon: mdiAccountCircle,
  },
  {
    to: '/hris',
    label: 'HRIS',
    icon: mdiAlertCircle,
  },
  {
    label: 'Dropdown',
    icon: mdiViewList,
    menu: [
      {
        label: 'Item One',
      },
      {
        label: 'Item Two',
      },
    ],
  },
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
];
