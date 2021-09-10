<template >
  <Header />
  <div
    id="post"
    class="
      flex flex-col
      bg-black
      text-snow
      pb-4
      mt-10
      h-96
      w-2/4
      overscroll-contain
      overflow-auto
    "
    :class="{ myPost: post.user.id == $store.state.userId }"
  >
    <!--ici, on aura le contenu du post. le v-bind="$attrs" arrête l'erreur: Extraneous non-props attributes-->
    <div class="flex flex-col gap-4 ml-4 mt-3 w-c30" v-bind="$attrs">
      <span>{{ post.user.nom }}</span>
      <div class="flex flex-row gap-4">
        <span class="w-3/5 break-words">{{ post.body }} </span>
        <img class="flex w-2/6" :src="post.image" />
      </div>

      <span>{{ post.user.createdAt }}</span>
    </div>

    <!--ici on aura la suppression et la modif du message-->
    <div class="flex flex-row gap-3 mt-7 pl-4">
      <input
        type="button"
        class="modifier border border-black p-1 rounded-md w-20"
        value="modifier"
      />
      <input
        type="button"
        class="supprimer border border-black p-1 rounded-md w-20"
        value="supprimer"
        @click="modifyPost"
      />
    </div>
    <!--ici on aura l'input de la modif-->
    <!--il faudra remplacer tout les input type text par textarea.
    Les rows et cols gèrent la hauteur et longueur 
    -->
    <div class="textinput container flex flex-col gap-3">
      <text-area-autosize name="send" v-model="form.body" />
      <!--ici boutons confirmer et input type file-->
      <div class="flex-col flex gap-3 ml-4">
        <input type="file" ref="fileUpload" @change="onFileSelected" />
        <input
          type="button"
          class="confirmer border border-black p-1 rounded-md w-20"
          value="confirmer"
          @refetchPost="refreshPost"
          @click="modifyPost"
        />
      </div>
    </div>
  </div>

  <!--ici, on aura les reactions-->
  <div class="flex flex-col">
    <Reactions />
    <CommentsMyPost :comments="post.Comments" @refetchPost="refreshPost" />
    <!--on a changé le backend pour inclure comments dans le post. le :comments passera les commentaires en props SUPER IMPORTANT ET PRATIQUE-->
    <!--le @refreshPost est la fonction crée dans le methods en relation avec le $emit chez l'enfant-->
  </div>
  <!--ici, on aura la modif et suppression du post sous conditions-->
  <div></div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
import Reactions from "./Reactions.vue";
import CommentsMyPost from "./CommentsMyPost.vue";
import TextAreaAutosize from "./TextAreaAutosize.vue";
export default {
  name: "OnePost",
  //props: ["id"],
  //props:["Post"],
  components: {
    Header,
    Reactions,
    CommentsMyPost,
    TextAreaAutosize,
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
      isOpen: false,
      form: {
        body: "",
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

    let fetchPost = await axios.get(
      "http://localhost:4000/api/post/" + this.$route.params.postId,
      {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    console.warn(fetchPost);
    this.post = fetchPost.data;

    this.refreshPost(); //rappelle ici
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
      //to see the path in the console i can console warn(event)  (its for image upload)
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
    
    //modifier le post
    async modifyPost(e) {
      if (this.selectedFile && this.form.body) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.name);
        formData.append("body", this.form.body);
        axios
          .put(
            "http://localhost:4000/api/post/" + this.$route.params.postId,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            }
          )
          .then((response) => {
            (this.form.body = ""), //enlève le contenu du mssage dans l'input
              console.warn(response);
          });
        await this.refreshPost(); //change dynamiquement le contenu. On refetch symplement le post ici
        //contrairement à l'opération dans CommentsMyPost
        this.clear();
      } else if (!this.selectedFile && this.form.body) {
        e.preventDefault();
        const formData = new FormData();
        //formData.append("image", this.message.image, this.message.image.name);
        formData.append("body", this.form.body);
        axios
          .put(
            "http://localhost:4000/api/post/" + this.$route.params.postId,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            }
          )
          .then((response) => {
            (this.form.body = ""),
              //enlève le contenu du mssage dans l'input
              console.warn(response);
          });
        await this.refreshPost(); //change dynamiquement le contenu. On refetch symplement le post ici
        //contrairement à l'opération dans CommentsMyPost
      } else {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.name);
        //formData.append("body", this.form.body);
        axios
          .put(
            "http://localhost:4000/api/post/" + this.$route.params.postId,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
               onUploadProgress: uploadEvent =>{
                console.warn('Upload Progress' + Math.round(uploadEvent.loaded / uploadEvent.total *100)+'%')
              }
            }
          )
          .then((response) => {
            console.warn(response);
          });
        await this.refreshPost(); //change dynamiquement le contenu. On refetch symplement le post ici
        //contrairement à l'opération dans CommentsMyPost
        this.clear();
      }
    },
  },
};
</script>

<style scoped>
.myPost {
  background-color: #a40606;
}
.myPost .modifier,
.myPost .supprimer,
.myPost .confirmer {
  background-color: #a6a2a2;
  color: black;
}
</style>