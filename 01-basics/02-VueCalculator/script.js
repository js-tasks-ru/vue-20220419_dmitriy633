import { createApp } from './vendor/vue.esm-browser.js';

const root = {
  data() {
    return {
      a: 0,
      b: 0,
      operator: 'sum',
    };
  },
  computed: {
    result() {
      if (this.operator === 'sum') return this.a + this.b;
      if (this.operator === 'subtract') return this.a - this.b;
      if (this.operator === 'multiply') return this.a * this.b;
      if (this.operator === 'divide') return this.a / this.b;
      return 0;
    },
  },
};

const app = createApp(root);
app.mount('#app');
