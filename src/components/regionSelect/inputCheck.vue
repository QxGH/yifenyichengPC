<template>
  <label class="checkbox" :class="{'is-disabled':disable==1}">
    <span
      class="checkbox__input"
      :class="disable == 1 ? 'is-disabled' : checked == 3 ? 'is-checked' : checked == 2 ? 'is-indeterminate':''"
    >
      <span class="checkbox__inner"></span>
      <input type="checkbox" class="hidden-input" />
    </span>
    <span>
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "input-check",
  props: {
    checked: {
      type: [Number, String],
      default: 1,
    },
    disable: {
      type: [Boolean, Number],
      default: false,
    },
  },
};
</script>

<style>
	@import url('./style/index.min.css');
</style>