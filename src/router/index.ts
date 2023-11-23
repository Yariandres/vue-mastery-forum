import { createRouter, createWebHistory } from 'vue-router';
import sourceData from '../data.json';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/pages/PageHome.vue'),
  },
  {
    path: '/me',
    name: 'Profile',
    component: () => import('../components/pages/PageProfile.vue'),
    meta: { toTop: true, smoothScroll: true },
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: () => import('../components/pages/PageProfile.vue'),
    props: { edit: true },
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: () => import('../components/pages/PagesForum.vue'),
    props: true,
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: () => import('../components/pages/PagesCategory.vue'),
    props: true,
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: () => import('../components/pages/PageThreadShow.vue'),
    props: true,
    beforeEnter(to: any, _, next: any) {
      const threadExists = sourceData.threads.find(
        (thread) => thread.id === to.params.id
      );

      if (threadExists) {
        return next();
      } else {
        next({
          name: 'PageNotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          // peserve existing query path
          query: to.query,
          hash: to.hash,
        });
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: () => import('../components/pages/PageNotFound.vue'),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to) {
    const scroll = <any>{};
    if (to.meta.toTop) scroll.to = 0;
    if (to.meta.smoothScroll) scroll.behavior = 'smooth';
    return scroll;
  },
});
