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
    component: () => import('../views/profile.vue'),
  },
  {
    path: '/master/role',
    name: 'role',
    component: () => import('../views/RoleMaster.vue'),
  },
  {
    path: '/role/form',
    name: 'role form',
    component: () => import('../views/RoleForm.vue'),
  },
  {
    path: '/profile/form',
    name: 'create profile',
    component: () => import('../views/createProfile.vue'),
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
    path: '/master/supplier',
    name: 'master-supplier',
    component: () => import('../master/purchasing/supplier/list-supplier.vue'),
  },
  {
    path: '/master/supplier/create',
    name: 'master-supplier-create',
    component: () => import('../master/purchasing/supplier/create-supplier.vue'),
  },
  {
    path: '/master/item',
    name: 'master-item',
    component: () => import('../master/purchasing/item/item-list.vue'),
  },
  {
    path: '/master/item-benang',
    name: 'master-item-benang',
    component: () => import('../master/purchasing/item/form/form-benang.vue'),
  },
  {
    path: '/master/item-greige-knitting',
    name: 'master-item-greige-knitting',
    component: () => import('../master/purchasing/item/form/form-greige-knitting.vue'),
  },
  {
    path: '/master/item-greige-woven',
    name: 'master-item-greige-woven',
    component: () => import('../master/purchasing/item/form/greige-woven.vue'),
  },
  {
    path: '/master/item-kain-woven',
    name: 'master-item-kain-woven',
    component: () => import('../master/purchasing/item/form/kain-woven.vue'),
  },
  {
    path: '/master/item-kain-knitting',
    name: 'master-item-kain-knitting',
    component: () => import('../master/purchasing/item/form/kain-knitting.vue'),
  },
  {
    path: '/master/item-lain-lain',
    name: 'master-item-lain-lain',
    component: () => import('../master/purchasing/item/form/lain-lain.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
