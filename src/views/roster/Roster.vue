<template>
  <div class="ui-content px-0">
    <ui-header title="Roster"></ui-header>
    <div class="list" v-if="!loading">
      <div class="list-item" v-for="player in roster" :key="player.id">
        <div
          class="list-link--flex px-3 py-2"
          :to="{ name: 'edit player', params: {id: player.id}}"
        >
          <h3 class="list-title">{{ player.name }}</h3>
          <svg class="icon icon-admin icon-list-status" v-if="player.admin">
            <use xlink:href="#icon-admin" />
          </svg>
          <toggle-switch
            :id="player.id"
            class="list-toggle"
            :checked="player.admin"
            @change="onMakeAdmin(player.id, $event)"
            v-if="admin"
          ></toggle-switch>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "roster",

  computed: {
    loading() {
      return this.$store.getters.loading;
    },

    roster() {
      return this.$store.getters.roster;
    },

    admin() {
      return this.$store.getters.user.admin;
    }
  },

  created() {
    this.$store.dispatch("loadEntities", {
      collection: "roster",
      orderBy: "name",
      mutation: "setRoster"
    });
  },

  methods: {
    onMakeAdmin: function(id, admin) {
      this.$store.dispatch("updateEntity", {
        id: id,
        data: { admin: admin },
        collection: "roster"
      });
    }
  }
};
</script>
