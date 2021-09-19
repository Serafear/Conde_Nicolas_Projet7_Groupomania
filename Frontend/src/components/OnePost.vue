<template >
  <Header />
  <post-my-post :mypost="post" @refetchPost="refreshPost" />

  <!--ici, on aura les reactions-->
  <div class="flex flex-col">
    <Reactions :reactions="post.Reactions" @refetchPost="refreshPost"/>
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
import PostMyPost from './PostMyPost.vue';
export default {
  name: "OnePost",
  inheritAttrs: false, //stop the Extraneous non-props attributess
  //props: ["id"],
  //props:["Post"],
  components: {
    Header,
    Reactions,
    CommentsMyPost,

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
    
    
  },
};
</script>

