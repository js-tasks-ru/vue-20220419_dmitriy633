<template>
  <div class="toasts">
    <ui-toast v-for="toast in toasts" :key="toast" :type="toast.type" :message="toast.message" />
  </div>
</template>

<script>
import UiToast from './UIToast';

export default {
  name: 'TheToaster',

  components: { UiToast },

  props: {
    timeout: {
      type: Number,
      default: 5000,
    },
  },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    success(message) {
      this.add('success', message);
    },

    error(message) {
      this.add('error', message);
    },

    add(type, message) {
      this.toasts.push({ type, message });
      setTimeout(this.remove, this.timeout);
    },

    remove() {
      this.toasts.shift();
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
