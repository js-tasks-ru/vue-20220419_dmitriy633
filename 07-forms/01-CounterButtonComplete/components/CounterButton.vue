<template>
  <button @click="increaseCount">{{ internalCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      internalCount: 0,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler(value) {
        this.internalCount = value;
      },
    },
  },

  methods: {
    increaseCount(event) {
      this.$emit('update:count', ++this.internalCount);
    },
  },
};
</script>
