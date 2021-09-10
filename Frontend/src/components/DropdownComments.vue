<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="
        dropButton
        relative
        z-10
        w-full
        h-full
        outline-none
        hover:text-rufous
        border
        rounded-xl
        p-2
        text-ox-bl
      "
    >
      <font-awesome-icon
        icon="comment"
        class="comment text-2xl text-rufous mt-1"
      />
      <!--le z-index ne peut pas marcher sans une position ex: relative-->
    </button>
    <!--on va crée un bouton qui va fermer le toggle si on appui en dehors du toggle-->
    <button
      id="exit-button"
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed inset-0 h-full w-full bg-ox-bl bg-opacity-50 cursor-default"
    ></button>
    <!--le tab index -1 rend le bouton inaccessible aux manips clavier et inset fait top mid left right-0-->
    <div
      v-if="isOpen"
      class="
        -right-3
        absolute
        z-20
        mt-6
        text-gunmetal
        p-2
        w-96
        bg-white
        rounded-xl
        overflow-hidden
        shadow-xl
      "
    >
      <ul class="commentList" v-for="Comment in Comments" :key="Comment.id">
        <!--aide toi d'insomnia pour voir quoi comparer.
       ici on regarde si le postId dans le comment est le même que
       celui du Post depuis lequel le commentaire a été crée.
       Si c'est le cas alors il affiche les commentaires-->
        <li v-if="Comment.post.id == Post.id">{{ Comment.body }}</li>
      </ul>
      <div class="flex flex-row gap-4">
        <input
          class="border border-black lg:w-5/6 text-gunmetal"
          type="text"
          v-model="comment.body"
        />
        <!--on associe la valeur de l'input qu'on va entrer à: body-->
        <button @click="createComment" class="text-gunmetal">
          <font-awesome-icon
            icon="paper-plane"
            class="text-2xl text-gunmetal"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DropdownComments",
  props: ["Post"],
  data() {
    return {
      isOpen: false,

      comment: {
        body: "",
        image: null,
      },
    };
  },
  computed: {
    Comments() {
      return this.$store.state.Comments;
    },
  },
  created() {
    this.$store.dispatch("fetchAllComments");
  },
  methods: {
    async createComment() {
      const formData = new FormData();
      //formData.append("image", this.message.image, this.message.image.name);
      formData.append("body", this.comment.body);
      formData.append("userId", this.$store.state.userId);
      formData.append("postId", this.Post.id);
      let myComment = await axios.post(
        `http://localhost:4000/api/post/${this.Post.id}/comment`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.warn(myComment);
    },
  },
};
</script>

<style scoped>
.dropButton {
  background-color: #f9e7e7;
}
.comment {
  color: #a40606;
}
.owner .dropButton {
  background-color: #a40606;
  border-color: #a40606;
}
.owner .comment {
  color: white;
}
</style>