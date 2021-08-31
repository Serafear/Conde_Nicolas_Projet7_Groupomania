<template>
  <div
    id="login_page"
    class="
      container
      bg-an-br
      lg:w-screen
      lg:h-screen
      grid grid-flow-col
      justify-center
      items-center
    "
  >
    <div
      id="logo"
      class="lg:h-4/6 lg:w-96 flex justify-center items-center bg-white"
    >
      <img alt="logo_project" src="../assets/icon-above-font.png" />
      <!--l'élément parent doit être en flex justify+item center-->
    </div>
    <section
      id="login_form"
      class="
        bg-rufous
        lg:h-4/6
        lg:w-96
        flex flex-col
        justify-center
        items-center
      "
    >
      <h1 class="flex justify-center items-center text-snow">
        Connectez-vous à votre compte
      </h1>
      <form class="flex flex-col pt-4 gap-2">
        <!--gap work with flex !!-->
        <label for="email" class="text-snow">EMAIL</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          class="border-black border p-1 lg:w-60"
        />
        <label for="password" class="text-snow">Mot de passe</label>
        <div class="flex flex-col justify-around">
          <input
            :type="passwordFieldType"
            v-model="password"
            id="password"
            name="password"
            class="border-black border p-1"
          />
          <button
            v-on:click="switchVisibility"
            type="password"
            class="absolute lg:right-52 lg:mt-1"
          >
            <font-awesome-icon icon="eye" class="lg:text-2xl" />
          </button>
        </div>
        <input
          type="button"
          v-on:click="login"
          id="in-conn"
          name="in-conn"
          value="connexion"
          class="rounded-xl border-black border p-1 mt-4 bg-grullo"
        />
      </form>
      <p class="text-sm mt-3 text-snow">
        Si vous n'avez pas de compte cliquez ici :
      </p>
      <router-link to="/signup" class="text-snow font-bold underline"
        >INSCRIPTION</router-link
      >
    </section>
  </div>
</template>

<script>
//import axios from 'axios'
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      passwordFieldType: "password",
    };
  },
  methods: {
    /*async login(){
      let fetchLogin = await axios.post(`http://localhost:4000/api/user/login/?email=${this.email}`,{
        email: this.email,
        password: this.password
      });
      console.warn(fetchLogin);
      if(fetchLogin.status==200){ // another condition but dont work: fetchLogin.status==200 && fetchLogin.data.length>0
          localStorage.setItem("token", JSON.stringify(fetchLogin.data.token));
          this.$router.push({name:'Home'})
      }
    },*/
    //fetch without axios
    async login() {
      const fetchLogin = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });
      console.warn(fetchLogin);
      const loginData = await fetchLogin.json();
      console.warn(loginData);
      if (fetchLogin.status == 200) {
        // another condition but dont work: fetchLogin.status==200 && fetchLogin.data.length>0
        localStorage.setItem("token", JSON.stringify(loginData.token));
        this.$router.push({ name: "Home" });
      }
    },
    switchVisibility(e) {
      e.preventDefault();
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>



