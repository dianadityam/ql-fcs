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
    path: '/master/profile',
    name: 'profile',
    component: () => import('../master/setup/profile.vue'),
  },
  {
    path: '/master/role',
    name: 'role',
    component: () => import('../master/setup/role.vue'),
  },
  {
    path: '/role/form',
    name: 'role form',
    component: () => import('../master/setup/role-form.vue'),
  },
  {
    path: '/profile/form',
    name: 'create profile',
    component: () => import('../master/setup/profile-form.vue'),
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
  {
    path: '/master/pricelist-supplier',
    name: 'hris',
    component: () => import('../master/purchasing/pricelist-supplier.vue'),
  },
  {
    path: '/master/user-approval',
    name: 'user approval',
    component: () => import('../master/setup/user-approval.vue'),
  },
  {
    path: '/form/user-approval',
    name: 'user approval form',
    component: () => import('../master/setup/form-user-approval.vue'),
  },
  {
    path: '/master/general',
    name: 'general',
    component: () => import('../master/setup/general.vue'),
  },
  {
    path: '/form/general',
    name: 'general form',
    component: () => import('../master/setup/general-form.vue'),
  },
  {
    path: '/master/warehouse',
    name: 'warehouse',
    component: () => import('../master/setup/warehouse.vue'),
  },
  {
    path: '/form/warehouse',
    name: 'warehouse form',
    component: () => import('../master/setup/warehouse-form.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
