<template>
  <div class="flex flex-row gap-3 mt-1 justify-end">
    <div>
      <button @click="createLike">
        <font-awesome-icon icon="thumbs-up" class="t-up text-2xl text-rufous" />
      </button>
      <div></div>
    </div>
    <div>
      <button>
        <font-awesome-icon
          icon="thumbs-down"
          class="t-down text-2xl text-rufous mt-1"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reactions",
  props: ["Post"],
  computed: {
     isLike(){
        return this.$store.state.isLike;
     }
  },
  created() {
    this.$store.dispatch("fetchAllReactions");
  },
  methods: {
    createLike(){
      this.$store.dispatch("addALike")
    }
  }
};
</script>

<style scoped>
.owner .t-up,
.owner .t-down {
  color: white;
}
</style>