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
      console.log(`${link} store.js`);
      link += '<br>';
      state.ImageLink += link;
    },
    addImageURL(state, url) {
      console.log(`${url} store.js`);
      state.ImageURL = url;
    },
    updatePortfolios(state, data) {
      state.portfolios = data;
    },
  },
});
