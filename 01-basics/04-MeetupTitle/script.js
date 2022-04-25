import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const root = {
  data() {
    return {
      meetupId: 1,
      title: '',
    };
  },
  watch: {
    meetupId(value) {
      this.setTitle(value);
    },
  },
  methods: {
    async setTitle(value) {
      this.title = (await fetchMeetupById(value)).title;
    },
  },
  created() {
    this.setTitle(1);
  },
};

const app = createApp(root);
app.mount('#app');
