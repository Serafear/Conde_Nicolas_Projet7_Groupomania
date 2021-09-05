<template>
  <Header />
  <h1 class="text-xl text-ox-bl mt-4">{{ message }} {{ user.nom }}</h1>
  <p>
    Pour modifier vottre profil <br />
    remplissez tout le formulaire<br />
    et appuyez sur le button
  </p>
  <form
    id="input-forms"
    class="
      flex flex-col
      lg:w-96
      gap-3
      justify-center
      items-center
      bg-rufous
      mt-2
    "
  >
    <div class="grid grid-flow-col gap-5 mt-3 justify-around">
      <label for="nom" class="lg:w-16 text-snow">Nom: </label>
      <input
        type="text"
        id="nom"
        name="nom"
        v-model="user.nom"
        class="
          border border-black border-solid
          pl-2
          lg:w-52
          bg-pinky-1
          rounded-md
        "
      />
    </div>
    <div class="grid grid-flow-col gap-5 justify-around">
      <label for="prenom" class="lg:w-16 text-snow">Prénom: </label>
      <input
        type="text"
        id="prenom"
        name="prenom"
        v-model="user.prenom"
        class="
          border border-black border-solid
          pl-2
          lg:w-52
          bg-pinky-1
          rounded-md
        "
      />
    </div>
    <div class="grid grid-flow-col gap-5 justify-around">
      <label for="email" class="lg:w-16 text-snow">Email: </label>
      <input
        type="email"
        id="email"
        name="email"
        v-model="user.email"
        class="
          border border-black border-solid
          pl-2
          lg:w-52
          bg-pinky-1
          rounded-md
        "
      />
    </div>
    <div class="grid grid-flow-col gap-5 justify-around">
      <label for="password" class="lg:w-16 text-snow">Password: </label>
      <input
        :type="passwordFieldType"
        v-model="user.password"
        id="password"
        name="password"
        class="
          border border-black border-solid
          pl-2
          lg:w-52
          bg-pinky-1
          rounded-md
        "
      />
      <button
        v-on:click="switchVisibility"
        type="password"
        class="absolute ml-64 mt-0.5"
      >
        <font-awesome-icon icon="eye" class="lg:text-xl" />
      </button>
    </div>
    <button
      class="
        border border-black border-solid
        bg-pinky-1
        w-24
        px-1
        rounded-xl
        my-3
      "
      @click="updateInfos"
    >
      Modifier
    </button>
  </form>
  <div>
    <p>Si vous désirez supprimer votre <br> compte cliquez ici: 
      <router-link :to="'/delete/'+$store.state.userId" class=" underline hover:text-rufous">Supprimer</router-link>
    </p>
  </div>
</template>

<script>
import Header from "./Header.vue";
import axios from "axios";
export default {
  components: { Header },
  name: "MyPage",
  data() {
    return {
      message: " Bienvenue sur ton profil, ",
      user: {
        nom: "",
        prenom: "",
        email: "",
        password: "",
        id: "",
      },

      passwordFieldType: "password",
    };
  },
  async mounted() {
    let fetchMyPage = await axios.get(
      "http://localhost:4000/api/user/" + this.$route.params.userId,
      {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    console.warn(fetchMyPage);
    delete fetchMyPage.data.password; //it delete the value of pasword before being defined in user
    this.user = fetchMyPage.data; //it prefil the value of nom, prenom, etc...
  },
  methods: {
    switchVisibility(e) {
      e.preventDefault();
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    async updateInfos() {
      let fetchUpdate = await axios.put(
        "http://localhost:4000/api/user/" + this.$route.params.userId,
        {
          nom: this.user.nom,
          prenom: this.user.prenom,
          email: this.user.email,
          password: this.user.password,
        },
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.warn(fetchUpdate);
    },
  },
};
</script>