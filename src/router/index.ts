import { createRouter, createWebHistory } from 'vue-router';
import PageHome from '../components/pages/PageHome.vue';
import PageThreadShow from '../components/pages/PageThreadShow.vue';
import PageNotFound from '../components/pages/PageNotFound.vue';
import PagesForum from '../components/pages/PagesForum.vue';

import sourceData from '../data.json';

const routes = [
  { path: '/', name: 'Home', component: PageHome },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: PagesForum,
    props: true,
  },

  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: PageThreadShow,
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
    component: PageNotFound,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
