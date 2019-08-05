import Vue from "vue";
import App from "./App.vue";
import { router, store, titleMixin } from "./services";
import "./registerServiceWorker";
import VueRx from "vue-rx";
import VueFlashMessage from 'vue-flash-message';
import Buefy from "buefy";
import "buefy/dist/buefy.css";
require('vue-flash-message/dist/vue-flash-message.min.css');
Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(VueFlashMessage);
Vue.mixin(titleMixin);
Vue.use(VueRx);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
