<template>
  <div class="ui-content px-0">
    <ui-header title="Opponents" backLink="settings" link="add opponent"></ui-header>

    <div class="list" v-if="!loading">
      <div
        class="list-item"
        v-bind:class="{ active: !opponent.active }"
        v-for="opponent in opponents"
        :key="opponent.id"
      >
        <router-link
          class="list-link list-link--flex"
          :to="{ name: 'edit opponent', params: {id: opponent.id}}"
        >
          <h3 class="list-title" :class="{ disabled: !opponent.active }">{{ opponent.name }}</h3>
          <svg class="icon icon-hidden icon-list-status" v-if="!opponent.active">
            <use xlink:href="#icon-hidden" />
          </svg>
          <svg class="list-icon icon icon-forward">
            <use xlink:href="#icon-forward" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.loading;
    },

    opponents() {
      return this.$store.getters.opponents;
    }
  },

  created() {
    this.$store.dispatch("loadEntities", {
      collection: "opponents",
      orderBy: "name",
      mutation: "setOpponents"
    });
  }
};
</script>
