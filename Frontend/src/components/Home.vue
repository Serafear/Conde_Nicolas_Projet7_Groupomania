<template>
  <Header />

  <div id="mainPage" class="container lg:flex lg:justify-center mt-5">
    <div class="flex flex-col lg:flex-row lg:w-11/12 lg:h-c50">
      <!--ici, quelques exemples d'images de profile pour si jamais le systeme est implémenté-->
      <section
        id="sidebar"
        class="
          w-full
          h-56
          md:h-72
          lg:w-2/6
          lg:h-c50
          bg-pal-si
          flex flex-col
          gap-3
          justify-start
          items-center
        "
      >
        <h1 class="font-bold text-4xl mt-3">Inbox</h1>
        <p class="font-semibold text-2xl">Groupe</p>
        <ul
          class="
            flex flex-row
            gap-3
            lg:flex-col
            w-80
            h-36
            md:w-96
            md:h-44
            
            lg:items-center
            lg:h-full
            overscroll-x-contain
            overflow-x-scroll overflow-y-hidden
            lg:overscroll-y-contain
            lg:overflox-y-scroll
            lg:overflow-y-visible
          "
        >
          <!--for the overscroll, all elements need to have a width-->
          <li
            class="
              flex flex-col
              justify-center
              items-center
              w-40
              h-40
              md:h-44
              ml-1
              mb-2
            "
          >
            <img
              class="flex w-20 md:w-32 md:h-32"
              src=" src\assets\profile-pic.png"
            />
            <p
              class="
                md:text-2xl
                text-snow
                underline
                w-20
                h-20
                md:w-24
                justify-center
                flex
              "
            >
              Ylan
            </p>
          </li>
          <li
            class="
              flex flex-col
              justify-center
              items-center
              w-40
              h-40
              ml-1
              mb-2
            "
          >
            <img
              class="flex w-20 md:w-32 md:h-32"
              src="src\assets\profile-pic (1).png"
            />
            <p
              class="
                md:text-2xl
                text-snow
                underline
                w-20
                h-20
                md:w-24
                justify-center
                flex
              "
            >
              Yvette
            </p>
          </li>
          <li
            class="
              flex flex-col
              justify-center
              items-center
              w-40
              h-40
              ml-1
              mb-2
            "
          >
            <img
              class="w-20 md:w-32 md:h-32"
              src="src\assets\profile-pic (2).png"
            />
            <p
              class="
                md:text-2xl
                text-snow
                underline
                w-20
                h-20
                md:w-24
                justify-center
                flex
              "
            >
              Jean-luc
            </p>
          </li>
        </ul>
      </section>

      <section
        class="
          bg-grullo
          lg:w-4/6
          w-full
          flex flex-col
          justify-center
          items-center
          
        "
      >
        <h1>CHAT BOX</h1>
        <div id="chat space" class="bg-white w-5/6 h-5/6 lg:overscroll-contain
                 lg:overflow-auto">
          <ul
            v-for="Post in Posts"
            :key="Post.id"
            :Post="Post"
            class="flex flex-col"
            :class="{ Ulowner: Post.user.id == $store.state.userId }"
          >
            <!--On va rajouter une classe conditionnelle: owner qu'on pourra styliser-->

            <li
              id="Posts"
              :class="{ owner: Post.user.id == $store.state.userId }"
              class="
                flex flex-col
                lg:mb-5
                mb-1
                lg:mt-5
                mt-3
                lg:ml-4
                ml-2
                bg-lav-bl
                rounded-xl
                lg:w-4/6 md:w-4/6
                w-60
                p-1
                px-3
                break-normal
                 
              "
            >
              <!--vu qu'on utilisera le props id dans OnePost.vue-->
              <router-link :to="'/post/' + Post.id">
                <div class="flex flex-col mb-5 lg:w-5/6 px-1">
                  <span>{{ Post.user.nom }}</span>
                  <img class="w-24 md:w-48" :src="Post.image" />
                  <span class="w-4/5 md:text-2xl break-words">{{ Post.body }}</span>
                  <span class="md:mt-2">{{ Post.user.createdAt }}</span>
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
                  :to="'/post/' + Post.id"
                  class="bg-rufous w-3/4"
                ></router-link>
              </div>
              <div class="flex flex-row justify-end gap-2">
                <!--vu qu'on utilisera le props id dans OnePost.vue-->
                <router-link
                  :to="'/post/' + Post.id"
                  class="router bg-lav-bl w-3/4"
                ></router-link>

                <ReactionsHome :allPost="Post" />
                <Comments :key="Post.id" :Post="Post" />
              </div>
            </li>
          </ul>
        </div>

        <!--cette div s'occupe de l'envoi de l'image et du message-->
        <div
          id="barre-envoi"
          class="
            flex flex-col
            md:flex-row
            w-5/6
            gap-3
            p-2
            border border-black
            bg-pinky-1
          "
        >
          <text-area-autosize
            name="home-input"
            class="border border-black w-5/6 lg:w-3/6 pl-1"
            v-model="message.body"
          />
          <input
            type="file"
            ref="fileUpload"
            class="hidden"
            accept="image/*"
            @change="onFileSelected"
          />
          <!--boutons pour choisir le fichier et modifier, dans commentaires-->
          <div class="flex flex-row gap-3 w-full lg:w-3/6 items-center">
            <p class="text-ox-bl text-sm md:text-lg">Choisir un fichier :</p>
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
              class="confirmer border border-black px-1 md:px-2 bg-an-br rounded-md md:text-lg"
              value="confirmer"
              @click.prevent="createPost"
              tabindex="-1"
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
import ReactionsHome from "./ReactionsHome.vue";
import TextAreaAutosize from "./TextAreaAutosize.vue";
export default {
  name: "Home",
  components: {
    Header,
    Comments,
    ReactionsHome,
    TextAreaAutosize,
  },
  data() {
    return {
      profiles: [],
      Posts: [],
      message: {
        body: "",
        image: null,
      },
      PostsIndex: "",
      selectedFile: null,
    };
  },
  computed: {
    //Posts() {
    //return this.$store.state.Posts; //permet d'afficher l'array en combiaison avec v-for
    //},
  },
  async created() {
    //ici l'évènement est monté dont l'opération est finie. Il faut donc rafraichir la page ou créer une fonction qui rafraichit la page dès que le token est touché/ voir aussi eventBus comme solution plus légère
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "SignUp" });
    }
    //this.$store.dispatch("fetchAllPosts");
    //const myPost = this.Posts.map((mypost)=>mypost.id); //exemple de maping
    //console.warn(myPost);
    this.fetchPosts(); //rappelle ici
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]; //it will take the first element in the event>target>files
      //to see the path in the console i can console warn(event)  (its for image upload)
      console.warn(this.selectedFile);
    },

    //create post
    async createPost() {
      if (this.selectedFile && this.message.body) {
        const formData = new FormData();
        formData.append("body", this.message.body);
        formData.append("image", this.selectedFile, this.selectedFile.name);
        formData.append("userId", this.$store.state.userId);
        await axios
          .post("http://localhost:4000/api/post", formData, {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          })
          .then((response) => {
            (this.message.body = ""), //enlève le contenu du mssage dans l'input
              console.warn(response);
            this.fetchPosts();
          });
      } else if (!this.selectedFile && this.message.body) {
        const formData = new FormData();
        formData.append("body", this.message.body);
        //formData.append("image", this.selectedFile, this.selectedFile.name);
        formData.append("userId", this.$store.state.userId);
        await axios
          .post("http://localhost:4000/api/post", formData, {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          })
          .then((response) => {
            (this.message.body = ""), //enlève le contenu du mssage dans l'input
              console.warn(response);
            this.fetchPosts();
          });
      } else if (this.selectedFile && !this.message.body) {
        const formData = new FormData();
        //formData.append("body", this.comment.body);
        formData.append("image", this.selectedFile, this.selectedFile.name);
        formData.append("userId", this.$store.state.userId);
        await axios
          .post("http://localhost:4000/api/post", formData, {
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
          })
          .then((response) => {
            console.warn(response);
            this.fetchPosts();
          });
      }
      this.fetchPosts();
    },

    //deleting post
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
      this.fetchPosts();
    },

    //ne maîtrisant pas encore les mutations, je vais créer un nouvel appel api pour les posts
    async fetchPosts() {
      await axios
        .get("http://localhost:4000/api/post", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((response) => {
          this.Posts = response.data;
          console.warn(response);
        });
    },
  },
};
</script>

<style scoped>
.owner {
  background-color: #a40606;
  color: white;
}
.owner .router {
  background-color: #a40606;
}
.Ulowner {
  align-items: flex-end;
  @apply mr-2;
}
</style>

