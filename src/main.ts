import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { myCustom } from "./common/custom";
const wx = require("weixin-js-sdk");
// eslint-disable-next-line
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(myCustom);

Vue.prototype.wx = wx;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
