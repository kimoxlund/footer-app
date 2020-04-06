<template>
  <div class="ui-content">
    <ui-header title="Reset Password"
               backLink="settings"
               v-if="userIsAuthenticated">
    </ui-header>
    <template v-if="emailSent">
      <h1 v-bind:class="{ 'pt-2': userIsAuthenticated }">Email Sent!</h1>
      <p>You should receive an email shortly with instructions on how to reset your password. Once completed, check back here and sign in.</p>

      <p class="text-center mt-2"><router-link class="pl-05" :to="{ name: 'sign in'}">Sign In</router-link></p>
    </template>
    <template v-else>
      <h1 v-if="!userIsAuthenticated">Reset Password</h1>
      <p v-bind:class="{ 'pt-2': userIsAuthenticated }">Enter your email and you'll receive a link to reset your password</p>
      <form @submit.prevent="onResetPassword" >
        <input-field name="email" icon="email">
          <input class="form-control" type="email" id="email" name="email" autocomplete="email" placeholder="Email Address" v-model="email">
        </input-field>

        <button type="submit" class="btn mt-1">Send Login Link</button>

        <p class="text-center mt-2" v-if="!userIsAuthenticated"><router-link class="pl-05" :to="{ name: 'home'}" exact>Back to Sign In</router-link></p>
      </form>
    </template>
  </div>
</template>

<script>
import { fbAuth } from '@/firebase/init'

export default {
  name: 'reset-password',

  data() {
    return {
      email: null,
      emailSent: false
    }
  },

  computed: {
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
  },

  methods: {
    onResetPassword: function () {
      this.$store.dispatch('resetPassword', this.email)
      .then(() => {
        this.emailSent = true
      })
    }
  }
}
</script>
