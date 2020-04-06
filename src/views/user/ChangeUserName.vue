<template>
  <div class="ui-content">
    <ui-header title="Change Username" backLink="settings" action="changeUsername"></ui-header>

    <form class="pt-2" id="changeUsername" @submit.prevent="onChangeUsername">
      <p>Current username: {{ user.name }}</p>
      <input-field name="name" icon="name">
        <input
          class="form-control"
          type="text"
          id="name"
          name="name"
          placeholder="New username"
          v-model="$v.name.$model"
        />
        <p v-if="errors" class="error">
          <span v-if="!$v.password.required">Your name is required</span>
          <span
            v-if="!$v.password.minLength"
          >Your name must be at least {{$v.password.$params.minLength.min}} characters</span>
        </p>
      </input-field>
    </form>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: null,
      errors: false,
      empty: true
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    }
  },

  methods: {
    onChangeUsername: function() {
      this.empty = !this.$v.$anyDirty;
      this.errors = this.$v.$anyError;
      if (this.errors === false && this.empty === false) {
        this.$store
          .dispatch("changeUsername", { name: this.name, id: this.user.uid })
          .then(() => {
            this.$router.push({ name: "settings" });
          });
      }
    }
  },

  validations: {
    name: {
      required,
      minLength: minLength(3)
    }
  }
};
</script>
