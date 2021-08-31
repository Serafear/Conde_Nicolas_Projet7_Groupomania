<template>
  <div id="signup_page" class="container bg-an-br lg:w-screen lg:h-screen grid grid-flow-col justify-center items-center">
    <div id="logo" class=" lg:h-4/6 lg:w-96 flex justify-center items-center bg-white">
      <img alt="logo_project" src="../assets/icon-above-font.png"/> <!--l'élément parent doit être en flex justify+item center-->
    </div>
    <section id="login_form" class=" bg-rufous lg:h-4/6 lg:w-96 flex flex-col justify-center items-center">
    <h1 class=" flex justify-center items-center text-snow">Créez votre compte</h1>
      <form class=" flex flex-col pt-4 gap-2">  <!--gap work with flex !!-->
        <input type="text" id="nom" name="nom" v-model="nom" class=" border-black border p-1 lg:w-60" placeholder="Entrez votre nom">
        <input type="text" id="prenom" name="prenom" v-model="prenom" class=" border-black border p-1" placeholder="Entrez votre prénom">
        <input type="email" id="email" name="email" v-model="email" class=" border-black border p-1" placeholder="Entrez votre email">
        <div class="grid grid-flow-col">
          <input
            :type="passwordFieldType"
            v-model="password"
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            class="border-black border p-1"
          />
          <button
            v-on:click="switchVisibility"
            type="password"
            class="absolute lg:ml-52 lg:mt-1"
          >
            <font-awesome-icon icon="eye" class="text-2xl" />
          </button>
        </div>
        <input type="button" v-on:click="signUp" id="in-reg" name="in-reg" value="inscription" class=" rounded-xl border-black border p-1 mt-4 bg-grullo"> 
      </form>
      <p class=" text-sm mt-3 text-snow">Si vous avez déjà un compte cliquez ici :</p>
      <router-link to="/login" class=" text-snow font-bold underline">CONNEXION</router-link>
    </section>
  </div>
</template>

<script>
import axios from 'axios' //npm install axios --save
export default {
  name: "SignUp",
  data(){
    return {
      nom: '',
      prenom:'',
      email: '',
      password: '',
      passwordFieldType: "password",
    }
  },
  methods: {
    async signUp(){
      
      let fetchSignUp = await axios.post("http://localhost:4000/api/user/signup", {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password: this.password
      });

      //console.warn("signup", this.nom, this.prenom, this.email, this.password); //warn replace the log ?
      console.warn(fetchSignUp);
      if(fetchSignUp.status == 201){
        
        this.$router.push({name:'Login'})
      }
    },
    switchVisibility(e) {
      e.preventDefault();
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
  mounted(){
      let token = localStorage.getItem('token');
      if(token){
          this.$router.push({name:'Home'})
      }
  }
}
</script>
