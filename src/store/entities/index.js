import { db } from "@/firebase/init";

const dayjs = require("dayjs");

const state = {
  games: [],
  roster: [],
  locations: [],
  opponents: [],
  entity: {}
};

const getters = {
  games: state => {
    return state.games;
  },

  roster: state => {
    return state.roster;
  },

  locations: state => {
    return state.locations;
  },

  opponents: state => {
    return state.opponents;
  },

  entity: state => {
    return state.entity;
  }
};

const mutations = {
  setGames(state, payload) {
    state.games = payload;
  },

  setRoster(state, payload) {
    state.roster = payload;
  },

  setLocations(state, payload) {
    state.locations = payload;
  },

  setOpponents(state, payload) {
    state.opponents = payload;
  },

  setEntity(state, payload) {
    state.entity = payload;
  }
};

const actions = {
  loadEntities({ commit }, payload) {
    commit("setLoading", true);
    db.collection(payload.collection)
      .orderBy(payload.orderBy)
      .onSnapshot(snapshot => {
        let entities = [];

        snapshot.forEach(function(doc) {
          entities.push({ ...doc.data(), id: doc.id });
        });

        commit(payload.mutation, entities);
        commit("setLoading", false);
      });
  },

  loadEntity({ commit }, payload) {
    commit("setLoading", true);
    db.collection(payload.collection)
      .doc(payload.id)
      .get()
      .then(function(doc) {
        commit("setEntity", { ...doc.data() });
        commit("setLoading", false);
      })
      .catch(function(error) {
        commit("setError", error);
        commit("setLoading", false);
      });
  },

  createEntity({ commit }, payload) {
    db.collection(payload.collection)
      .add(payload.data)
      .catch(error => {
        commit("setError", error);
      });
  },

  updateEntity({ commit }, payload) {
    db.collection(payload.collection)
      .doc(payload.id)
      .update(payload.data)
      .catch(error => {
        commit("setError", error);
      });
  },

  deleteEntity({ commit }, payload) {
    db.collection(payload.collection)
      .doc(payload.id)
      .delete()
      .then(() => {
        commit("setEntity", {});
      })
      .catch(error => {
        commit("setError", error);
      });
  },

  loadGames({ commit }) {
    commit("setLoading", true);
    const today = new Date();
    db.collection("games")
      .where("date", ">", today)
      .orderBy("date")
      .onSnapshot(snapshot => {
        let games = [];

        snapshot.forEach(function(doc) {
          games.push({
            id: doc.id,
            date: doc.data().date.seconds,
            opponent: doc.data().opponent,
            field: doc.data().field,
            attendance: doc.data().attendance
          });
        });

        commit("setGames", games);
        commit("setLoading", false);
      });
  },

  loadGame({ commit }, id) {
    commit("setLoading", true);
    db.collection("games")
      .doc(id)
      .get()
      .then(function(doc) {
        commit("setEntity", {
          id: doc.id,
          date: dayjs(doc.data().date.seconds * 1000).format(
            "YYYY-MM-DDThh:mm"
          ),
          opponent: doc.data().opponent,
          field: doc.data().field
        });
        commit("setLoading", false);
      })
      .catch(function(error) {
        commit("setError", error);
        commit("setLoading", false);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
