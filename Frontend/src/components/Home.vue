<template>
  <Header />

  <div id="mainPage" class="container flex justify-center mt-5">
    <div class="flex flex-row lg:w-11/12 lg:h-c50">
      <section id="sidebar" class="w-2/6 bg-pal-si">
        <h1>Inbox</h1>
        <ul>
          <li>groupe</li>
        </ul>
      </section>

      <section
        class="bg-grullo w-4/6 flex flex-col justify-center items-center"
      >
        <h1>CHAT BOX</h1>
        <div
          id="chat space"
          class="bg-white w-5/6 h-5/6 overflow-auto overscroll-contain"
        >
          <ul v-for="Post in Posts" :key="Post.id" :Post="Post">
            <!--On va rajouter une classe conditionnelle: owner qu'on pourra styliser-->

            <li
              id="Posts"
              :class="{ owner: Post.user.id == $store.state.userId }"
              class="
                flex flex-col
                mb-5
                mt-5
                ml-2
                bg-lav-bl
                rounded-xl
                w-4/6
                p-1
                px-3 
                break-normal
              "
            >
              <!--vu qu'on utilisera le props id dans OnePost.vue-->
              <router-link :to="'/post/'+Post.id">
                <div class="flex flex-col mb-5 w-5/6 px-1">
                  <span
                    >{{ Post.user.nom }} {{ Post.id }} {{ Post.user.id }}</span
                  >
                  <span>{{ Post.body }}</span>
                  <span>{{ Post.user.createdAt }}</span>
                  <!--le v-if de la div cache le button supprimer et modifier 
               pour peux dont le post.user.id est différent du userId dans le
               store -->
                </div>
              </router-link>
              <div
                v-if="Post.user.id == $store.state.userId"
                class="flex gap-3 mt-2 mb-2"
              >
                <button
                  @click="deletePost(Post)"
                  class="bg-amar rounded-lg p-1"
                >
                  supprimer
                </button>

                <!--vu qu'on utilisera le props id dans OnePost.vue-->
                <router-link
                  :to="'/post/'+Post.id"
                  class="bg-rufous w-3/4"
                ></router-link>
              </div>
              <div class="flex flex-row justify-end gap-2">
                <!--vu qu'on utilisera le props id dans OnePost.vue-->
                <router-link
                  :to="'/post/'+Post.id"
                  class="router bg-lav-bl w-3/4"
                ></router-link>

                <Reactions :key="Post.id" :Post="Post" /><Comments
                  :key="Post.id"
                  :Post="Post"
                />
              </div>
            </li>
          </ul>
        </div>

        <!--cette div s'occupe de l'envoi de l'image et du message-->
        <div id="barre-envoi" class="flex flex-row w-5/6">
          <div
            id="Buttons"
            class="
              flex flex-row
              gap-4
              justify-evenly
              bg-gunmetal
              p-2
              w-5/6
              h-12
            "
          >
            <form class="flex flex-row gap-6 w-5/6">
              <!--le body est associé au contenu de l'input qu'on va rentré-->
              <input
                v-model="message.body"
                name="body"
                class="border border-solid border-black rounded-xl w-5/6"
              />
              {{message}}
              <input
                type="submit"
                value="envoyer"
                class="cursor-pointer"
                @click="createMessage"
              />
            </form>
          </div>
          <!--On va cacher l'input file-->
          <div
            id="hide"
            class="
              flex flex-row flex-1
              justify-center
              items-center
              gap-3
              bg-ox-bl
              p-1
              px-2
            "
          >
            <font-awesome-icon
              icon="file-image"
              class="file-image text-2xl text-pinky-1 absolute -ml-7"
            />
            <input
              type="file"
              @change="onFileSelected"
              class="w-10 text-sm z-10 opacity-0"
            />
            <input
              type="button"
              value="envoyer"
              class="cursor-pointer"
              @click="sendPicture"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
import Comments from "./Comments.vue";
import Reactions from "./Reactions.vue";
export default {
  name: "Home",
  components: {
    Header,
    Comments,
    Reactions,
    
  },
  data() {
    return {
      message: {
        body: "",
        image: null,
      },
      PostsIndex: "",
    };
  },
  computed: {
    Posts() {
      return this.$store.state.Posts; //permet d'afficher l'array en combiaison avec v-for
    },
  },
  async created() {
    //ici l'évènement est monté dont l'opération est finie. Il faut donc rafraichir la page ou créer une fonction qui rafraichit la page dès que le token est touché/ voir aussi eventBus comme solution plus légère
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "SignUp" });
    }
    this.$store.dispatch("fetchAllPosts");
    //const myPost = this.Posts.map((mypost)=>mypost.id); //exemple de maping
    //console.warn(myPost);
  },
  methods: {
    onFileSelected(event) {
      this.message.image = event.target.files[0]; //it will take the first element in the event>target>files
      //to see the path in the console i can console warn(event)  (its for image upload)
    },
    async createMessage(e) {
      e.preventDefault();
      const formData = new FormData();
      //formData.append("image", this.message.image, this.message.image.name);
      formData.append("body", this.message.body);
      formData.append("userId", this.$store.state.userId);
      let myMessage = await axios.post(
        "http://localhost:4000/api/post",
        formData,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.warn(myMessage);
    },
    async sendPicture(e) {
      e.preventDefault();
      const formData2 = new FormData();
      formData2.append("image", this.message.image, this.message.image.name);
      formData2.append("userId", this.userId);
      let myFile = await axios.post(
        "http://localhost:4000/api/post",
        formData2,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.warn(myFile);
    },
    async deletePost(Post) {
      //here ex: samy can only delete samy's messages

      const postId = await Post.id;
      const deletePost = await axios.delete(
        "http://localhost:4000/api/post/" + postId,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.warn(deletePost);
    },
  },
};
</script>

<style scoped>
.owner {
  background-color: #a40606;
  color: white;
  margin-left: 10rem;
}
.owner .router {
  background-color: #a40606;
}
</style>

