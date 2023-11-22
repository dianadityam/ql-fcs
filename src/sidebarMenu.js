import { mdiEmailOutline } from '@mdi/js';

export default [
  {
    to: '/',
    icon: mdiEmailOutline,
    label: 'NOTIFICATION',
  },
  {
    label: 'SETUP',
    menu: [
      {
        to: '/setup',
        label: 'MASTER',
      },
    ],
  },
  {
    to: '/marketing',
    label: 'MARKETING',
  },
  {
    to: '/purchasing',
    label: 'PURCHASING',
  },
  { to: '/inventory', label: 'INVENTORY' },
  { to: '/accounting', label: 'ACCOUNTING' },
  { to: '/fixed-asset', label: 'FIXED ASSET' },
  { to: '/hris', label: 'HRIS' },
];
