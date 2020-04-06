<template>
  <div class="ui-content" v-show="!loading">
    <ui-header :title="location.name" backLink="locations" action="editLocation"></ui-header>
    <form class="pt-2" id="editLocation" @submit.prevent="onUpdateLocation">
      <input-field name="name" icon="field">
        <input
          class="form-control"
          type="text"
          id="name"
          name="name"
          placeholder="Field Name"
          v-model="location.name"
        />
      </input-field>

      <input-field name="location" icon="map-pin">
        <input
          class="form-control"
          type="text"
          id="location"
          name="location"
          placeholder="Google maps URL"
          v-model="location.location"
        />
      </input-field>

      <input-field name="active">
        <template v-slot:icon>
          <svg class="icon icon-visible" v-if="location.active">
            <use xlink:href="#icon-visible" />
          </svg>
          <svg class="icon icon-hidden" v-else>
            <use xlink:href="#icon-hidden" />
          </svg>
        </template>
        <toggle-switch id="active" label="active" v-model="location.active"></toggle-switch>
      </input-field>
    </form>

    <button class="btn--delete" @click="modalDelete = true">
      <span class="btn-icon">
        <svg class="icon icon-delete">
          <use xlink:href="#icon-delete" />
        </svg>
      </span>Delete Location
    </button>

    <modal v-if="modalDelete">
      <div slot="body">
        <div class="text-center">
          <p>Are you sure you want to permanently delete this location?</p>
        </div>
      </div>
      <div slot="actions">
        <div class="modal__actions">
          <button class="btn btn--secondary" @click="modalDelete = false">Cancel</button>
          <button class="btn" @click="onDeleteLocation">Delete</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
const clonedeep = require("lodash.clonedeep");

export default {
  data() {
    return {
      id: this.$route.params.id,
      newLocation: clonedeep(this.$store.getters.entity),
      modalDelete: false
    };
  },

  computed: {
    loading() {
      return this.$store.getters.loading;
    },

    location() {
      return clonedeep(this.$store.getters.entity);
    }
  },

  watch: {
    location(newValue) {
      this.newLocation = newValue;
    }
  },

  methods: {
    onUpdateLocation: function() {
      this.$store
        .dispatch("updateEntity", {
          id: this.id,
          data: this.newLocation,
          collection: "locations"
        })
        .then(() => {
          this.$router.push({ name: "locations" });
        });
    },

    onDeleteLocation: function() {
      this.$store
        .dispatch("deleteEntity", {
          id: this.id,
          collection: "locations"
        })
        .then(() => {
          this.$router.push({ name: "locations" });
        });
    }
  },

  created() {
    this.$store.dispatch("loadEntity", {
      id: this.id,
      collection: "locations"
    });
  }
};
</script>
