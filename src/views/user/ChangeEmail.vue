<template>
  <div class="ui-content">
    <ui-header title="Change Email" backLink="settings" action="changeEmail"></ui-header>

    <form class="pt-2" id="changeEmail" @submit.prevent="onChangeEmail">
      <p>Current email: {{ user.email }}</p>
      <input-field name="email" icon="email">
        <input
          class="form-control"
          type="email"
          id="email"
          name="email"
          placeholder="New email"
          v-model="$v.email.$model"
        />
        <p v-if="errors" class="error">
          <span v-if="!$v.password.required">Email is required</span>
        </p>
      </input-field>
    </form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: null,
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
    onChangeEmail: function() {
      this.empty = !this.$v.$anyDirty;
      this.errors = this.$v.$anyError;
      if (this.errors === false && this.empty === false) {
        this.$store
          .dispatch("changeEmail", { id: this.user.uid, email: this.email })
          .then(() => {
            this.$router.push({ name: "settings" });
          });
      }
    }
  },

  validations: {
    email: {
      required,
      email
    }
  }
};
</script>
