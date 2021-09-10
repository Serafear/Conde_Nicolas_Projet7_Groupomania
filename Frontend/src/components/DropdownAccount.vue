<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="
        relative
        z-10
        w-full
        h-full
        outline-none
        hover:text-rufous
        flex flex-row
        gap-2
        border
        rounded-xl
        p-2
        bg-pinky-1
        text-ox-bl
      "
    >
      <p>{{ nom }}</p>
      <!--le z-index ne peut pas marcher sans une position ex: relative-->
      <font-awesome-icon icon="caret-down" class="text-2xl mt-1" />
    </button>
    <!--on va crée un bouton qui va fermer le toggle si on appui en dehors du toggle-->
    <button
      id="exit-button"
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed inset-0 h-full w-full bg-ox-bl bg-opacity-50 cursor-default"
    ></button>
    <!--le tab index -1 rend le bouton inaccessible aux manips clavier et inset fait top mid left right-0-->
    <div
      v-if="isOpen"
      class="
        right-0
        absolute
        mt-2
        p-2
        w-48
        bg-white
        rounded-xl
        overflow-hidden
        shadow-xl
      "
    >
      <router-link
        :to="'/mypage/' + this.id"
        class="block text-gunmetal hover:bg-lav-bl"
        >Mon compte</router-link
      >
      <a @click="logout" href="#" class="block text-gunmetal hover:bg-lav-bl"
        >Déconnexion</a
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DropdownAccount",
  data() {
    return {
      isOpen: false,
      nom: "",
      id: "",
    };
  },
  created() {
    let handleEscape = (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        this.isOpen = false;
      }
    };

    document.addEventListener("keydown", handleEscape);

    //this.$once ne marche plus avec vue 3
    this.$emit("hook:beforeDestroy", () => {
      document.removeEventListener("keydown", handleEscape);
    });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
  async created() {
    let fetchMyPage = await axios.get("http://localhost:4000/api/user/me", {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    this.nom = fetchMyPage.data.nom;
    this.prenom = fetchMyPage.data.prenom;
    this.email = fetchMyPage.data.email;
    this.id = fetchMyPage.data.id;
  },
};
</script>