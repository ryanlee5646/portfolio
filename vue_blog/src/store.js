import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        accessToken: '',
        user: '',
        loginDialogShow: false,
        ImageLink: '',
        ImageURL: '',
        portfolios: [],
        portfolioReplys: [],
        nowUser: '',
    },
    mutations: {
        displayDrawer(state, flag) {
            state.drawerVisibility = flag;
        },
        loginDialog(state, flag) {
            state.loginDialogShow = flag;
        },
        logout(state) {
            state.accessToken = '';
            state.user = '';
            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('accessToken', state.accessToken);
        },
        addImageLink(state, link) {
            console.log(`${link} store.js`); // eslint-disable-line no-console
            link += '<br>';
            state.ImageLink += link;
        },
        addImageURL(state, url) {
            console.log(`${url} store.js`); // eslint-disable-line no-console
            state.ImageURL = url;
        },
        updatePortfolios(state, data) {
            state.portfolios = data;
        },
        updatePortfolioReplys(state, data) {
            state.portfolioReplys = data;
        },
        addNowUser(state, data) {
            state.nowUser = data;
        },
    },
    getters: {
        getUserInfo: state => {
            return state.user;
        },
    },
});