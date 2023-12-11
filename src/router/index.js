import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'notification',
    component: () => import('../views/notification.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
  },
  {
    path: '/setup',
    name: 'setup',
    component: () => import('../views/setup.vue'),
  },
  {
    path: '/form/karyawan',
    name: 'form karyawan',
    component: () => import('../master/setup/form-karyawan.vue'),
  },
  {
    path: '/master/karyawan',
    name: 'karyawan',
    component: () => import('../master/setup/karyawan.vue'),
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
  {
    path: '/master/customer',
    name: 'customer',
    component: () => import('../master/marketing/customer.vue'),
  },
  {
    path: '/form/customer',
    name: 'customer form',
    component: () => import('../master/marketing/customer-form.vue'),
  },
  {
    path: '/master/kendaraan',
    name: 'kendaraan',
    component: () => import('../master/marketing/kendaraan.vue'),
  },
  {
    path: '/form/kendaraan',
    name: 'kendaraan form',
    component: () => import('../master/marketing/kendaraan-form.vue'),
  },
  {
    path: '/master/spv',
    name: 'spv',
    component: () => import('../master/marketing/spv.vue'),
  },
  {
    path: '/form/spv',
    name: 'spv form',
    component: () => import('../master/marketing/spv-form.vue'),
  },
  {
    path: '/master/ekspedisi',
    name: 'ekspedisi',
    component: () => import('../master/marketing/ekspedisi.vue'),
  },
  {
    path: '/form/ekspedisi',
    name: 'ekspedisi form',
    component: () => import('../master/marketing/ekspedisi-form.vue'),
  },
  {
    path: '/master/pricelist',
    name: 'pricelist',
    component: () => import('../master/marketing/pricelist.vue'),
  },
  {
    path: '/form/pricelist',
    name: 'pricelist form',
    component: () => import('../master/marketing/pricelist-form.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  if (token || to.path === '/login') {
    next();
  } else {
    next('/login');
  }
});

export default router;
