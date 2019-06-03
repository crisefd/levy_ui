import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
// import Rx from 'rxjs/Rx';
import VueRx from "vue-rx";
// import {
//   MdButton,
//   MdContent,
//   MdCard,
//   MdInput,
//   MdField,
//   MdCardHeader,
//   MdCardActions,
//   MdSnackBar
// } from 'vue-material/dist/components'
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
// import 'vue-material/dist/theme/default.css';

Vue.config.productionTip = false;

Vue.use(VueRx);

Vue.use(VueMaterial);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
