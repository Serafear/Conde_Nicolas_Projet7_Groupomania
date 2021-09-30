<template>
  <div
    v-if="myHomeReact[0]"
    class="flex flex-row justify-center items-center gap-4"
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
      <button @click="createLike(allPost)">
        <font-awesome-icon
          icon="thumbs-up"
          class="t-up text-2xl text-rufous"
          :style="[myHomeReact[0].isLike == 'like' ? { color: '#EFEA5A' } : {}]"
        />
      </button>
      <span>{{ resultHomeLike.length }}</span>
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
      <button @click="createDislike(allPost)">
        <font-awesome-icon
          icon="thumbs-down"
          class="t-down text-2xl text-rufous"
          :style="[
            myHomeReact[0].isLike == 'dislike' ? { color: '#EFEA5A' } : {},
          ]"
        />
      </button>
      <span>{{ resultHomeDislike.length }}</span>
    </div>
  </div>

  <div v-else class="flex flex-row justify-center items-center gap-4">
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
      <button @click="createLike(allPost)">
        <font-awesome-icon icon="thumbs-up" class="t-up text-2xl text-rufous" />
      </button>
      <span>{{ resultHomeLike.length }}</span>
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
      <button @click="createDislike(allPost)">
        <font-awesome-icon
          icon="thumbs-down"
          class="t-down text-2xl text-rufous"
        />
      </button>
      <span>{{ resultHomeDislike.length }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RactionsHome",
  props: ["allPost"],
  data() {
    return {
      id: this.$props.allPost.id,
      responseHomeData: [],
      isLike: {
        Liked: "like",
        Disliked: "dislike",
      },
    };
  },
  created() {
    this.getAllHomeReactions("allPost");
  },
  computed: {
    resultHomeLike(allPost) {
      return this.responseHomeData.filter(
        (reaction) => reaction.isLike == "like" && reaction.postId == allPost.id
      );
    },
    resultHomeDislike(allPost) {
      return this.responseHomeData.filter(
        (reaction) =>
          reaction.isLike == "dislike" && reaction.postId == allPost.id
      );
    },
    myHomeReact(allPost) {
      return this.responseHomeData.filter(
        (reaction) =>
          reaction.postId == allPost.id &&
          reaction.userId == this.$store.state.userId
      );
    },
  },
  methods: {
    async getAllHomeReactions(allPost) {
      const allPostId = allPost.id;
      await axios
        .get(`http://localhost:4000/api/post/${allPostId}/react`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((response) => {
          (this.responseHomeData = response.data), console.warn(response);
        });
    },

    async createLike(allPost) {
      const allPostId = allPost.id;
      await axios
        .post(
          `http://localhost:4000/api/post/${allPostId}/react`,
          {
            userId: this.$store.state.userId,
            postId: this.$props.allPost.id,
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
          this.getAllHomeReactions(allPost);
        });
    },
    async createDislike(allPost) {
      const allPostId = allPost.id;
      await axios
        .post(
          `http://localhost:4000/api/post/${allPostId}/react`,
          {
            userId: this.$store.state.userId,
            postId: this.$props.allPost.id,
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
          this.getAllHomeReactions(allPost);
        });
    },
  },
};
</script>

<style scoped>
.owner .t-up,
.owner .t-down {
  color: white;
}
</style>
