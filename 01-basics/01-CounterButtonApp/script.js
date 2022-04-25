import { createApp } from './vendor/vue.esm-browser.js';

const root = {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    handleClick() {
      this.count += 1;
    },
  },
};

const app = createApp(root);
app.mount('#app');
