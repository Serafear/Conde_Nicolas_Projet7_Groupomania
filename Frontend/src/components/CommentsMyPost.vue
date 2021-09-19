<template>
  <section
    class="
      bg-pinky-1
      w-c32
      pb-1
      flex flex-col
      gap-3
      justify-center
      items-center
      border border-black
      shadow-lg
    "
  >
    <h1 class="flex mt-3 text-lg font-bold h-8">Commentaires</h1>
    <!--div principale du contenu commentaire-->
    <div
      class="
        pt-2
        h-72
        w-full
        flex flex-col
        justify-start
        items-center
        border-t-2 border-rufous
      "
    >
      <!--v-if le contenu de comment est null-->

      <!--ul>li*3.comment   raccourci-->
      <ul
        v-if="comments && comments.length"
        class="
          flex flex-col
          gap-2
          w-full
          h-4/6
          pb-2
          justify-start
          items-center
          overscroll-contain
          overflow-auto
        "
      >
        <li
          class="
            comment
            p-1
            w-72
            border border-solid border-rufous
            flex flex-col
            items-center
          "
          v-for="(comment,index) in comments"
          :key="comment.id"
          :name="`c-${index}`"
        >
          {{ comment.body }}
          <img v-if="comment.image" :src="comment.image" class=" flex w-14 mb-2"/>
          <div class="flex gap-3">
            <input
              type="button"
              value="modifier"
              id="showOrHide"
              class="px-1 rounded-md bg-an-br"
              @click.stop="showOrHide(comment)"
            />
            <input
              type="button"
              value="supprimer"
              class="px-1 rounded-md bg-an-br"
              @click="deleteComment"
            />
          </div>
          <div class="textinput flex flex-col gap-3 items-center" v-if="isOpen">
            
            <text-area-autosize-small 
            name="sendComment"
            v-model:comment="content"
            :key="comment.id"
            />
            
            <!--ici boutons confirmer et input type file-->
            <div class="flex-col flex gap-3">
              <input
                type="file"
                ref="fileUpload"
                class="hidden"
                accept="image/*"
                @change="onFileSelected"
              />
              <!--boutons pour choisir le fichier et modifier, dans commentaires-->
              <div class="flex flex-row gap-3 items-center">
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
                  @click.prevent="modifyComment(comment), showOrHide(comment)"
                  tabindex="-1"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>

      <ul v-else class="flex bg-white w-full justify-center items-center">
        <li class="noComment font-bold">aucun commentaire !</li>
      </ul>
      <!--ici on va créer la div pour créer un nouveau commentaire-->
      <div
        class="
          w-full
          h-2/6
          flex flex-col
          justify-around
          items-center
          pl-1
          border-t-2 border-rufous
        "
      >
        <h2 class="font-semibold">créer nouveau commentaire</h2>
        <form class="flex gap-4 w-full">
          <input
            type="text"
            class="text border border-black w-4/6"
            v-model="message.body"
            v-on:keyup.enter.prevent="onSubmit"
          />
          <input type="file" class="hidden" ref="file" />
          <font-awesome-icon
            icon="file-image"
            class="file-image text-2xl text-rufous"
          />
          <input
            type="button"
            class="button px-1 border border-black"
            value="envoyer"
            @click="createComment"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import TextAreaAutosizeSmall from "./TextAreaAutosizeSmall.vue";
export default {
  name: "CommentsMyPost",
  components: {
    TextAreaAutosizeSmall,
  },
  props: ["comments"],
  data() {
    return {
      //comments: [],
      message: {
        body: "",
        image: null,
      },
      content:[],
      commentId: '',
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
    //isOpen
    async showOrHide(comment){
     await this.fetchComment(comment)
      console.warn(this.commentId)
      console.warn(comment.id)
      try{
         if(!this.isOpen && comment.id == this.commentId){
        this.isOpen = ! this.isOpen
      }else(console.warn("no match"))
      }catch{}
     
  
    },

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

    async createComment() {
      const formData = new FormData();
      //formData.append("image", this.message.image, this.message.image.name);
      formData.append("body", this.content);
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
          (this.content = ""), //enlève le contenu du mssage dans l'input
            console.warn(response);
          this.fetchComments();
        });
      this.$emit("refetchPost"); //chaine de codepermettant de faire comprendre au parent qu'il y a changement. la suite dans OnePost
    },

    async modifyComment(comment){
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
    async deleteComment(comment){
      await axios
      .delete(`http://localhost:4000/api/post/${this.$route.params.postId}/comment/${comment.id}`, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((response) => {
        //this.comments = response.data;
        console.warn(response);
      });
    },

    async fetchComments() {
      await axios
        .get(`http://localhost:4000/api/post/${this.$route.params.postId}`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((response) => {
          //this.comments = response.data;
          console.warn(response);
        });
    },
    async fetchComment(comment) {
      await axios
        .get(`http://localhost:4000/api/post/${this.$route.params.postId}/comment/${comment.id}`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((response) => {
          this.commentId = response.data.id;
          
        });
        console.warn(this.commentId)
    },
  },
};
</script>