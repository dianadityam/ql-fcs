import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'notification',
    component: () => import('../views/notification.vue'),
  },
  {
    path: '/setup',
    name: 'setup',
    component: () => import('../views/setup.vue'),
  },
  {
    path: '/master/karyawan',
    name: 'karyawan',
    component: () => import('../views/karyawan.vue'),
  },
  {
    path: '/marketing',
    name: 'marketing',
    component: () => import('../views/marketing.vue'),
  },
  {
    path: '/purchasing',
    name: 'purchasing',
    component: () => import('../views/purchasing.vue'),
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: () => import('../views/inventory.vue'),
  },
  {
    path: '/accounting',
    name: 'accounting',
    component: () => import('../views/accounting.vue'),
  },
  {
    path: '/fixedAsset',
    name: 'fixedAsset',
    component: () => import('../views/fixedAsset.vue'),
  },
  {
    path: '/hris',
    name: 'hris',
    component: () => import('../views/hris.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
