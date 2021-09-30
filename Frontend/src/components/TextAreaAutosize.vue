<template>
  <textarea
    class="textarea"
    rows="1"
    :name="name"
    :id="name"
    @input="
      $emit('update:modelValue', $event.target.value);
      resize($event);
    "
    :value="modelValue"
  >
  </textarea>
</template>

<script>
export default {
  name: "TextAreaAutosize",
  props: {
    name: {
      required: true,
      type: String,
    },

    modelValue: {
      required: false,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    resize(e) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
  },
};
</script>
