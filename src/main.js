import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueApexCharts from 'vue-apexcharts';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import store from './store';
import './auth';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueApexCharts);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
