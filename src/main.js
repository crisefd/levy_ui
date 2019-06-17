import Vue from "vue";
import App from "./App.vue";
import { router, store, titleMixin } from "./services";
import "./registerServiceWorker";
import VueRx from "vue-rx";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.config.productionTip = false;

Vue.use(VueRx);
Vue.use(Buefy);
Vue.mixin(titleMixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
