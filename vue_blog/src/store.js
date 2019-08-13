import Vue from 'vue';
import Vuex from 'vuex';

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
    postReplys: [],
    nowUser: '',
    error: {
      type: '',
      state: false,
      code: '',
      message: '',
    },
    push: {
      state: false,
      title: '',
      message: '',
      link: '',
      nickName: ''
    }
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
        updatePostReplys(state, data) {
            state.postReplys = data;
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

        setPush(state, data) {
            state.push.state = true;
            state.push.title = data.title;
            state.push.message = data.message;
            state.push.link = data.link;
            state.push.nickName = data.nickName;
            console.log("[setpush 222]", state.push.nickName);
        },

        setPushState(state) {
            state.push.state = false;
            state.push.title = '';
            state.push.message = '';
            state.push.link = '';
            state.push.nickName = '';
            
        }
    },
    getters: {
        getUserInfo: (state) => {
            return state.user;
        },
        getError: (state) => {
            return state.error;
        },
        getPush: (state) => {
            console.log("[getpush 111]", state.push.nickName);
            return state.push;
        },
    },
});
