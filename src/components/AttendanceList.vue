<template>
  <div class="player-list">
    <div class="player-list-group">
      <h4>In</h4>
      <transition-group name="flip-list" tag="ul">
        <li v-for="player in accepted" v-bind:key="player">{{ player }}</li>
      </transition-group>
    </div>
    <div class="player-list-group">
      <h4>Out</h4>
      <transition-group name="flip-list" tag="ul">
        <li
          data-state="player.attendance."
          v-for="player in declined"
          v-bind:key="player"
        >{{ player }}</li>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    players: {
      type: Object
    }
  },

  computed: {
    roster() {
      return this.$store.getters.roster;
    },

    accepted() {
      const accepted = Object.keys(this.players).filter(
          key => this.players[key] === true
        ),
        roster = this.roster,
        names = [];

      accepted.forEach(function(doc) {
        const obj = roster.find(o => o.id === doc);
        names.push(obj.name);
      });

      return names.sort();
    },

    declined() {
      const accepted = Object.keys(this.players).filter(
          key => this.players[key] === false
        ),
        roster = this.roster,
        names = [];

      accepted.forEach(function(doc) {
        const obj = roster.find(o => o.id === doc);
        names.push(obj.name);
      });

      return names.sort();
    }
  }
};
</script>

<style lang="scss" scoped>
.player-list {
  display: flex;
  justify-content: center;
  max-width: 20rem;
  position: relative;
  margin: 1rem auto 2rem auto;
  padding: 1rem;
  text-align: left;
  border-radius: 1rem;
  background-color: var(--input-bg);

  &:before {
    content: "";
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: -0.5rem;
    left: calc(50% - 0.5rem);
    transform: rotate(45deg);
    background-color: var(--input-bg);
  }
}

.flip-list-move {
  transition: transform 1s;
}

.player-list-group {
  width: 50%;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>