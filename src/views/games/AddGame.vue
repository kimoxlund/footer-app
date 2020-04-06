<template>
  <div class="ui-content">
    <ui-header title="Add Game" backLink="games" action="addGame"></ui-header>
    <form class="pt-2" id="addGame" @submit.prevent="onAddGame" novalidate>
      <input-field name="date" icon="time">
        <input
          class="form-control"
          placeholder="Date"
          type="text"
          id="date"
          name="date"
          onfocusin="(this.type='datetime-local')"
          onfocusout="(this.type='text')"
          v-model="$v.game.date.$model"
        />
        <p v-if="errors" class="error">
          <span v-if="!$v.game.date.required">The date is required</span>
        </p>
      </input-field>
      <input-field name="opponent" icon="team">
        <select
          class="form-control"
          name="opponent"
          id="opponent"
          v-model="$v.game.opponent.$model"
        >
          <option disabled value>Opponent</option>
          <option v-for="item in activeOpponents" :key="item.name">{{ item.name }}</option>
        </select>
        <p v-if="errors" class="error">
          <span v-if="!$v.game.opponent.required">An opponent is needed</span>
        </p>
      </input-field>

      <input-field name="field" icon="map-pin">
        <select class="form-control" name="location" id="location" v-model="$v.game.field.$model">
          <option disabled value>Location</option>
          <option v-for="item in activeLocations" :value="item.id" :key="item.id">{{ item.name }}</option>
        </select>
        <p v-if="errors" class="error">
          <span v-if="!$v.game.field.required">A location is needed</span>
        </p>
      </input-field>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  name: "AddGame",

  data() {
    return {
      game: {
        date: null,
        opponent: "",
        field: ""
      },
      errors: false
    };
  },

  computed: {
    opponents() {
      return this.$store.getters.opponents;
    },

    locations() {
      return this.$store.getters.locations;
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

  methods: {
    onAddGame: function() {
      this.empty = !this.$v.game.$anyDirty;
      this.errors = this.$v.game.$anyError;
      if (this.errors === false && this.empty === false) {
        this.$store
          .dispatch("createEntity", {
            data: {
              date: new Date(this.game.date),
              opponent: this.game.opponent,
              field: this.game.field,
              attendance: {}
            },
            collection: "games"
          })
          .then(() => {
            this.$router.push({ name: "games" });
          });
      }
    }
  },

  created: function() {
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
  },

  validations: {
    game: {
      date: {
        required
      },
      opponent: {
        required
      },
      field: {
        required
      }
    }
  }
};
</script>
