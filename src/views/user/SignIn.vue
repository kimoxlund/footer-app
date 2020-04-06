<template>
  <div class="ui-content">
    <h1>Sign In</h1>
    <form @submit.prevent="signIn">
      <input-field name="name" icon="name">
        <input
          class="form-control"
          type="email"
          id="email"
          name="email"
          autocomplete="email"
          placeholder="Email Address"
          v-model="$v.credentials.email.$model"
        />
        <div v-if="errors" class="error">
          <span v-if="!$v.credentials.email.required">We need your email address</span>
          <span v-if="!$v.credentials.email.email">Are you sure this email is correct?</span>
        </div>
      </input-field>

      <input-field name="password" icon="password">
        <input
          class="form-control"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          v-model="$v.credentials.password.$model"
        />
        <div v-if="errors" class="error">
          <span v-if="!$v.credentials.password.required">We need your email address</span>
          <span>{{ errorMsg }}</span>
        </div>
      </input-field>
      <button type="submit" class="btn mt-1" :disabled="empty">Sign In</button>

      <p class="text-center mt-2">
        Don't have an account?
        <router-link class="pl-05" :to="{ name: 'join'}">Create one</router-link>
      </p>

      <p class="text-center mt-2">
        <router-link class="pl-05" :to="{ name: 'reset password'}">Forgot Password?</router-link>
      </p>
      {{ error }}
    </form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      },
      errors: null
    };
  },

  computed: {
    ...mapGetters(["user", "loading", "error"]),

    empty() {
      return !this.$v.credentials.$dirty;
    }
  },

  methods: {
    signIn() {
      this.$store
        .dispatch("signUserIn", {
          email: this.credentials.email,
          password: this.credentials.password
        })
        .then(() => this.$router.push({ name: "home" }));
    }
  },

  validations: {
    credentials: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  }
};
</script>
