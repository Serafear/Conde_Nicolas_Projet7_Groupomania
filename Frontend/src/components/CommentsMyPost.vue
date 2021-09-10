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
    <h1 class="text-lg font-bold">Commentaires</h1>
    <!--div principale du contenu commentaire-->
    <div
      class="
        pt-5
        h-80
        w-full
        
        flex flex-col
        justify-center
        items-center
        border-t-2 border-rufous 
        
      "
    >
      <!--v-if le contenu de comment est null-->

      <!--ul>li*3.comment   raccourci-->
      <ul v-if="comments && comments.length" class="flex flex-col w-full justify-center items-center overscroll-contain overflow-auto">
        <li class="comment" v-for="comment in comments" :key="comment.id">
          {{ comment.body }} {{comment.id}} 
        </li>

      </ul>
      
      <ul v-else
        class="flex bg-white w-full justify-center items-center"
      >
        <li
          class="noComment font-bold"
         
        >
          aucun commentaire !
          
        </li>
        
      </ul>
      <!--ici on va créer la div pour créer un nouveau commentaire-->
      <div
        class="
          w-full
          flex flex-col
          justify-center
          items-center
          pl-1
          border-t-2 border-rufous
        "
      >
        <h2>créer nouveau commentaire</h2>
        <form class="flex gap-4 w-full">
          <input
            type="text"
            class="text border border-black w-4/6"
            v-model="message.body"
            v-on:keyup.enter.prevent="onSubmit"
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
export default {
  name: "CommentsMyPost",
  props:["comments"],
  data() {
    return {
      //comments: [],
      message: {
        body: "",
        image: null,
      },
      post: null
    };
  },
  
  async created() {
     //on va créer un code qui va creée comment en appuyant sur entrée
     let handleEnter = (e) => {
      if (e.key === "Entrée" || e.key === "Enter") {
        e.preventDefault();
        this.createComment()
        
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
    async createComment() {
      
      const formData = new FormData();
      //formData.append("image", this.message.image, this.message.image.name);
      formData.append("body", this.message.body);
      formData.append("userId", this.$store.state.userId);
      formData.append("postId", this.$route.params.postId);
      await axios.post(
        `http://localhost:4000/api/post/${this.$route.params.postId}/comment`,
        formData,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      ).then(response => {
        this.message.body="", //enlève le contenu du mssage dans l'input
        console.warn(response);
        this.fetchComments()
      })
      this.$emit('refetchPost') //chaine de codepermettant de faire comprendre au parent qu'il y a changement. la suite dans OnePost
    },
    async fetchComments(){
      await axios
      .get(
        `http://localhost:4000/api/post/${this.$route.params.postId}`,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      ).then((response) => {
        this.comments = response.data;
        console.warn(response);
      });
    }
  },
};
</script>