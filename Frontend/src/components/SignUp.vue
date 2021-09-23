<template>
  <div id="signup_page" class=" container
      bg-an-br
      md:w-screen
      md:h-screen
      md:grid md:grid-flow-col
      justify-center
      items-center
    ">
    <div id="logo" class=" md:overflow-hidden md:w-80 lg:h-4/6 lg:w-96 flex justify-center items-center bg-white">
      <img alt="logo_project" src="../assets/icon-above-font.png"/> <!--l'élément parent doit être en flex justify+item center-->
    </div>
    <section id="signup_form" class=" bg-rufous
        md:w-80
        md:h-80
        lg:h-4/6
        lg:w-96
        flex flex-col
        justify-center
        items-center">
    <h1 class=" flex justify-center items-center text-snow">Créez votre compte</h1>
      <form class=" flex flex-col pt-4 gap-2">  <!--gap work with flex !!-->
        <input type="text" id="nom" name="nom" v-model="nom" class=" border-black border p-1 w-56 md:w-60" placeholder="Entrez votre nom">
        <input type="text" id="prenom" name="prenom" v-model="prenom" class=" border-black border p-1 w-56 md:w-60" placeholder="Entrez votre prénom">
        <input type="email" id="email" name="email" v-model="email" class=" border-black border p-1 w-56 md:w-60" placeholder="Entrez votre email">
        <div class="flex flex-row justify-center">
          <input
            :type="passwordFieldType"
            v-model="password"
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            class="border-black border w-48 md:w-52 p-1 border-r-0 focus:outline-none xl:resize-none xl:whitespace-nowrap xl:overflow-x-scroll"
          />
          <button
            v-on:click="switchVisibility"
            type="password"
            class="bg-white border border-black border-l-0 px-1.5 lg:px-1"
          >
            <font-awesome-icon icon="eye" class="lg:text-xl" />
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
  created(){
      let token = localStorage.getItem('token');
      if(token){
          this.$router.push({name:'Home'})
      }
  }
}
</script>
