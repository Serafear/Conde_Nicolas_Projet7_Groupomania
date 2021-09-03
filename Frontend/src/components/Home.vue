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
        <div id="chat space" class="bg-white w-5/6 h-5/6 overflow-auto">
          <p>messages</p>
          <ul>
            <li
              id="Posts"
              v-for="Post in Posts"
              :key="Post.id"
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
              "
            >
              <span>{{ Post.user.nom }} {{ Post.id }}</span>
              <span>{{ Post.body }}</span>
              <span>{{ Post.user.createdAt }}</span>
              <div class="flex gap-3 mt-2">
                <button @click="deletePost(Post)" class="bg-amar rounded-lg">
                  supprimer
                </button>
                <button>modifier</button>
              </div>
              <div class=" flex flex-row gap-3 mt-2 justify-end">
                  <font-awesome-icon
                icon="thumbs-up"
                class="text-2xl text-rufous"
              />
              <font-awesome-icon
                icon="thumbs-down"
                class="text-2xl text-rufous mt-1"
              />
              </div>
              
              <Comments />
            </li>
            <li>Your message</li>
          </ul>
          <div
            id="Buttons"
            class="flex flex-row gap-4 mt-c35 bg-gray-500 justify-center"
          >
            <form class="flex flex-row gap-6 w-3/6 bg-red-200">
              <input
                type="text"
                v-model="message.body"
                name="text"
                class="border border-solid border-black rounded-xl w-4/6"
              />
              <input
                type="submit"
                value="envoyer"
                class="cursor-pointer"
                @click="createMessage"
              />
            </form>
            <input type="file" @change="onFileSelected" class="w-22 text-sm" />
            <input
              type="button"
              value="upl"
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
export default {
  name: "Home",
  components: {
    Header,
    Comments,
  },
  data() {
    return {
      message: {
        body: "",
        image: null,
      },
      userId: localStorage.getItem("userId"),
      Posts: [],
      PostsIndex: "",
    };
  },
  async mounted() {
    //ici l'évènement est monté dont l'opération est finie. Il faut donc rafraichir la page ou créer une fonction qui rafraichit la page dès que le token est touché/ voir aussi eventBus comme solution plus légère
    let token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "SignUp" });
    }
    let fetchAllPosts = await axios
      .get("http://localhost:4000/api/post", {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((response) => (this.Posts = response.data)); //l'array ne fonctionne pas sans ça

    console.warn(fetchAllPosts);
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
      formData.append("userId", this.userId);
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

