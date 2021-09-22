<template >
  <Header />
  <post-my-post :mypost="post" @refetchPost="refreshPost" />

  <!--ici, on aura les reactions-->
  <Reactions :reactions="post.Reactions" @refetchPost="refreshPost" />
  <div
    class="
      flex flex-col
      items-center
      bg-an-br
      h-80
      overscroll-contain
      overflow-auto
      w-c32
    "
    v-if="post.Comments && post.Comments.length"
  >
    <CommentsMyPost
      :comments="post.Comments"
      @refetchPost="refreshPost"
      v-for="comment in post.Comments"
      :key="comment.id"
      :comment="comment"
    />
    <!--on a changé le backend pour inclure comments dans le post. le :comments passera les commentaires en props SUPER IMPORTANT ET PRATIQUE-->
    <!--le @refreshPost est la fonction crée dans le methods en relation avec le $emit chez l'enfant-->
  </div>
  <div v-else class="w-c30 h-40 flex justify-center items-center">
    <p class="font-bold text-2xl">Aucun commentaire</p>

  </div>
  <!--ici, on aura la modif et suppression du post sous conditions-->
  <div
    class="flex flex-row justify-center items-center w-c32 gap-3 py-1 bg-rufous"
  >
    <text-area-autosize
      name="file"
      class="box-border w-3/6 ml-4 border border-black shadow-lg text-black"
      v-model="message.body"
    />
    <p class="font-bold">Fichier :</p>
    <input
      type="file"
      ref="fileUpload"
      class="hidden"
      accept="image/*"
      @change="onFileSelected"
    />
    <button
      class="
        flex flex-row
        gap-2
        bg-an-br
        p-1
        border border-dotted border-rufous
        animate-pulse
      "
      @click="$refs.fileUpload.click()"
    >
      <font-awesome-icon
        icon="file-image"
        class="file-image text-2xl text-rufous"
      />
    </button>

    <input
      type="button"
      class="confirmer border border-black px-1 bg-an-br rounded-md"
      value="confirmer"
      @click="createComment"
      tabindex="-1"
    />
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
import Reactions from "./Reactions.vue";
import CommentsMyPost from "./CommentsMyPost.vue";
import PostMyPost from "./PostMyPost.vue";
import TextAreaAutosize from "./TextAreaAutosize.vue";
export default {
  name: "OnePost",
  inheritAttrs: false, //stop the Extraneous non-props attributess
  //props: ["id"],
  //props:["Post"],
  components: {
    Header,
    Reactions,
    CommentsMyPost,
    TextAreaAutosize,
    PostMyPost,
  },
  data() {
    return {
      post: {
        body: "",
        image: "",
        user: {
          nom: "",
          createdAt: "",
        },
      },
      selectedFile: null,
      message: {
        body: "",
        image: null,
      },
    };
  },
  computed: {
    //Post() {
    //   return this.$store.state.Post;
    // },
  },
  async created() {
    //methode store :await this.$store.dispatch("fetchPost", this.id); ne fonctionne pas en l'état

    this.refreshPost(); //rappelle ici
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]; //it will take the first element in the event>target>files
      console.warn(this.selectedFile);
    },

    //suite du code $emit. crée une fonction qui sera appellée pour rafraichir le parent (méthode props)
    async refreshPost() {
      let fetchPost = await axios.get(
        "http://localhost:4000/api/post/" + this.$route.params.postId,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.warn(fetchPost);
      this.post = fetchPost.data;
    },

    async createComment() {
      if (!this.selectedFile && this.message.body) {
        const formData = new FormData();
        //formData.append("image", this.message.image, this.message.image.name);
        formData.append("body", this.message.body);
        formData.append("userId", this.$store.state.userId);
        formData.append("postId", this.$route.params.postId);
        await axios
          .post(
            `http://localhost:4000/api/post/${this.$route.params.postId}/comment`,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            }
          )
          .then((response) => {
            (this.message.body = ""), //enlève le contenu du mssage dans l'input
              console.warn(response);
            this.refreshPost();
          });
      } else if (this.selectedFile && !this.message.body) {
        const formData = new FormData();
        //formData.append("image", this.message.image, this.message.image.name);
        formData.append("image", this.selectedFile, this.selectedFile.name);
        formData.append("userId", this.$store.state.userId);
        formData.append("postId", this.$route.params.postId);
        await axios
          .post(
            `http://localhost:4000/api/post/${this.$route.params.postId}/comment`,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            }
          )
          .then((response) => {
            console.warn(response);
            this.refreshPost();
          });
      } else if (this.selectedFile && this.message.body) {
        const formData = new FormData();
        //formData.append("image", this.message.image, this.message.image.name);
        formData.append("image", this.selectedFile, this.selectedFile.name);
        formData.append("body", this.message.body);
        formData.append("userId", this.$store.state.userId);
        formData.append("postId", this.$route.params.postId);
        await axios
          .post(
            `http://localhost:4000/api/post/${this.$route.params.postId}/comment`,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            }
          )
          .then((response) => {
            (this.message.body = ""), console.warn(response);
            this.refreshPost();
          });
      }
    },
  },
};
</script>

