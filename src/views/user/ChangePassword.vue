<template>
  <div class="ui-content">
    <ui-header title="Change Password"
               backLink="settings"
               action="changePassword">
    </ui-header>

    <form class="pt-2" id="changePassword" @submit.prevent="onChangePassword">
      <input-field name="password" icon="password">
        <input class="form-control" type="password" id="password" name="password" placeholder="New password" v-model="$v.password.$model">
        <p v-if="errors" class="error">
          <span v-if="!$v.password.required">Password is required</span>
          <span v-if="!$v.password.minLength">Password must be at least {{$v.password.$params.minLength.min}} characters</span>
        </p>
      </input-field>

      <input-field name="passwordConfirm" icon="password">
        <input class="form-control" type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm password" v-model="$v.passwordConfirm.$model">
        <p v-if="errors" class="error">
          <span v-if="!$v.passwordConfirm.required">Password is required</span>
          <span v-if="!$v.passwordConfirm.sameAsPassword">Passwords must be identical</span>
        </p>
      </input-field>
    </form>
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      password: null,
      passwordConfirm: null,
      errors: false,
      empty: true,
    }
  },

  methods: {
    onChangePassword: function () {
      this.empty = !this.$v.$anyDirty;
      this.errors = this.$v.$anyError;
      if (this.errors === false && this.empty === false) {
        this.$store.dispatch('changePassword', this.password)
        .then(() => {
          this.$router.push({ name: 'settings' })
        })
      }
    }
  },

  validations: {
    password: {
      required,
      minLength: minLength(8)
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password')
    }
  }
}
</script>
