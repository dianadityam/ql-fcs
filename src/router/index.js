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
    { path: '/', component: notification },
    { path: '/setup', component: setup },
    { path: '/marketing', component: marketing },
    { path: '/purchasing', component: purchasing },
    { path: '/inventory', component: inventory },
    { path: '/accounting', component: accounting },
    { path: '/fixed-asset', component: fixedAsset },
    { path: '/hris', component: hris },
  ],
});

export default router;
