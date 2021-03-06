import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { myCustom } from "./common/custom.js";

Vue.config.productionTip = false;

// Vue.use(myCustom);

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
