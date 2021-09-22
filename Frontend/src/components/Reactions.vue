<template>
  <!-- apparemment cette partie n'est pas utile ? ou sous condition inutile ?
  <div
    class="flex flex-row gap-3 mt-1 justify-end pb-1"
    v-for="reactid in myReact"
    :key="reactid.id"
    
  >
    <div
      class="
        flex flex-row
        justify-center
        items-center
        gap-1
        border border-solid border-ox-bl
      "
    >
      <button class="like p-1" @click="createLike(), getMyReaction(reactid)">
        <font-awesome-icon
          icon="thumbs-up"
          class="t-up text-2xl text-rufous"
          :style="[reactid.isLike == 'like' ? { color: 'blue' } : {}]"
        />
      </button>
      <span class="pr-1">{{ resultLike.length }}</span>

      
      <ul>
        <li>{{ reactid.id }} {{ reactid.isLike }}</li>
      </ul>
      
    </div>

    je peux écrire quelque chose comme : {{JSON.stringify(reactId)}}
    <div
      class="
        flex flex-row
        justify-center
        items-center
        gap-1
        border border-solid border-ox-bl
      "
    >
      <span class="pl-1"> {{ resultDislike.length }}</span>
      <button class="p-1" @click="createDislike">
        <font-awesome-icon
          icon="thumbs-down"
          class="t-down text-2xl text-rufous mt-1"
          :style="[reactid.isLike == 'dislike' ? { color: 'blue' } : {}]"
        />
      </button>
    </div>
  </div>
  -->

  <!--reactions globales ? ce v-if fait fonctionner le myReact[0].isLike mais il faut aussi un v-else-->
  <div
    v-if="myReact[0]"
    class="flex flex-row gap-4 mt-3 mb-3 justify-center items-center"
  >
    <div
      class="
        flex flex-row
        justify-center
        items-center
        gap-2
        border border-solid border-black
        p-1
      "
    >
      <button @click="createLike">
        <!--to access the data in the myReact filter, i need to use  {{myReact[0]}}
        why the index 0, and only 0 work, i dont know yet O.o ...
        -->
        <font-awesome-icon
          icon="thumbs-up"
          class="t-up text-2xl text-rufous"
          :style="[myReact[0].isLike == 'like' ? { color: 'blue' } : {}]"
        />
      </button>
      <span>{{ resultLike.length }}</span>
    </div>
    <div
      class="
        flex flex-row
        justify-center
        items-center
        gap-2
        border border-solid border-black
        p-1
      "
    >
      <button @click="createDislike">
        <font-awesome-icon
          icon="thumbs-down"
          class="t-down text-2xl text-rufous"
          :style="[myReact[0].isLike == 'dislike' ? { color: 'blue' } : {}]"
        />
      </button>
      <span>{{ resultDislike.length }}</span>
    </div>
  </div>
  <!--le v-else, dans le cas où myReact[0] n'existe pas, affiche moi simplement
  les infos-->
  <div v-else class="flex flex-row gap-4 mt-3 mb-3 justify-center items-center">
    <div
      class="
        flex flex-row
        justify-center
        items-center
        gap-2
        border border-solid border-black
        p-1
      "
    >
      <button @click="createLike">
        <font-awesome-icon icon="thumbs-up" class="t-up text-2xl text-rufous" />
      </button>
      <span>{{ resultLike.length }}</span>
    </div>
    <div
      class="
        flex flex-row
        justify-center
        items-center
        gap-2
        border border-solid border-black
        p-1
      "
    >
      <button @click="createDislike">
        <font-awesome-icon
          icon="thumbs-down"
          class="t-down text-2xl text-rufous"
        />
      </button>
      <span>{{ resultDislike.length }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  inheritAttrs: false,
  name: "Reactions",
  props: ["reactions"],
  data() {
    return {
      isLike: {
        Liked: "like",
        Disliked: "dislike",
      },
      responseData: [],
      postId: this.$route.params.postId,
      likeActive: false,
      dislikeActive: false,
    };
  },
  created() {
    this.getAllReactions();
    this.getMyReaction("reactId");
  },
  computed: {
    resultLike() {
      return this.responseData.filter(
        (reaction) =>
          reaction.isLike == "like" && reaction.postId == this.postId
      );
    },
    resultDislike() {
      return this.responseData.filter(
        (reaction) =>
          reaction.isLike == "dislike" && reaction.postId == this.postId
      );
    },
    myReact() {
      return this.responseData.filter(
        (reaction) =>
          reaction.postId == this.postId &&
          reaction.userId == this.$store.state.userId
      );
    },

    /* je voulais récupéré l'id de la réact sans passer par le v-for. 
  Ne fonctionne pas avec cette méthode 
  reactId(){
   return this.myReact.filter(value => id == value.id)
  },*/
  },
  methods: {
    async createLike() {
      await axios
        .post(
          `http://localhost:4000/api/post/${this.$route.params.postId}/react`,
          {
            userId: this.$store.state.userId,
            postId: this.$route.params.postId,
            isLike: this.isLike.Liked,
          },
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then((reponse) => {
          console.warn(reponse);
          this.getAllReactions();
        });
      this.$emit("refetchPost"); //change dynamiquement le contenu
    },
    async createDislike() {
      await axios
        .post(
          `http://localhost:4000/api/post/${this.$route.params.postId}/react`,
          {
            userId: this.$store.state.userId,
            postId: this.$route.params.postId,
            isLike: this.isLike.Disliked,
          },
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then((reponse) => {
          console.warn(reponse);
          this.getAllReactions();
        });
      this.$emit("refetchPost"); //change dynamiquement le contenu
    },

    async getAllReactions() {
      await axios
        .get(
          `http://localhost:4000/api/post/${this.$route.params.postId}/react`,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then((response) => {
          (this.responseData = response.data), console.warn(response);
        });
    },

    //useful ??? or no ?
    async getMyReaction(reactid) {
      const myReactId = await reactid.id;
      await axios
        .get(
          `http://localhost:4000/api/post/${this.$route.params.postId}/react/${myReactId}`,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          }
        )
        .then((response) => {
          (this.myReaction = response.data), console.warn(response);
        });
    },
  },
};
</script>

<style scoped>
.owner .t-up,
.owner .t-down {
  color: yellow;
}
</style>