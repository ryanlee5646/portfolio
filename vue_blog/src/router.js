import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import PortfolioWriter from './views/PortfolioWriter.vue';
import PortfolioView from './views/PortfolioView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/portfolio/write',
      name: 'portfoliowrite',
      component: PortfolioWriter,
    },
    {
      path: '/portfolio/view/:id',
      name: 'portfolioview',
      component: PortfolioView,
      props: true,
    },
  ],
});
