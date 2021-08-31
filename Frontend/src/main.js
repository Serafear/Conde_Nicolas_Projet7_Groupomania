
import { createApp } from "vue";
import App from "./App.vue";
import Vuex from"vuex"; //fait communiquer les différents composents entre eux. Il est lié au store !
import "./index.css";
import {library} from "@fortawesome/fontawesome-svg-core";
import router from "./routers";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCommentAlt, faBell, faSignOutAlt, faUserCircle, faEye, faHome, faCaretDown} from "@fortawesome/free-solid-svg-icons";


library.add(faCommentAlt, faBell, faSignOutAlt, faUserCircle, faEye, faHome, faCaretDown);


createApp(App)
.use(router)
.use(Vuex)
.component("font-awesome-icon", FontAwesomeIcon)
.mount("#app");



/* pour installer font awesome avec vue
npm i --save @fortawesome/vue-fontawesome@prerelease
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

library.add(faPhone); 

faphone est un exemple ici, j'ai utilisé facommentalt qui donne le font : fas fa-comment-alt
pour chaque font il faudra import et l'ajouter à la librairie

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

*/