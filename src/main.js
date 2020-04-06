import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import { fbAuth } from "@/firebase/init";
import Vuelidate from "vuelidate";
import "./registerServiceWorker";
import DateFilter from "./filters/date";
import Header from "./components/Header";
import InputField from "./components/InputField";
import ToggleSwitch from "./components/ToggleSwitch";
import Game from "./components/Game";
import Modal from "./components/Modal";

Vue.use(Vuelidate);
Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.component("ui-header", Header);
Vue.component("input-field", InputField);
Vue.component("toggle-switch", ToggleSwitch);
Vue.component("game", Game);
Vue.component("modal", Modal);

const unsubscribe = fbAuth.onAuthStateChanged(user => {
  store.dispatch("loadUser", user).then(() => {
    new Vue({
      router,
      store,
      render: function(h) {
        return h(App);
      }
    }).$mount("#app");
  });

  unsubscribe();
});
