import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      method: null,
      isLoading: false,
      error: false,
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      async handler(value) {
        this.meetup = null;
        this.error = null;
        this.isLoading = true;

        try {
          this.meetup = await fetchMeetupById(value);
        } catch (e) {
          this.error = e.message;
        } finally {
          this.isLoading = false;
        }
      },
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view :meetup="meetup" v-if="meetup"/>

      <template v-else>
        <ui-container v-if="isLoading">
          <ui-alert>Загрузка...</ui-alert>
        </ui-container>

        <ui-container v-else-if="error">
          <ui-alert>{{ error }}</ui-alert>
        </ui-container>
      </template>
    </div>`,
});
