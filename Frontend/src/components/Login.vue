<template>
  <div id="login_page" class="container bg-an-br lg:w-screen lg:h-screen grid grid-flow-col justify-center items-center">
    <div id="logo" class=" lg:h-4/6 lg:w-96 flex justify-center items-center bg-white">
      <img alt="logo_project" src="../assets/icon-above-font.png"/> <!--l'élément parent doit être en flex justify+item center-->
    </div>
    <section id="login_form" class=" bg-rufous lg:h-4/6 lg:w-96 flex flex-col justify-center items-center">
    <h1 class=" flex justify-center items-center text-snow">Connectez-vous à votre compte</h1>
      <form class=" flex flex-col pt-4 gap-2">  <!--gap work with flex !!-->
        <label for="email" class=" text-snow">EMAIL</label>
        <input type="email" id="email" name="email" v-model="email" class=" border-black border p-1 lg:w-60">
        <label for="password" class=" text-snow">Mot de passe</label>
        <input type="password" id="password" name="password" v-model="password" class=" border-black border p-1">
        <input type="button" v-on:click="login" id="in-conn" name="in-conn" value="connexion" class=" rounded-xl border-black border p-1 mt-4 bg-grullo"> 
      </form>
      <p class=" text-sm mt-3 text-snow">Si vous n'avez pas de compte cliquez ici :</p>
      <router-link to="/signup" class=" text-snow font-bold underline">INSCRIPTION</router-link>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Login",
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login(){
      let fetchLogin = await axios.post(`http://localhost:4000/api/user/login/?email=${this.email}`,{
        email: this.email,
        password: this.password
      });
      console.warn(fetchLogin);
      if(fetchLogin.status==200){ // another condition but dont work: fetchLogin.status==200 && fetchLogin.data.length>0
          localStorage.setItem("user-info", JSON.stringify(fetchLogin.data));
          this.$router.push({name:'Home'})
      }
    }
  },
  mounted(){
      let user = localStorage.getItem('user-info');
      if(user){
          this.$router.push({name:'Home'})
      }
  }
}
</script>



