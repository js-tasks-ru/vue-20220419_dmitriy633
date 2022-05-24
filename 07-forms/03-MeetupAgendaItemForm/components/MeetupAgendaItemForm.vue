<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown
        v-model="internalAgendaItem.type"
        title="Тип"
        :options="$options.agendaItemTypeOptions"
        name="type"
      />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input
            :model-value="internalAgendaItem.startsAt"
            type="time"
            placeholder="00:00"
            name="startsAt"
            @change="changeStartsAt(internalAgendaItem, $event)"
          />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input v-model="internalAgendaItem.endsAt" type="time" placeholder="00:00" name="endsAt" />
        </ui-form-group>
      </div>
    </div>

    <ui-form-group :label="titleText">
      <ui-input v-model="internalAgendaItem.title" name="title" />
    </ui-form-group>
    <ui-form-group v-if="internalAgendaItem.type === 'talk'" label="Докладчик">
      <ui-input v-model="internalAgendaItem.speaker" name="speaker" />
    </ui-form-group>
    <ui-form-group v-if="['talk', 'other'].includes(internalAgendaItem.type)" label="Описание">
      <ui-input v-model="internalAgendaItem.description" multiline name="description" />
    </ui-form-group>
    <ui-form-group v-if="internalAgendaItem.type === 'talk'" label="Язык">
      <ui-dropdown
        v-model="internalAgendaItem.language"
        title="Язык"
        :options="$options.talkLanguageOptions"
        name="language"
      />
    </ui-form-group>
  </fieldset>
</template>

<script>
import moment from 'moment';

import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:agendaItem', 'remove'],

  data() {
    return {
      internalAgendaItem: { ...this.agendaItem },
    };
  },

  computed: {
    titleText() {
      const typeToTitle = {
        talk: 'Тема',
        other: 'Заголовок',
      };
      return typeToTitle[this.internalAgendaItem.type] || 'Нестандартный текст (необязательно)';
    },
  },

  watch: {
    internalAgendaItem: {
      deep: true,
      handler(value) {
        this.$emit('update:agendaItem', value);
      },
    },
  },

  methods: {
    changeStartsAt(agendaItem, event) {
      const format = 'HH:mm';
      const newStartsAt = event.target.value;
      const startsAtMoment = moment(agendaItem.startsAt, format);
      const endsAtMoment = moment(agendaItem.endsAt, format);
      const newEndsAtMoment = moment(newStartsAt, format).add(endsAtMoment.diff(startsAtMoment), 'ms');
      const newEndsAt = newEndsAtMoment.format(format);

      this.internalAgendaItem.startsAt = newStartsAt;
      this.internalAgendaItem.endsAt = newEndsAt;
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
