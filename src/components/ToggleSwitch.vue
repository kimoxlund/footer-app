<template>
  <div class="switch-wrapper">
    <label class="switch-label" :for="id">{{ label }}</label>
    <label class="switch" :for="id">
      <input
        type="checkbox"
        :id="id"
        :checked="checked"
        @change="$emit('change', $event.target.checked)"
      />
      <div class="slider round"></div>
    </label>
  </div>
</template>

<script>
export default {
  name: "toogleSwitch",

  model: {
    prop: "checked",
    event: "change"
  },

  props: {
    checked: Boolean,
    id: String,
    label: String
  }
};
</script>

<style lang="scss" scoped>
.switch-wrapper {
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 2.5rem;
  border-bottom: 1px solid var(--border-color);
}

.switch {
  display: inline-block;
  position: relative;
  height: 26px;
  width: 50px;
}

.switch-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.switch-label {
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.25px;
  opacity: 0.75;
}

.switch input {
  display: none;
}

.slider {
  background-color: var(--border-color);
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
}

.slider:before {
  background-color: var(--toggle-dot);
  bottom: 4px;
  content: "";
  height: 18px;
  left: 4px;
  position: absolute;
  transition: 0.4s;
  width: 18px;
}

input:checked + .slider {
  background-color: var(--brand-primary);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.list-toggle {
  height: 1.5rem;
  margin-left: 1rem;
  border-bottom: none;

  .switch-label {
    padding-right: 0.5rem;
  }
}
</style>