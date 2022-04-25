import { createApp } from './vendor/vue.esm-browser.js';
import { emails } from './data/email.js';

const root = {
  data() {
    return {
      search: '',
    };
  },
  computed: {
    filteredEmails() {
      return emails.map((name) => {
        const regex = new RegExp(this.search, 'gi');
        const marked = !!this.search && regex.test(name);

        return { marked, name };
      });
    },
  },
};

const app = createApp(root);
app.mount('#app');
