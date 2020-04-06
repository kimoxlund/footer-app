import { db, fbAuth } from "@/firebase/init";
import router from "../../router";

const state = {
  user: null
};

const getters = {
  user: (state) => {
    return state.user;
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  setUserName(state, name) {
    state.user.name = name;
  }
};

const actions = {
  createUserAccount({ commit, dispatch }, payload) {
    commit("setLoading", true);
    commit("clearError");
    return new Promise((resolve) => {
      fbAuth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) =>
          dispatch("createUserProfile", {
            id: user.user.uid,
            name: payload.name,
            email: payload.email
          })
        )
        .then(() => resolve())
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
        });
    });
  },

  createUserProfile({ commit }, payload) {
    return new Promise((resolve) => {
      db.collection("roster")
        .doc(payload.id)
        .set({
          name: payload.name,
          email: payload.email,
          admin: false
        })
        .then(() => {
          commit("setUser", {
            uid: payload.id,
            name: payload.name,
            email: payload.email,
            admin: false
          }),
            resolve();
          commit("setLoading", false);
          router.push({ name: "home" });
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
        });
    });
  },

  signUserIn({ commit, dispatch }, payload) {
    commit("setLoading", true);
    commit("clearError");
    return new Promise((resolve) => {
      fbAuth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => dispatch("loadUser", user.user))
        .then(() => resolve())
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
        });
    });
  },

  loadUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      if (!payload) {
        commit("setUser", payload);
        resolve();
        return;
      }

      db.collection("roster")
        .doc(payload.uid)
        .get()
        .then((snapshot) => {
          const doc = snapshot.data();
          commit("setUser", {
            name: doc.name,
            email: doc.email,
            uid: payload.uid,
            admin: doc.admin
          });
          resolve();
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setError", error);
          commit("setLoading", false);
          reject();
        });
    });
  },

  changePassword({ commit }, password) {
    commit("setLoading", true);
    commit("clearError");
    fbAuth.currentUser
      .updatePassword(password)
      .then(commit("setLoading", false))
      .catch((error) => {
        commit("setLoading", false);
        commit("setError", error);
      });
  },

  changeEmail({ commit }, payload) {
    commit("setLoading", true);
    commit("clearError");
    fbAuth.currentUser
      .updateEmail(payload.email)
      .then(() => {
        db.collection("roster")
          .doc(payload.id)
          .update({
            email: payload.email
          })
          .then(() => {
            commit("setRoster", payload);
            commit("setUserName", payload.name);
            commit("setLoading", false);
          })
          .catch((error) => {
            commit("setError", error);
          });
      })
      .catch((error) => {
        commit("setLoading", false);
        commit("setError", error);
      });
  },

  changeUsername({ commit }, payload) {
    commit("setLoading", true);
    commit("clearError");
    db.collection("roster")
      .doc(payload.id)
      .update({
        name: payload.name
      })
      .then(() => {
        commit("setRoster", payload);
        commit("setUserName", payload.name);
        commit("setLoading", false);
      })
      .catch((error) => {
        commit("setError", error);
      });
  },

  signOut({ commit }) {
    return new Promise((resolve, reject) => {
      fbAuth
        .signOut()
        .then(() => {
          commit("setUser", null);
          resolve();
        })
        .catch((error) => {
          commit("logoutFail", error);
          reject(error);
        });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
