<template>
  <div class="ui-content px-0">
    <ui-header title="Locations" backLink="settings" link="add location"></ui-header>

    <div class="list" v-if="!loading">
      <div class="list-item" v-for="location in locations" :key="location.id">
        <router-link
          class="list-link list-link--flex"
          :to="{ name: 'edit location', params: {id: location.id}}"
        >
          <h3 class="list-title" :class="{ disabled: !location.active }">
            <span>{{ location.name }}</span>
          </h3>
          <svg class="icon icon-hidden icon-list-status" v-if="!location.active">
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

    locations() {
      return this.$store.getters.locations;
    }
  },

  created() {
    this.$store.dispatch("loadEntities", {
      collection: "locations",
      orderBy: "name",
      mutation: "setLocations"
    });
  }
};
</script>
