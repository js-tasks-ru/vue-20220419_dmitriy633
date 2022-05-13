<template>
  <div class="toast" :class="extraCls">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

const icons = {
  success: 'check-circle',
  error: 'alert-circle',
};

const classes = {
  success: 'toast_success',
  error: 'toast_error',
};

export default {
  name: 'UiToast',

  components: { UiIcon },

  props: {
    message: String,
    type: String,
  },

  data() {
    return {
      icons,
      classes,
    };
  },

  computed: {
    extraCls() {
      return this.classes[this.type];
    },
    icon() {
      return this.icons[this.type];
    },
  },
};
</script>

<style scoped>
.toast__icon {
  margin-right: 12px;
}
</style>
