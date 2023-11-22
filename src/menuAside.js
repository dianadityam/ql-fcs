import {
  mdiAccountCircle,
  mdiEmailOutline,
  mdiLock,
  mdiAlertCircle,
  mdiBagChecked,
  mdiWrench,
  mdiViewList,
  mdiCart,
  mdiResponsive,
  mdiPalette,
} from '@mdi/js'
export default [
  {
    to: '/notification',
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
    icon: mdiResponsive
  },
  {
    to: 'accounting',
    label: 'accounting',
    icon: mdiPalette
  },
  {
    to: '/fixedAsset',
    label: 'fixedAsset',
    icon: mdiAccountCircle
  },
  {
    to: '/login',
    label: 'Login',
    icon: mdiLock
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
