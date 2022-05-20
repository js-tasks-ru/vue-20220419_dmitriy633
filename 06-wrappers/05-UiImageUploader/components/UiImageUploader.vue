<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': status === 'loading' }"
      :style="preview && `--bg-url: url('${preview}')`"
      @click="onImageClick"
    >
      <span class="image-uploader__text">{{ text }}</span>

      <input
        ref="fileInput"
        type="file"
        v-bind="$attrs"
        accept="image/*"
        class="image-uploader__input"
        @change="onChangeFile"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      fileObject: null,
      status: null,
    };
  },

  computed: {
    text() {
      const statusToText = {
        empty: 'Загрузить изображение',
        loading: 'Загрузка...',
        loaded: 'Удалить изображение',
      };
      return statusToText[this.status];
    },
  },

  watch: {
    preview: {
      immediate: true,
      handler(value) {
        this.status = value ? 'loaded' : 'empty';
      },
    },
  },

  methods: {
    reset() {
      this.$refs.fileInput.value = '';
      this.fileObject = null;
    },

    async upload(file) {
      return (this.uploader && (await this.uploader(file))) || { image: URL.createObjectURL(file) };
    },

    onImageClick(e) {
      const hasFile = this.preview || this.fileObject;

      if (hasFile) {
        e.preventDefault();
        this.reset();

        this.$emit('remove');
        this.status = 'empty';
      }
    },

    async onChangeFile(event) {
      const fileObj = event.target.files[0];

      this.status = 'loading';
      this.$emit('select', fileObj);

      try {
        const uploadedFileObj = await this.upload(fileObj);
        this.fileObject = fileObj;

        this.$emit('upload', uploadedFileObj);
        this.status = 'loaded';
      } catch (e) {
        this.reset();

        this.$emit('error', e);
        this.status = 'empty';
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
