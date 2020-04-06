<template>
  <div class="ui-content">
    <ui-header title="Add Location" backLink="locations" action="addLocation"></ui-header>
    <form class="pt-2" id="addLocation" @submit.prevent="onAddLocation">
      <input-field name="name" icon="field">
        <input
          class="form-control"
          type="text"
          id="name"
          name="name"
          placeholder="Field Name"
          v-model="$v.location.name.$model"
        />
        <p v-if="errors" class="error">
          <span v-if="!$v.location.name.required">Name of the field is required</span>
          <span
            v-if="!$v.location.name.minLength"
          >Field name must be at least {{$v.location.name.$params.minLength.min}} characters</span>
        </p>
      </input-field>

      <input-field name="location" icon="map-pin">
        <input
          class="form-control"
          type="text"
          id="location"
          name="location"
          placeholder="Google maps URL"
          v-model="$v.location.location.$model"
        />
        <p v-if="errors" class="error">
          <span v-if="!$v.location.location.required">location is required</span>
          <span v-if="!$v.location.location.url">location must be a map url</span>
        </p>
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
        <toggle-switch id="active" label="Active" v-model="location.active"></toggle-switch>
      </input-field>
    </form>
  </div>
</template>

<script>
import { required, minLength, url } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      location: {
        name: "",
        location: "",
        active: true
      },
      errors: false,
      empty: true
    };
  },

  methods: {
    onAddLocation: function() {
      this.empty = !this.$v.location.$anyDirty;
      this.errors = this.$v.location.$anyError;
      if (this.errors === false && this.empty === false) {
        this.$store
          .dispatch("createEntity", {
            data: this.location,
            collection: "locations"
          })
          .then(() => {
            this.$router.push({ name: "locations" });
          });
      }
    }
  },

  validations: {
    location: {
      name: {
        required,
        minLength: minLength(8)
      },
      location: {
        required,
        url
      }
    }
  }
};
</script>
