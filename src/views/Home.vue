<template>
  <div class="ui-content px-0 ui-content--home">
    <div class="logo">
      Footer
    </div>
    <game
      prefix="Next: "
      :editable="false"
      :game="games[0]"
      v-if="!loading"
    ></game>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",

  computed: {
    ...mapGetters(["loading", "games"])
  },

  created() {
    this.$store.dispatch("loadGames");
    this.$store.dispatch("loadEntities", {
      collection: "roster",
      orderBy: "name",
      mutation: "setRoster"
    });
    this.$store.dispatch("loadEntities", {
      collection: "locations",
      orderBy: "name",
      mutation: "setLocations"
    });
  }
};
</script>

<style lang="scss">
.ui-content--home {
  height: calc(100% - 3rem);
  margin-top: 0;
  margin-bottom: 0;
  background: var(--home-bg-color);
}

.logo {
  height: 42%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 0 1.5rem 0;
  font-size: 3rem;
  color: var(--brand-primary);
}
</style>
