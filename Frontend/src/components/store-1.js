
import Vuex from "vuex";
import axios from"axios";
Vue.use(Vuex);


const actions = {
    getMe: ({commit}) =>{
        axios.get("http://localhost:4000/api/user/:userId", {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }).then(response => {
            commit('SET_ME', response.data)
        })
    }
}


let store = new Vuex.Store({
    state: {
        nom:''
    },
    mutations: {
        
    },
    getters: {},
    actions: actions,
})

global.store = store;

export default store