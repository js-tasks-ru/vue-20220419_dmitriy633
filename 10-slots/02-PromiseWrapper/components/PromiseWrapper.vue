<template>
  <slot :name="status" :result="result" :error="error" />
</template>

<script>
import { fetchMeetups } from '../../../05-vue-router/03-ScrollBehavior/api';

export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      status: null,
      result: null,
      error: null,
    };
  },

  watch: {
    promise: {
      immediate: true,
      handler(promise) {
        this.status = 'pending';
        this.promise
          .then((meetup) => {
            this.result = meetup;
            this.status = 'fulfilled';
          })
          .catch((error) => {
            this.error = error;
            this.status = 'rejected';
          });
      },
    },
  },
};
</script>
