<template>
  <div class="ui-content px-0">
    <ui-header title="Games" link="add game"></ui-header>

    <div class="list">
      <div class="list-item" v-for="game in games" :key="game.id">
        <game prefix="vs" :editable="true" :game="game"></game>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",

  computed: {
    games() {
      return this.$store.getters.games;
    }
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
