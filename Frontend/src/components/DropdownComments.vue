<template>
<!--contenu texte, image, modif-->
  <div class="flex flex-col gap-3 border border-black items-center w-60">
    <img class="flex w-40 mt-2" :src="homecomment.image"/>
    <div class="border border-rufous p-2 w-40 flex justify-center">
      <span> {{homecomment.body}}</span>
    </div>
    <div class="flex flex-row gap-3 mb-2">
            <button
              class="
                text-black
                border border-solid border-black
                px-1
                rounded-md
              "
              @click="isShown = !isShown"
            >
              modifier
            </button>
            <button
              class="
                text-black
                border border-solid border-black
                px-1
                rounded-md
              "
              @click="deleteComment(homecomment)"
            >
              supprimer
            </button>
          </div>
          <text-area-autosize-small
            class="
              box-border
              w-40
              border border-black
              shadow-lg
              text-black
            "
            name="input"
            v-if="isShown"
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
          <div class="flex flex-row gap-3 items-center" v-if="isShown">
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
              @click.prevent="modifyComment(homecomment), (this.isShown = false)"
              tabindex="-1"
            />
          </div>
  </div>

 
</template>

<script>
import axios from "axios";
import TextAreaAutosizeSmall from "./TextAreaAutosizeSmall.vue";
export default {
  name: "DropdownComments",
  props: ["Post", "homecomment", "homecomments"],
  emits: ["refetchPost"],
  components: {
    TextAreaAutosizeSmall,
  },
  data() {
    return {
      inheritAttrs: false,
      isOpen: false,
      isShown: false,
      comment: {
        body: "",
        image: "",
      },
      content: [],
      selectedFile: null,
    };
  },
  computed: {
    //Comments() {
     //return this.$store.state.Comments;
    //},
  },
  created() {
    //this.$store.dispatch("fetchAllComments");
    this.fetchHomeComments();
    
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]; //it will take the first element in the event>target>files
      console.warn(this.selectedFile);
    },
     
     async fetchHomeComments(){
      await axios
        .get(
          `http://localhost:4000/api/post/${this.$props.homecomment.id}/comment`,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then((response) => {
          this.comment = response.data;
          console.warn(response);
        });
      
    },
  
    //pourquoi ça fonctionne avec this.$route ? alors qu'il n'y a rien dans l'url ? 
    async modifyComment(homecomment) {
      if (this.selectedFile && this.content) {
        const formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.name);
        formData.append("body", this.content);
        await axios
          .put(
            `http://localhost:4000/api/post/${this.$route.params.postId}/comment/${homecomment.id}`,
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
            this.$emit("refetchPost");
          });

        //contrairement à l'opération dans CommentsMyPost
        //this.clear();
      } else if (!this.selectedFile && this.content) {
        const formData = new FormData();
        //formData.append("image", this.message.image, this.message.image.name);
        formData.append("body", this.content);
        await axios
          .put(
            `http://localhost:4000/api/post/${this.$route.params.postId}/comment/${homecomment.id}`,
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
            `http://localhost:4000/api/post/${this.$route.params.postId}/comment/${homecomment.id}`,
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

        //contrairement à l'opération dans CommentsMyPost
        //this.clear();
      }
      //this.$emit("refetchPost");
      this.$emit("refetchPost");
    },

    //deleting comment
    async deleteComment(homecomment) {
      await axios
        .delete(
          `http://localhost:4000/api/post/${this.$route.params.postId}/comment/${homecomment.id}`,
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
          //this.$emit("fetchPosts");
          //this.$emit("fetchComments");
          //this.fetchPosts();
          //this.$store.commit("SET_POSTS");
          //return this.$store.state.Posts;
          //this.fetchHomeComments()
          //return this.$store.state.Comments
        });
        this.$emit("refetchPost");
        //this.$emit("fetchPosts");
        //this.$emit("fetchComments");
        //this.fetchPosts();
        //this.$store.commit("SET_POSTS");
        //return this.$store.state.Posts;
        //this.fetchHomeComments()
        //return this.$store.state.Comments
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