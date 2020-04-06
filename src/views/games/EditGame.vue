<template>
  <div class="ui-content" v-show="!loading">
    <ui-header :title="'vs ' + game.opponent" backLink="games" action="editGame"></ui-header>
    <form class="pt-2" id="editGame" @submit.prevent="onUpdateGame" novalidate>
      <input-field name="date" icon="time">
        <input
          class="form-control"
          placeholder="Date"
          type="datetime-local"
          id="date"
          name="date"
          onfocusin="(this.type='datetime-local')"
          onfocusout="(this.type='text')"
          v-model="game.date"
        />
      </input-field>
      <input-field name="opponent" icon="team">
        <select class="form-control" name="opponent" id="opponent" v-model="game.opponent">
          <option disabled value>Opponent</option>
          <option v-for="item in activeOpponents" :key="item.name">{{ item.name }}</option>
        </select>
      </input-field>

      <input-field name="field" icon="map-pin">
        <select class="form-control" name="location" id="location" v-model="game.field">
          <option disabled value>Location</option>
          <option v-for="item in activeLocations" :value="item.id" :key="item.id">{{ item.name }}</option>
        </select>
      </input-field>
    </form>
    <button class="btn--delete" @click="modalDelete = true">
      <span class="btn-icon">
        <svg class="icon icon-delete">
          <use xlink:href="#icon-delete" />
        </svg>
      </span>Delete Game
    </button>
    <modal v-if="modalDelete">
      <div slot="body">
        <div class="text-center">
          <p>Are you sure you want to permanently delete this game?</p>
        </div>
      </div>
      <div slot="actions">
        <div class="modal__actions">
          <button class="btn btn--secondary" @click="modalDelete = false">Cancel</button>
          <button class="btn" @click="onDeleteGame">Delete</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const clonedeep = require("lodash.clonedeep");

export default {
  data() {
    return {
      id: this.$route.params.id,
      newGame: clonedeep(this.$store.getters.entity),
      modalDelete: false
    };
  },

  computed: {
    ...mapGetters(["loading", "opponents", "locations"]),

    game() {
      return clonedeep(this.$store.getters.entity);
    },

    selectedLocation() {
      return this.locations.find(location => {
        return location.name === this.game.field;
      });
    },

    activeOpponents() {
      if (this.opponents) {
        return Object.values(this.opponents).filter(
          opponent => opponent.active === true
        );
      }
    },

    activeLocations() {
      if (this.locations) {
        return Object.values(this.locations).filter(
          location => location.active === true
        );
      }
    }
  },

  watch: {
    game(newValue) {
      this.newGame = newValue;
    }
  },

  methods: {
    onUpdateGame: function() {
      this.$store
        .dispatch("updateEntity", {
          id: this.id,
          data: {
            date: new Date(this.newGame.date),
            opponent: this.newGame.opponent,
            field: this.newGame.field
          },
          collection: "games"
        })
        .then(() => {
          this.$router.push({ name: "games" });
        });
    },

    onDeleteGame: function() {
      this.$store
        .dispatch("deleteEntity", {
          id: this.id,
          collection: "games"
        })
        .then(() => {
          this.$router.push({ name: "games" });
        });
    }
  },

  created() {
    this.$store.dispatch("loadGame", this.id);

    this.$store.dispatch("loadEntities", {
      collection: "locations",
      orderBy: "name",
      mutation: "setLocations"
    });

    this.$store.dispatch("loadEntities", {
      collection: "opponents",
      orderBy: "name",
      mutation: "setOpponents"
    });
  }
};
</script>
