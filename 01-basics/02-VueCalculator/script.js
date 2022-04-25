import { createApp } from './vendor/vue.esm-browser.js';

const root = {
  data() {
    return {
      a: 0,
      b: 0,
      result: 0,
      operator: 'sum',
    };
  },
  watch: {
    a() {
      this.calculate();
    },
    b() {
      this.calculate();
    },
    operator() {
      this.calculate();
    },
  },
  methods: {
    calculate() {
      switch (this.operator) {
        case 'sum':
          this.result = this.a + this.b;
          break;
        case 'subtract':
          this.result = this.a - this.b;
          break;
        case 'multiply':
          this.result = this.a * this.b;
          break;
        case 'divide':
          this.result = this.a / this.b;
          break;
      }
    },
  },
};

const app = createApp(root);
app.mount('#app');
