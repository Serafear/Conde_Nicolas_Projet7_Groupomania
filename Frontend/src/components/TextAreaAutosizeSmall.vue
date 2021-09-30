<template>
  <textarea
    class="textarea"
    rows="1"
    :name="name"
    :id="name"
    @input="resize($event)"
    @change="$emit('update:comment', $event.target.value)"
    :value="comment"
  >
  </textarea>
</template>

<script>
export default {
  name: "TextAreaAutosizeSmall",
  props: {
    name: {
      required: true,
      type: String,
    },

    modelValue: {
      required: false,
    },
    comment: {
      required: false,
    },
    modelModifiers: {
      default: () => ({}),
    },
    commentModifiers: {
      default: () => ({}),
    },
  },
  emits: ["update:modelValue", "update:comment"],
  methods: {
    resize(e) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
  },
};
</script>
