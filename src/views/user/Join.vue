<template>
  <div class="ui-content">
    <h1 class="flex-heading">
      <span>Create Account</span>
      <div class="loader" v-if="loading">
        <span></span>
      </div>
    </h1>

    <form @submit.prevent="onSignUp">
      <input-field name="name" icon="name">
        <input
          class="form-control"
          type="text"
          id="name"
          name="name"
          autocomplete="name"
          placeholder="Name"
          v-model="$v.user.name.$model"
        />
        <div v-if="errors" class="error">
          <span v-if="!$v.user.name.required">We can't go on without your name</span>
          <span v-if="!$v.user.name.minLength">You name must be at least 3 characters</span>
        </div>
      </input-field>

      <input-field name="email" icon="email">
        <input
          class="form-control"
          type="email"
          id="email"
          name="email"
          autocomplete="email"
          placeholder="Email Address"
          v-model="$v.user.email.$model"
        />
        <div v-if="errors" class="error">
          <span v-if="!$v.user.email.required">We need your email address</span>
          <span v-if="!$v.user.email.email">Are you sure this email is correct?</span>
        </div>
      </input-field>

      <input-field name="password" icon="password">
        <input
          class="form-control"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          v-model="$v.user.password.$model"
        />
        <div v-if="errors" class="error">
          <span v-if="!$v.user.password.required">A password is required</span>
          <span v-if="!$v.user.password.minLenght">Your password must be at least 8 characters</span>
        </div>
      </input-field>

      <button type="submit" class="btn mt-1" :disabled="empty">Create Account</button>

      <p class="text-center mt-2">
        Already have an account?
        <router-link class="pl-05" :to="{ name: 'sign in' }">Sign In</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null
      },
      errors: null
    };
  },

  computed: {
    empty() {
      return !this.$v.user.$dirty;
    },

    loading() {
      return this.$store.getters.loading;
    }
  },

  methods: {
    onSignUp() {
      this.errors = this.$v.user.$anyError;
      if (this.errors === false && this.empty === false) {
        this.$store.dispatch("createUserAccount", {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          admin: false
        });
      }
    }
  },

  validations: {
    user: {
      name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  }
};
</script>

<style lang="scss">
.flex-heading {
  display: flex;
  align-items: center;
}

.loader {
  height: 2rem;
  width: 2rem;
  margin-left: 1rem;
}
.loader span {
  display: block;
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 2rem;
  width: 2rem;
}
.loader span::before,
.loader span::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 2rem;
  width: 2rem;
  border: 4px solid var(--brand-primary);
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 20px var(--brand-primary);
  animation: loader-1 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
}

@keyframes loader-1 {
  0% {
    transform: translate3d(0, 0, 0) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1.5);
    opacity: 0;
  }
}
.loader span::after {
  animation: loader-2 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) 0.25s infinite;
}

@keyframes loader-2 {
  0% {
    transform: translate3d(0, 0, 0) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0;
  }
}
</style>