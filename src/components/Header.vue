<template>
  <div class="ui-header">
    <router-link class="ui-header__back" :to="{ name: backLink }" v-if="backLink">
      <svg class="icon icon-back">
        <use xlink:href="#icon-back" />
      </svg>
      <span class="sr-only">Back to settings</span>
    </router-link>

    <h1 class="ui-header__title">{{ title }}</h1>
    <router-link class="ui-header__add" :to="{ name: link }" v-if="link && user.admin">
      <svg class="icon icon-add">
        <use xlink:href="#icon-add" />
      </svg>
    </router-link>
    <button class="btn btn--link" type="submit" :form="action" v-if="action">Done</button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    backLink: String,
    link: String,
    action: String
  },

  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style lang="scss" scoped>
.ui-header {
  width: 100%;
  height: calc(4.5rem + env(safe-area-inset-top));
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  padding-top: calc(1rem + env(safe-area-inset-top));
  padding-bottom: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: var(--header-bg);
}

.ui-header__back {
  margin-right: 1.25rem;
  margin-left: -0.5rem;
  padding: 0.25rem 0.25rem;
}

.ui-header__title {
  margin: 0;
  margin-right: auto;
  padding-right: 1rem;
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ui-header__add {
  width: 1.75rem;
  height: 1.75rem;
}

.icon-back {
  font-size: 1.25rem;
  color: var(--text);
}
</style>