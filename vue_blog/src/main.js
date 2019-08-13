import Vue from 'vue';

import './plugins/vuetify';

// Markdown editor
import VueSimplemde from 'vue-simplemde';

// Bootstrap
import BootstrapVue from 'bootstrap-vue';

// Vueresource for Cookie
import VueResource from 'vue-resource';

// numberAnimation library
import VueNumber from 'vue-number-animation';

// draggable library
import VueDraggable from 'vue-draggable';

// VueApexCharts library
import VueApexCharts from 'vue-apexcharts';

// FirebaseService
import FirebaseService from '@/services/FirebaseService';

// Serviceworker
import './registerServiceWorker';

import App from './App.vue';
import router from './router';
import store from './store';
import AnimateWhenVisible from './components/AnimateWhenVisible.vue';
import './style/css/app.scss';
import vuetify from './plugins/vuetify';

const firebase = require('firebase/app');

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueSimplemde);
Vue.use(VueNumber);
Vue.use(VueDraggable);
Vue.use(VueApexCharts);
Vue.component('AnimateWhenVisible', AnimateWhenVisible);
Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(() => {
    console.log('Service Worker Registered');
  });
}

new Vue({
    router,
    store,
    created() {
        firebase.auth().onAuthStateChanged(async(user) => {
            if (user) {
                // User is signed in.
                const data = await FirebaseService.getPortfolios();
                store.commit('updatePortfolios', data);
            }
        });
    },
    vuetify,
    render: h => h(App)
}).$mount('#app');
