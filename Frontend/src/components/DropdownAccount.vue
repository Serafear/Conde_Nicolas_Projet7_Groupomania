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
        lg:p-2 lg:text-xl
        md:px-1
        px-1
        items-center
        bg-pinky-1
        text-ox-bl text-sm
      "
    >
      <p>{{ nom }}</p>
      <font-awesome-icon icon="caret-down" class="text-2xl mt-1" />
    </button>
    <button
      id="exit-button"
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed inset-0 h-full w-full bg-ox-bl bg-opacity-50 cursor-default"
    ></button>
    <div
      v-if="isOpen"
      class="
        right-0
        absolute
        mt-2
        -mr-5
        md:-mr-1
        lg:-mr-4
        xl:-mr-0
        lg:p-2
        md:p-2
        lg:w-48
        md:w-28 md:h-14
        w-28
        h-24
        flex
        justify-center
        items-center
        bg-white
        rounded-xl
        overflow-hidden
        shadow-xl
      "
    >
      <ul>
        <li>
          <router-link
            :to="'/mypage/' + this.id"
            class="block text-gunmetal hover:bg-lav-bl"
            >Mon compte</router-link
          >
        </li>
        <li>
          <a
            @click="logout"
            href="#"
            class="block text-gunmetal hover:bg-lav-bl"
            >Déconnexion</a
          >
        </li>

        <li class="text-ox-bl md:hidden lg:hidden">
          <router-link to="/"
            >Accueil <font-awesome-icon icon="home" class="lg:text-2xl"
          /></router-link>
        </li>
        <li class="text-ox-bl md:hidden lg:hidden">
          Messages <font-awesome-icon icon="comment-alt" class="lg:text-2xl" />
        </li>
        <li class="text-ox-bl md:hidden lg:hidden">
          Notifications <font-awesome-icon icon="bell" class="lg:text-2xl" />
        </li>
      </ul>
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
