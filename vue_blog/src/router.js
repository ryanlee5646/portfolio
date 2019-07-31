import Vue from 'vue';
import Router from 'vue-router';
import PortfolioWriter from './views/PortfolioWriter.vue';
import PortfolioView from './views/PortfolioView.vue';
import AdminPage from './views/AdminPage.vue';
import Reply from './views/Reply.vue';
import PostoWriter from './views/PostWriter.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
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
        {
            path: '/admin',
            name: 'AdminPage',
            component: AdminPage,
        },
        {
            path: '/reply',
            name: 'Reply',
            component: Reply,
        },
        {
            path: '/post/write',
            name: 'postwrite',
            component: PostoWriter,
        },
    ],
});