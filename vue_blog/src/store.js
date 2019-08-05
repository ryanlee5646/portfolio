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
        posts: [],
        nowUser: '',
        error: {
            type: '',
            state: false,
            code: '',
            message: '',
        },
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
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
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
        updatePosts(state, data) {
            state.posts = data;
        },
        setError(state, data) {
            state.error.state = true;
            state.error.type = data.type;
            state.error.code = data.code;
            state.error.message = data.message;
        },
        setErrorState(state) {
            state.error.state = false;
            state.type = '';
            state.error.code = '';
            state.error.message = '';
        },
    },
    getters: {
        getUserInfo: (state) => {
            return state.user;
        },
        getError: (state) => {
            return state.error;
        },
    },
});