<template>
  <Header />
  <div v-if="isShown">
    <h1 class="text-3xl mt-9">Pour supprimer votre compte appuyez ici</h1>
    <input
      type="button"
      @click="(isOpen = !isOpen) && (isShown = !isShown)"
      value="Supprimer"
      class="
        bg-pinky-1
        border-black border border-solid
        rounded-xl
        p-1
        mt-5
        cursor-pointer
      "
    />
  </div>

  <section
    v-if="isOpen"
    class="flex flex-col justify-center items-center mt-32"
  >
    <h1>Confirmation</h1>
    <p>Désirez vous réellement supprimer</p>
    <p>votre compte ?</p>
    <div class="flex flex-row gap-4">
      <button
        class="border border-black border-solid"
        @click="(isShown = true), (isOpen = false)"
      >
        Non
      </button>
      <button class="border border-black border-solid" @click="deleteAccount">
        Oui
      </button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
export default {
  name: "Delete",
  components: {
    Header,
  },
  data() {
    return {
      isOpen: false,
      isShown: true,
    };
  },
  methods: {
    async deleteAccount() {
      let deleteMyPage = await axios.delete(
        "http://localhost:4000/api/user/" + this.$route.params.userId,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.warn(deleteMyPage);
      if (deleteMyPage.status == 200) {
        localStorage.clear();
        this.$router.push({ name: "SignUp" });
      }
    },
  },
};
</script>