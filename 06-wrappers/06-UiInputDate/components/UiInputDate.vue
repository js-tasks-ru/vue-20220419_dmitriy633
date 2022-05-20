<template>
  <ui-input v-model="customModel" :type="type" valueAsNumber>
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator(value) {
        return ['date', 'time', 'datetime-local'].includes(value);
      },
    },
    modelValue: {
      type: Number,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    customModel: {
      get() {
        if (!this.modelValue) {
          return '';
        }

        const date = new Date(this.modelValue);
        const utcYear = date.getUTCFullYear();
        const utcMonth = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const utcDay = date.getUTCDate().toString().padStart(2, '0');
        const utcHh = date.getUTCHours().toString().padStart(2, '0');
        const utcMm = date.getUTCMinutes().toString().padStart(2, '0');

        let result = this.modelValue.toString();

        if (this.type === 'date') {
          result = `${utcYear}-${utcMonth}-${utcDay}`;
        }
        if (this.type === 'time') {
          result = `${utcHh}:${utcMm}`;
        }
        if (this.type === 'datetime-local') {
          result = `${utcYear}-${utcMonth}-${utcDay}T${utcHh}:${utcMm}`;
        }
        return result;
      },

      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
