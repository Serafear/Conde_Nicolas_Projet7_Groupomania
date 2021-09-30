<template>
  <div
    v-if="myReact[0]"
    class="flex flex-row gap-4 mt-3 mb-3 justify-center items-center"
  >
    <div
      class="
        flex flex-row
        justify-center
        items-center
        gap-2
        border border-solid border-black
        p-1
      "
    >
      <button @click="createLike">
        <font-awesome-icon
          icon="thumbs-up"
          class="t-up text-2xl text-rufous"
          :style="[myReact[0].isLike == 'like' ? { color: 'blue' } : {}]"
        />
      </button>
      <span>{{ resultLike.length }}</span>
    </div>
    <div
      class="
        flex flex-row
        justify-center
        items-center
        gap-2
        border border-solid border-black
        p-1
      "
    >
      <button @click="createDislike">
        <font-awesome-icon
          icon="thumbs-down"
          class="t-down text-2xl text-rufous"
          :style="[myReact[0].isLike == 'dislike' ? { color: 'blue' } : {}]"
        />
      </button>
      <span>{{ resultDislike.length }}</span>
    </div>
  </div>

  <div v-else class="flex flex-row gap-4 mt-3 mb-3 justify-center items-center">
    <div
      class="
        flex flex-row
        justify-center
        items-center
        gap-2
        border border-solid border-black
        p-1
      "
    >
      <button @click="createLike">
        <font-awesome-icon icon="thumbs-up" class="t-up text-2xl text-rufous" />
      </button>
      <span>{{ resultLike.length }}</span>
    </div>
    <div
      class="
        flex flex-row
        justify-center
        items-center
        gap-2
        border border-solid border-black
        p-1
      "
    >
      <button @click="createDislike">
        <font-awesome-icon
          icon="thumbs-down"
          class="t-down text-2xl text-rufous"
        />
      </button>
      <span>{{ resultDislike.length }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  inheritAttrs: false,
  name: "Reactions",
  props: ["reactions"],
  data() {
    return {
      isLike: {
        Liked: "like",
        Disliked: "dislike",
      },
      responseData: [],
      postId: this.$route.params.postId,
      likeActive: false,
      dislikeActive: false,
    };
  },
  created() {
    this.getAllReactions();
    this.getMyReaction("reactId");
  },
  computed: {
    resultLike() {
      return this.responseData.filter(
        (reaction) =>
          reaction.isLike == "like" && reaction.postId == this.postId
      );
    },
    resultDislike() {
      return this.responseData.filter(
        (reaction) =>
          reaction.isLike == "dislike" && reaction.postId == this.postId
      );
    },
    myReact() {
      return this.responseData.filter(
        (reaction) =>
          reaction.postId == this.postId &&
          reaction.userId == this.$store.state.userId
      );
    },
  },
  methods: {
    async createLike() {
      await axios
        .post(
          `http://localhost:4000/api/post/${this.$route.params.postId}/react`,
          {
            userId: this.$store.state.userId,
            postId: this.$route.params.postId,
            isLike: this.isLike.Liked,
          },
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then((reponse) => {
          console.warn(reponse);
          this.getAllReactions();
        });
      this.$emit("refetchPost");
    },
    async createDislike() {
      await axios
        .post(
          `http://localhost:4000/api/post/${this.$route.params.postId}/react`,
          {
            userId: this.$store.state.userId,
            postId: this.$route.params.postId,
            isLike: this.isLike.Disliked,
          },
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then((reponse) => {
          console.warn(reponse);
          this.getAllReactions();
        });
      this.$emit("refetchPost");
    },

    async getAllReactions() {
      await axios
        .get(
          `http://localhost:4000/api/post/${this.$route.params.postId}/react`,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then((response) => {
          (this.responseData = response.data), console.warn(response);
        });
    },

    async getMyReaction(reactid) {
      const myReactId = await reactid.id;
      await axios
        .get(
          `http://localhost:4000/api/post/${this.$route.params.postId}/react/${myReactId}`,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then((response) => {
          (this.myReaction = response.data), console.warn(response);
        });
    },
  },
};
</script>

<style scoped>
.owner .t-up,
.owner .t-down {
  color: yellow;
}
</style>
