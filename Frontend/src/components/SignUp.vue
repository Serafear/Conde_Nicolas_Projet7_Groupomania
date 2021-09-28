<template>
  <div
    id="signup_page"
    class="
      container
      bg-an-br
      h-screen
      sm:mr-7
      md:mr-0 md:w-screen md:h-screen md:grid md:grid-flow-col
      justify-center
      items-center
    "
  >
    <div
      id="logo"
      class="
        h-1/3
        overflow-hidden
        md:w-80 md:h-2/4 md:mb-14
        lg:mb-0 lg:h-4/6 lg:w-96
        flex
        justify-center
        items-center
        bg-white
      "
    >
      <img
        alt="logo_project"
        class="sm:h-56"
        src="../assets/icon-above-font.png"
      />
      <!--l'élément parent doit être en flex justify+item center-->
    </div>
    <section
      id="signup_form"
      class="
        bg-rufous
        h-2/3
        sm:w-screen
        md:w-80 md:h-2/4 md:mb-14
        lg:mb-0 lg:h-4/6 lg:w-96
        flex flex-col
        justify-center
        items-center
      "
    >
      <h1
        class="flex justify-center items-center text-snow sm:text-sm md:text-lg"
      >
        Créez votre compte
      </h1>
      <form
        class="
          flex flex-col
          pt-4
          gap-2
          sm:h-2/4 sm:mr-60 sm:mb-10
          md:mr-0 md:mb-0
        "
      >
        <!--gap work with flex !!-->
        <input
          type="text"
          id="nom"
          name="nom"
          v-model="nom"
          class="border-black border p-1 w-56 md:w-60"
          placeholder="Entrez votre nom"
        />
        <input
          type="text"
          id="prenom"
          name="prenom"
          v-model="prenom"
          class="
            sm:col-span-1 sm:row-span-1
            border-black border
            p-1
            w-56
            md:w-60
          "
          placeholder="Entrez votre prénom"
        />
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          class="
            sm:col-span-1 sm:row-span-1
            border-black border
            p-1
            w-56
            md:w-60
          "
          placeholder="Entrez votre email"
        />
        <div class="flex flex-row justify-center">
          <input
            :type="passwordFieldType"
            v-model="password"
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            class="
              border-black border
              w-48
              md:w-52
              p-1
              border-r-0
              focus:outline-none
              xl:resize-none xl:whitespace-nowrap xl:overflow-x-scroll
            "
          />
          <button
            v-on:click="switchVisibility"
            type="password"
            class="bg-white border border-black border-l-0 px-1.5 lg:px-1"
          >
            <font-awesome-icon icon="eye" class="lg:text-xl" />
          </button>
        </div>
        <input
          type="button"
          v-on:click="signUp"
          id="in-reg"
          name="in-reg"
          value="inscription"
          class="
            rounded-xl
            border-black border
            p-1
            mt-4
            bg-grullo
            sm:absolute sm:ml-80 sm:px-8 sm:py-2
            md:relative md:ml-0 md::px-0 md:py-0
          "
        />
      </form>
      <p
        class="
          text-sm
          mt-3
          text-snow
          sm:col-span-1 sm:absolute sm:ml-64 sm:mt-20
          md:relative md:ml-0 md:mt-0
        "
      >
        Si vous avez déjà un compte cliquez ici :
      </p>
      <router-link
        to="/login"
        class="
          text-snow
          font-bold
          underline
          sm:absolute sm:ml-64 sm:mt-36
          md:relative md:ml-0 md:mt-0
        "
        >CONNEXION</router-link
      >
    </section>
  </div>
</template>

<script>
import axios from "axios"; //npm install axios --save
export default {
  name: "SignUp",
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      passwordFieldType: "password",
    };
  },
  methods: {
    async signUp() {
      let fetchSignUp = await axios.post(
        "http://localhost:4000/api/user/signup",
        {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          password: this.password,
        }
      );

      //console.warn("signup", this.nom, this.prenom, this.email, this.password); //warn replace the log ?
      console.warn(fetchSignUp);
      if (fetchSignUp.status == 201) {
        this.$router.push({ name: "Login" });
      }
    },
    switchVisibility(e) {
      e.preventDefault();
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
  created() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
