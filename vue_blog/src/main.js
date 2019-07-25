import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueSimplemde from 'vue-simplemde';
// import 'simplemde/dist/simplemde.min.css';
// import 'font-awesome/css/font-awesome.min.css';
// import 'material-design-icons-iconfont/dist/material-design-icons.css';
// import '@mdi/font/css/materialdesignicons.css';
import './registerServiceWorker';

import LightTimeline from 'vue-light-timeline';
import VueResource from 'vue-resource';
import hoverCSS from 'hover.css';
import VShowSlide from 'v-show-slide';
import BootstrapVue from 'bootstrap-vue';
import FirebaseService from '@/services/FirebaseService';
import router from './router';
import store from './store';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import AnimateWhenVisible from './components/AnimateWhenVisible.vue';
import './style/css/app.scss';
// import addPolyfills from './polyfills';

const firebase = require('firebase/app');
// 모달 추가
// npm install vue bootstrap-vue bootstrap
Vue.use(BootstrapVue);
Vue.use(VShowSlide);
Vue.use(hoverCSS);
Vue.use(VueResource);
Vue.use(LightTimeline);

Vue.component('AnimateWhenVisible', AnimateWhenVisible);

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c',
  },
});

Vue.use(VueSimplemde);

new Vue({
  router,
  store,
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
		  // User is signed in.
        const data = await FirebaseService.getPortfolios();
		  store.commit('updatePortfolios', data);
      } else {
		  // No user is signed in.
		  store.commit('updatePortfolios', []);
      }
	  });
  },
  render: h => h(App),
}).$mount('#app');
