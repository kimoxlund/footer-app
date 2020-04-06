<template>
  <div class="game">
    <h3 class="game-title">{{ prefix }} {{ game.opponent }}</h3>
    <router-link
      class="game-edit"
      :to="{ name: 'edit game', params: {id: game.id}}"
      v-if="editable && user.admin"
    >
      <span class="sr-only">Edit game</span>
      <svg class="list-icon icon icon-forward">
        <use xlink:href="#icon-forward" />
      </svg>
    </router-link>

    <div class="list-detail" v-if="field">
      {{ game.date | date }}
      <br />
      {{ field.name }}
      <a
        class="pl-05"
        :href="field.location"
        target="_blank"
        rel="noopener noreferrer"
      >Map</a>
    </div>

    <a
      href="#"
      class="attendance button js-button"
      role="button"
      @click.prevent="expanded = !expanded"
    >
      {{ acceptedCount }} in
      <span class="attendance-separator">/</span>
      {{ declinedCount }} out
    </a>
    <attendance-list :players="game.attendance" v-if="expanded"></attendance-list>

    <div class="game-prompt">
      <input
        type="radio"
        :name="game.id"
        :id="game.id + '-in'"
        :value="true"
        v-model="attending"
        @click="launchConfetti($event)"
      />
      <label class="game-in" :for="game.id + '-in'">
        <svg class="icon icon-in">
          <use xlink:href="#icon-in" />
        </svg>
      </label>
      <input type="radio" :name="game.id" :id="game.id + '-out'" :value="false" v-model="attending" />
      <label class="game-out" :for="game.id + '-out'">
        <svg class="icon icon-out">
          <use xlink:href="#icon-out" />
        </svg>
      </label>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/init";
import AttendanceList from "./AttendanceList.vue";
import confetti from "canvas-confetti";
import { mapGetters } from "vuex";

export default {
  components: {
    "attendance-list": AttendanceList
  },

  data() {
    return {
      expanded: false
    };
  },

  props: {
    game: Object,
    prefix: String,
    editable: Boolean
  },

  computed: {
    ...mapGetters(["user", "locations"]),

    field() {
      if (this.locations) {
        return this.locations.find(location => location.id === this.game.field);
      } else {
        return {};
      }
    },

    attending: {
      get() {
        return this.game.attendance[this.user.uid];
      },
      set(value) {
        this.setAttendance(value);
      }
    },

    acceptedCount() {
      return Object.values(this.game.attendance).filter(item => item === true)
        .length;
    },

    declinedCount() {
      return Object.values(this.game.attendance).filter(item => item === false)
        .length;
    }
  },

  methods: {
    setAttendance(value) {
      this.$store.dispatch("updateEntity", {
        id: this.game.id,
        data: { ["attendance." + this.user.uid]: value },
        collection: "games"
      });
    },

    launchConfetti(event) {
      if (!this.attending) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const buttonX = event.clientX / windowWidth;
        const buttonY = event.clientY / windowHeight;

        confetti({
          particleCount: 300,
          startVelocity: 30,
          angle: 0,
          spread: 360,
          colors: ["#82D173"],
          origin: {
            x: buttonX,
            y: buttonY
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.game {
  position: relative;
  padding: 1rem 1.5rem;
  text-align: center;
}

.game-title {
  margin: 0.5rem 0;
}

.game-edit {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 4rem;
  height: 100%;
  top: 0;
  right: 0;
}

.game-prompt {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

input[type="radio"] {
  visibility: hidden;
  height: 0;
  width: 0;
  margin: 0;
}

label {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0.5rem;
  cursor: pointer;
  font-size: 3rem;
  color: var(--input-bg);
  background-color: transparent;
  border-radius: 50%;
}

input[type="radio"] + label.game-in {
  position: relative;
  z-index: 2;

  &:before {
    content: "";
    width: 1rem;
    height: 1rem;
    position: absolute;
    border-radius: 50%;
    animation-duration: 2s;
    animation-name: pulse;
    animation-iteration-count: infinite;
    z-index: -1;
  }
}

input[type="radio"]:checked + label.game-in {
  color: var(--text-positive);

  &:before {
    animation: none;
  }
}

input[type="radio"]:checked + label.game-out {
  color: var(--text-negative);
}

.attendance {
  padding: 0.25rem;
  display: inline-block;
}

.attendance-separator {
  padding: 0 0.5rem;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 var(--input-bg);
  }

  40%,
  100% {
    box-shadow: 0 0 0 3rem transparent;
  }
}
</style>
