import { createRouter, createWebHistory } from 'vue-router';
import Valutes from '../views/Valutes.vue';
import Converter from '../views/Converter.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'valutes', component: Valutes },
    { path: '/converter', name: 'converter', component: Converter },
    { path: '/:pathMatch(.*)*', redirect: { name: 'valutes' } },
  ],
});
