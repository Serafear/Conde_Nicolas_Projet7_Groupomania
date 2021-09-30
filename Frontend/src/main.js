import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import router from "./routers";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCommentAlt,
  faBell,
  faSignOutAlt,
  faUserCircle,
  faEye,
  faHome,
  faCaretDown,
  faComment,
  faThumbsUp,
  faThumbsDown,
  faPaperPlane,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCommentAlt,
  faBell,
  faSignOutAlt,
  faUserCircle,
  faEye,
  faHome,
  faCaretDown,
  faComment,
  faThumbsDown,
  faThumbsUp,
  faPaperPlane,
  faFileImage
);

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
