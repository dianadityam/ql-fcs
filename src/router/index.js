import { createRouter, createWebHistory } from 'vue-router';
import notification from '../views/notification.vue';
import setup from '../views/setup.vue';
import marketing from '../views/marketing.vue';
import purchasing from '../views/purchasing.vue';
import inventory from '../views/inventory.vue';
import accounting from '../views/accounting.vue';
import fixedAsset from '../views/fixedAsset.vue';
import hris from '../views/hris.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: notification },
    { path: '/setup', name: setup, component: setup },
    { path: '/marketing', name: marketing, component: marketing },
    { path: '/purchasing', name: purchasing, component: purchasing },
    { path: '/inventory', name: inventory, component: inventory },
    { path: '/accounting', name: accounting, component: accounting },
    { path: '/fixed-asset', name: fixedAsset, component: fixedAsset },
    { path: '/hris', name: hris, component: hris },
  ],
});

export default router;
