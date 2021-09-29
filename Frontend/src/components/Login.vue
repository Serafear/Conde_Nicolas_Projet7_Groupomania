<template>
  <div
    id="login_page"
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
      id="login_form"
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
        Connectez-vous à votre compte
      </h1>
      <form
        class="
          flex flex-col
          pt-4
          gap-2
          sm:h-2/3 sm:mr-60 sm:mb-14
          md:mr-0 md:mb-0
        "
      >
        <!--gap work with flex !!-->
        <label for="email" class="text-snow">EMAIL</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          class="border-black border p-1 md:w-60 lg:w-64 focus:outline-none"
        />
        <label for="password" class="text-snow">Mot de passe</label>
        <div class="flex flex-row justify-center">
          <input
            :type="passwordFieldType"
            v-model="password"
            id="password"
            name="password"
            class="
              border-black border
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
            class="bg-white border border-black border-l-0 px-1 md:px-2"
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
      <p
        class="
          text-sm
          mt-3
          text-snow
          sm:col-span-1 sm:absolute sm:ml-72
          md:relative md:ml-0 md:mt-0
        "
      >
        Si vous n'avez pas de compte cliquez ici :
      </p>
      <router-link
        to="/signup"
        class="
          text-snow
          font-bold
          underline
          sm:absolute sm:ml-72 sm:mt-14
          md:relative md:ml-0 md:mt-0
        "
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
        localStorage.setItem("userId", JSON.stringify(loginData.userId));
        this.$router.push({ name: "Home" });
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
