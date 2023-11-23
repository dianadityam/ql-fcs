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
} from '@mdi/js'
export default [
  {
    to: '/',
    icon: mdiEmailOutline,
    label: 'notification'
  },
  {
    to: '/setup',
    label: 'setup',
    icon: mdiWrench
  },
  {
    to: '/marketing',
    label: 'marketing',
    icon: mdiBagChecked
  },
  {
    to: '/purchasing',
    label: 'purchasing',
    icon: mdiCart
  },
  {
    to: '/inventory',
    label: 'inventory',
    icon: mdiDatabase
  },
  {
    to: 'accounting',
    label: 'accounting',
    icon: mdiScaleBalance,
  },
  {
    to: '/fixedAsset',
    label: 'fixedAsset',
    icon: mdiAccountCircle
  },
  {
    to: '/hris',
    label: 'hris',
    icon: mdiAlertCircle
  },
  {
    label: 'Dropdown',
    icon: mdiViewList,
    menu: [
      {
        label: 'Item One'
      },
      {
        label: 'Item Two'
      }
    ]
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
]
