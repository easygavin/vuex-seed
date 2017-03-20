import Vue from 'vue';
import app from './app.vue';
import VueResource from 'vue-resource';
import { sync } from 'vuex-router-sync'
import store from './store/index';
import router from './router';

Vue.use(VueResource);

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

// create the app instance.
new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#main');