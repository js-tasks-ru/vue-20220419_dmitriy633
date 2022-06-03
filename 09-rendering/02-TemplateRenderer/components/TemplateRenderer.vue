<script>
import { compile, h, defineComponent, createApp } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    renderer() {
      return defineComponent({
        name: 'UiTemplateRenderer',
        components: this.components,
        props: {
          bindings: null,
        },
        template: this.template,
      });
    },
  },

  render() {
    return h(this.renderer, { bindings: this.bindings });
  },
};
</script>
