<template>
  <Header />
  <post-my-post :mypost="post" @refetchPost="refreshPost" />

  <Reactions :reactions="post.Reactions" @refetchPost="refreshPost" />
  <div
    class="
      flex flex-col
      items-center
      bg-an-br
      h-80
      overscroll-contain
      overflow-auto
      lg:w-2/4
      md:w-2/4
      w-full
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
  </div>
  <div v-else class="w-c30 h-40 flex justify-center items-center">
    <p class="font-bold text-2xl">Aucun commentaire</p>
  </div>

  <div
    class="
      flex flex-col
      lg:flex-row
      justify-center
      items-center
      w-full
      lg:w-2/4
      md:w-2/4
      gap-3
      py-1
      bg-rufous
    "
  >
    <text-area-autosize
      name="file"
      class="box-border w-4/6 ml-4 border border-black shadow-lg text-black"
      v-model="message.body"
    />
    <div class="flex flex-row gap-3 w-full justify-around items-center">
      <p class="font-bold">Choisir un fichier :</p>
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
  inheritAttrs: false,

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
  computed: {},
  async created() {
    this.refreshPost();
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.warn(this.selectedFile);
    },

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
      } else if (this.selectedFile && !this.message.body) {
        const formData = new FormData();

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
