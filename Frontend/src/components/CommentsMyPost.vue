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
      <button class="text-black border border-solid border-black px-1 rounded-md"
      @click="isOpen = !isOpen"
      >
        modifier
      </button>
      <button class="text-black border border-solid border-black px-1 rounded-md"
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
    <!--boutons pour choisir le fichier et modifier, dans commentaires-->
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
        @click.prevent="modifyComment(comment), this.isOpen = false"
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
      //comments: [],
      
      content: [],
      commentId: "",
      post: null,
      isOpen: false,
      selectedFile: null,
    };
  },

  async created() {
    //on va créer un code qui va creée comment en appuyant sur entrée
    let handleEnter = (e) => {
      if (e.key === "Entrée" || e.key === "Enter") {
        e.preventDefault();
        this.createComment();
      }
    };

    document.addEventListener("keydown", handleEnter);

    //une methode axios pour recupérer les éléments d'une array
    //function fetchAllComments
    /*await axios
      .get(
        `http://localhost:4000/api/post/${this.$route.params.postId}/comment`,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      )
      .then((response) => {
        this.comments = response.data;
        console.warn(response);
      });*/
  },
  methods: {

    //foncion pour enlever le nom de l'image d'input
    clear() {
      const input = this.$refs.fileUpload;
      input.type = "text";
      input.type = "file";
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0]; //it will take the first element in the event>target>files
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
            (this.content = ""), //enlève le contenu du mssage dans l'input
              console.warn(response);
            this.$emit("refetchPost"); //change dynamiquement le contenu
          });

        //contrairement à l'opération dans CommentsMyPost
        this.clear();
      } else if (!this.selectedFile && this.content) {
        const formData = new FormData();
        //formData.append("image", this.message.image, this.message.image.name);
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
            (this.content = ""),
              //enlève le contenu du mssage dans l'input
              console.warn(response);
            this.$emit("refetchPost");
          });

        //contrairement à l'opération dans CommentsMyPost
      } else if (this.selectedFile && !this.content) {
        const formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.name);
        //formData.append("body", this.form.body);
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
            this.$emit("refetchPost"); //change dynamiquement le contenu. On refetch symplement le post ici
          });

        //contrairement à l'opération dans CommentsMyPost
        this.clear();
      }
      this.$emit("refetchPost");
    },

    //deleting comment
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
          //this.comments = response.data;
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