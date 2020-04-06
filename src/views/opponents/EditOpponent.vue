<template>
  <div class="ui-content" v-show="!loading">
    <ui-header :title="opponent.name" backLink="opponents" action="editOpponent"></ui-header>

    <form class="pt-2" id="editOpponent" @submit.prevent="onUpdateOpponent">
      <input-field name="name" icon="field">
        <input
          class="form-control"
          type="text"
          id="name"
          name="name"
          placeholder="Field Name"
          v-model.lazy="opponent.name"
        />
      </input-field>

      <input-field name="active">
        <template v-slot:icon>
          <svg class="icon icon-visible" v-if="opponent.active">
            <use xlink:href="#icon-visible" />
          </svg>
          <svg class="icon icon-hidden" v-else>
            <use xlink:href="#icon-hidden" />
          </svg>
        </template>
        <toggle-switch id="active" label="active" v-model="opponent.active"></toggle-switch>
      </input-field>
    </form>

    <button class="btn--delete" @click="modalDelete = true">
      <span class="btn-icon">
        <svg class="icon icon-delete">
          <use xlink:href="#icon-delete" />
        </svg>
      </span>Delete Opponent
    </button>

    <modal v-if="modalDelete">
      <div slot="body">
        <div class="text-center">
          <p>Are you sure you want to permanently delete this opponent?</p>
        </div>
      </div>
      <div slot="actions">
        <div class="modal__actions">
          <button class="btn btn--secondary" @click="modalDelete = false">Cancel</button>
          <button class="btn" @click="onDeleteOpponent">Delete</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
const clonedeep = require("lodash.clonedeep");

export default {
  data() {
    return {
      id: this.$route.params.id,
      newOpponent: clonedeep(this.$store.getters.entity),
      modalDelete: false
    };
  },

  computed: {
    loading() {
      return this.$store.getters.loading;
    },

    opponent() {
      return clonedeep(this.$store.getters.entity);
    }
  },

  watch: {
    opponent(newValue) {
      this.newOpponent = newValue;
    }
  },

  methods: {
    onUpdateOpponent: function() {
      this.$store
        .dispatch("updateEntity", {
          id: this.id,
          data: this.newOpponent,
          collection: "opponents"
        })
        .then(() => {
          this.$store.commit("setEntity", {});
          this.$router.push({ name: "opponents" });
        });
    },

    onDeleteOpponent: function() {
      this.$store
        .dispatch("deleteEntity", {
          id: this.id,
          collection: "opponents"
        })
        .then(() => {
          this.$store.commit("setEntity", {});
          this.$router.push({ name: "opponents" });
        });
    }
  },

  created() {
    this.$store.dispatch("loadEntity", {
      id: this.id,
      collection: "opponents"
    });
  }
};
</script>
