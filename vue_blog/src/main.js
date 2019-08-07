import Vue from 'vue';
// Vuetify library
import Vuetify from 'vuetify';
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

// FirebaseService
import FirebaseService from '@/services/FirebaseService';

// Serviceworker
import './registerServiceWorker';

import App from './App.vue';
import router from './router';
import store from './store';
import AnimateWhenVisible from './components/AnimateWhenVisible.vue';
import './style/css/app.scss';
// import addPolyfills from './polyfills';


const firebase = require('firebase/app');

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(Vuetify);
Vue.use(VueSimplemde);
Vue.use(VueNumber);
Vue.use(VueDraggable);
Vue.component('AnimateWhenVisible', AnimateWhenVisible);

Vue.config.productionTip = false;

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
    render: h => h(App),
}).$mount('#app');