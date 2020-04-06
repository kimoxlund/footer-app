import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import entities from "./entities";
import shared from "./shared";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,
    entities,
    shared
  },

  state: {
    darkMode: null
  },

  getters: {
    darkMode: state => {
      return state.darkMode;
    }
  },

  mutations: {
    setDarkMode(state, payload) {
      if (payload !== null) {
        const test = JSON.parse(payload) ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", test);
        localStorage.setItem("darkMode", payload);
        state.darkMode = payload;
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("darkMode", true);
        state.darkMode = true;
      }
    }
  }
});
