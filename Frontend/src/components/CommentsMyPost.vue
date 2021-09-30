<template>
  <div
    class="
      flex flex-col
      justify-center
      items-center
      mt-3
      mb-2
      border-rufous border
      w-60
      max-w-full
    "
  >
    <img class="flex w-28 mt-2" :src="comment.image" />
    <p>{{ comment.body }}</p>
    <div class="flex flex-row gap-3 mb-2">
      <button
        class="text-black border border-solid border-black px-1 rounded-md"
        @click="isOpen = !isOpen"
      >
        modifier
      </button>
      <button
        class="text-black border border-solid border-black px-1 rounded-md"
        @click="deleteComment(comment)"
      >
        supprimer
      </button>
    </div>
    <text-area-autosize-small
      class="box-border w-38 mt-2 border border-black shadow-lg text-black"
      name="input"
      v-if="isOpen"
      v-model:comment="content"
    />
    <input
      type="file"
      ref="fileUpload"
      class="hidden"
      accept="image/*"
      @change="onFileSelected"
    />
    <div class="flex flex-row gap-3 items-center mt-2" v-if="isOpen">
      <p>Choisir fichier :</p>
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
        @click.prevent="modifyComment(comment), (this.isOpen = false)"
        tabindex="-1"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TextAreaAutosizeSmall from "./TextAreaAutosizeSmall.vue";
export default {
  name: "CommentsMyPost",
  components: {
    TextAreaAutosizeSmall,
  },
  props: ["comments", "comment"],
  data() {
    return {
      content: [],
      commentId: "",
      post: null,
      isOpen: false,
      selectedFile: null,
    };
  },

  async created() {
    let handleEnter = (e) => {
      if (e.key === "Entrée" || e.key === "Enter") {
        e.preventDefault();
        this.createComment();
      }
    };

    document.addEventListener("keydown", handleEnter);
  },
  methods: {
    clear() {
      const input = this.$refs.fileUpload;
      input.type = "text";
      input.type = "file";
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.warn(this.selectedFile);
    },

    async modifyComment(comment) {
      if (this.selectedFile && this.content) {
        const formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.name);
        formData.append("body", this.content);
        await axios
          .put(
            `http://localhost:4000/api/post/${this.$route.params.postId}/comment/${comment.id}`,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            }
          )
          .then((response) => {
            (this.content = ""), console.warn(response);
            this.$emit("refetchPost");
          });

        this.clear();
      } else if (!this.selectedFile && this.content) {
        const formData = new FormData();

        formData.append("body", this.content);
        await axios
          .put(
            `http://localhost:4000/api/post/${this.$route.params.postId}/comment/${comment.id}`,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            }
          )
          .then((response) => {
            (this.content = ""), console.warn(response);
            this.$emit("refetchPost");
          });
      } else if (this.selectedFile && !this.content) {
        const formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.name);

        await axios
          .put(
            `http://localhost:4000/api/post/${this.$route.params.postId}/comment/${comment.id}`,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
              onUploadProgress: (uploadEvent) => {
                console.warn(
                  "Upload Progress" +
                    Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
                    "%"
                );
              },
            }
          )
          .then((response) => {
            console.warn(response);
            this.$emit("refetchPost");
          });

        this.clear();
      }
      this.$emit("refetchPost");
    },

    async deleteComment(comment) {
      await axios
        .delete(
          `http://localhost:4000/api/post/${this.$route.params.postId}/comment/${comment.id}`,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then((response) => {
          console.warn(response);
          this.$emit("refetchPost");
        });
      this.$emit("refetchPost");
    },

    async fetchComment(comment) {
      await axios
        .get(
          `http://localhost:4000/api/post/${this.$route.params.postId}/comment/${comment.id}`,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then((response) => {
          this.commentId = response.data.id;
        });
      console.warn(this.commentId);
    },
  },
};
</script>
