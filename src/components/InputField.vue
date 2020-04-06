<template>
  <div class="form-group">
    <label class="form-label" :for="name">
      <slot name="icon">
        <svg :class="['field__icon', 'icon icon-' + icon]" v-if="icon">
          <use :xlink:href="['#icon-' + icon ]" />
        </svg>
      </slot>
      <span class="sr-only">{{ name }}</span>
    </label>
    <slot></slot>
    <div class="focus-indicator"></div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    icon: String
  }
};
</script>

<style lang="scss">
label {
  display: block;
  font-weight: 600;
}

input[type="text"],
input[type="datetime"],
input[type="email"],
input[type="phone"],
input[type="datetime-local"],
input[type="password"],
select {
  box-sizing: border-box;
  display: block;
  width: calc(100% - 2.5rem);
  height: calc(3rem + 2px);
  padding: 0.375rem 0;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.5px;
  color: var(--white);
  background-color: transparent;
  background-clip: padding-box;

  &:focus {
    position: relative;
    outline: none;

    & + .focus-indicator {
      opacity: 1;
    }
  }
}

select {
  -webkit-appearance: none;
}

::placeholder {
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.25px;
  opacity: 0.75;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--text);
  -webkit-box-shadow: 0 0 0px 1000px var(--bg-color) inset;
}

.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-label {
  width: 2.5rem;
  height: 3rem;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
}

.form-control {
  margin-left: 2.5rem;
  border: 1px solid transparent;
  border-bottom-color: var(--border-color);
}

.field__icon {
  margin-top: 0.125rem;
  font-size: 1.125rem;
}

.focus-indicator {
  width: calc(100% - 2.5rem);
  height: 1px;
  margin-left: 2.5rem;
  background-color: var(--brand-primary);
  box-shadow: 0 0 20px var(--brand-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.form-check {
  display: flex;
  align-items: center;
}

.error {
  padding-left: 2.5rem;
  font-size: 0.9125rem;
  color: var(--text-negative);

  span {
    display: block;
    margin-top: 0.5rem;
  }
}
</style>