<template>
    <Header />
    <h1>Welcome-test</h1>
    <Sidebar />
</template>

<script>

import Header from './Header.vue';
import Sidebar from './Sidebar.vue'
export default {
    name:'Home',
    components: {
        Header,
        Sidebar
    },
    data(){
        return{
            nom:''
        }
    },
    mounted(){ //ici l'évènement est monté dont l'opération est finie. Il faut donc rafraichir la page ou créer une fonction qui rafraichit la page dès que le token est touché/ voir aussi eventBus comme solution plus légère
        let token = localStorage.getItem('token');
        if(!token){
            this.$router.push({name:'SignUp'})
        };
    },
}
</script>
