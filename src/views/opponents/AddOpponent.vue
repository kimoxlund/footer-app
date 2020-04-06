<template>
  <div class="ui-content">
    <ui-header title="Add Opponent" backLink="opponents" action="addOpponent"></ui-header>

    <form class="pt-2" id="addOpponent" @submit.prevent="onAddOpponent">
      <input-field name="name" icon="field">
        <input
          class="form-control"
          type="text"
          id="name"
          name="name"
          placeholder="Team Name"
          v-model="$v.opponent.name.$model"
        />
        <p v-if="errors" class="error">
          <span v-if="!$v.opponent.name.required">Name of the team is required</span>
          <span
            v-if="!$v.opponent.name.minLength"
          >Team name must be at least {{$v.opponent.name.$params.minLength.min}} characters</span>
        </p>
      </input-field>

      <input-field name="active">
        <template v-slot:icon>
          <svg class="icon icon-visible" v-if="opponent.active">
            <use xlink:href="#icon-visible" />
          </svg>
          <svg class="icon icon-hidden" v-else>
            <use xlink:href="#icon-hidden" />
          </svg>
        </template>
        <toggle-switch id="active" label="active" v-model="opponent.active"></toggle-switch>
      </input-field>
    </form>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      opponent: {
        name: "",
        active: true
      },
      errors: false,
      empty: true
    };
  },

  methods: {
    onAddOpponent: function() {
      this.empty = !this.$v.opponent.$anyDirty;
      this.errors = this.$v.opponent.$anyError;
      if (this.errors === false && this.empty === false) {
        this.$store
          .dispatch("createEntity", {
            data: this.opponent,
            collection: "opponents"
          })
          .then(() => {
            this.$router.push({ name: "opponents" });
          });
      }
    }
  },

  validations: {
    opponent: {
      name: {
        required,
        minLength: minLength(3)
      }
    }
  }
};
</script>
