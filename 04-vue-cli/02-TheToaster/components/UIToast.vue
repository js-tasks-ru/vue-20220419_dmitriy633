<template>
  <div class="toast" :class="extraCls">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'UiToast',

  components: { UiIcon },

  props: {
    message: String,
    type: String,
  },

  computed: {
    extraCls() {
      const classes = {
        success: 'toast_success',
        error: 'toast_error',
      };
      return classes[this.type];
    },
    icon() {
      const icons = {
        success: 'check-circle',
        error: 'alert-circle',
      };
      return icons[this.type];
    },
  },
};
</script>

<style scoped>
.toast__icon {
  margin-right: 12px;
}
</style>
