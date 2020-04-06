<template>
  <div class="ui-content px-0">
    <ui-header title="Settings"></ui-header>

    <div class="list">
      <div class="list-item" v-if="user.admin">
        <router-link class="list-link list-link--flex" :to="{ name: 'locations' }">
          <h3 class="list-title">
            <span>Locations</span>
          </h3>
          <svg class="list-icon icon icon-forward">
            <use xlink:href="#icon-forward" />
          </svg>
        </router-link>
      </div>
      <div class="list-item" v-if="user.admin">
        <router-link class="list-link list-link--flex" :to="{ name: 'opponents' }">
          <h3 class="list-title">
            <span>Opponents</span>
          </h3>
          <svg class="list-icon icon icon-forward">
            <use xlink:href="#icon-forward" />
          </svg>
        </router-link>
      </div>
      <hr class="list-item-seperator" v-if="user.admin" />
      <div class="list-item">
        <router-link class="list-link list-link--flex" :to="{ name: 'change username' }">
          <h3 class="list-title">
            <span>Username</span>
          </h3>
          <svg class="list-icon icon icon-forward">
            <use xlink:href="#icon-forward" />
          </svg>
        </router-link>
      </div>
      <div class="list-item">
        <router-link class="list-link list-link--flex" :to="{ name: 'change email' }">
          <h3 class="list-title">
            <span>Email</span>
          </h3>
          <svg class="list-icon icon icon-forward">
            <use xlink:href="#icon-forward" />
          </svg>
        </router-link>
      </div>
      <div class="list-item">
        <router-link class="list-link list-link--flex" :to="{ name: 'change password' }">
          <h3 class="list-title">
            <span>Password</span>
          </h3>
          <svg class="list-icon icon icon-forward">
            <use xlink:href="#icon-forward" />
          </svg>
        </router-link>
      </div>
      <div class="list-item">
        <a href="#" class="list-link list-link--flex" @click.prevent="signOut">
          <h3 class="list-title">
            <span>Sign Out</span>
          </h3>
        </a>
      </div>
      <hr class="list-item-seperator" />
      <form class="mt-2 px-3">
        <input-field name="active">
          <template v-slot:icon>
            <svg class="icon icon-darkmode" v-if="darkMode">
              <use xlink:href="#icon-darkmode" />
            </svg>
            <svg class="icon icon-lightmode" v-else>
              <use xlink:href="#icon-lightmode" />
            </svg>
          </template>
          <toggle-switch label="Dark Mode" id="active" v-model="darkMode"></toggle-switch>
        </input-field>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["user"]),

    darkMode: {
      get() {
        return JSON.parse(this.$store.getters.darkMode);
      },

      set(value) {
        this.$store.commit("setDarkMode", value);
      }
    }
  },

  methods: {
    signOut() {
      this.$store
        .dispatch("signOut")
        .then(() => this.$router.push({ name: "sign in" }));
    }
  }
};
</script>
