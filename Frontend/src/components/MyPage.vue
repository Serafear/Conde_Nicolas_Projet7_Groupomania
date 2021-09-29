<template>
  <Header />
  <section class="flex flex-col items-center">
    <h1 class="md:text-xl font-bold text-ox-bl mt-10 md:mt-4">
      {{ message }} {{ user.nom }}
    </h1>
    <div class="flex flex-col items-center">
      <p>Pour le modifier, remplis</p>
      <p> tout le formulaire et </p>
      <p> appuis sur le button: modifier</p>
    </div>
  </section>

  <form
    id="input-forms"
    class="
      flex flex-col
      md:w-96
      w-72
      gap-3
      justify-center
      items-center
      bg-rufous
      mt-2
    "
  >
    <div class="grid grid-flow-col gap-5 mt-3 justify-around">
      <label for="nom" class="w-12 text-snow ml-3 md:ml-0">Nom: </label>
      <input
        type="text"
        id="nom"
        name="nom"
        v-model="user.nom"
        class="
          border border-black border-solid
          pl-2
          md:w-52
          w-11/12
          bg-pinky-1
          rounded-md
          focus:outline-none
        "
      />
    </div>
    <div class="grid grid-flow-col gap-5 justify-around">
      <label for="prenom" class="w-12 text-snow ml-3 md:ml-0">Prénom: </label>
      <input
        type="text"
        id="prenom"
        name="prenom"
        v-model="user.prenom"
        class="
          border border-black border-solid
          pl-2
          md:w-52
          w-11/12
          bg-pinky-1
          rounded-md
          focus:outline-none
        "
      />
    </div>
    <div class="grid grid-flow-col gap-5 justify-around">
      <label for="email" class="w-12 text-snow ml-3 md:ml-0">Email: </label>
      <textarea
      rows="1"
        type="email"
        id="email"
        name="email"
        v-model="user.email"
        class="
          border border-black border-solid
          pl-2
          md:w-52
           w-11/12
          bg-pinky-1
          rounded-md
          focus:outline-none
        "
      />
    </div>
    <div class="flex flex-row gap-5 justify-around">
      <label for="password" class="w-16 text-snow">Password: </label>
      <div class="flex items-center">
         <textarea
         rows="1"
        :type="passwordFieldType"
        v-model="user.password"
        id="password"
        name="password"
        class="
          border border-black border-solid border-r-0
          pl-2
          md:w-44
          w-36
          bg-pinky-1
          rounded-md
           rounded-r-none
           focus:outline-none
        "
      />
      <button
        v-on:click="switchVisibility"
        type="password"
        class="bg-pinky-1 border border-black border-l-0 rounded-r-md w-10 md:w-8"
      >
        <font-awesome-icon icon="eye" class="lg:text-xl" />
      </button>
      </div>
      
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
    <p>
      Si vous désirez supprimer votre <br />
      compte cliquez ici:
      <router-link
        :to="'/delete/' + $store.state.userId"
        class="underline hover:text-rufous"
        >Supprimer</router-link
      >
    </p>
  </div>
</template>

<script>
import Header from "./Header.vue";
import axios from "axios";
import TextAreaAutosizeSmall from './TextAreaAutosizeSmall.vue';
export default {
  components: { Header, TextAreaAutosizeSmall },
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
  async created() {
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
    async updateInfos(e) {
      e.preventDefault();

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