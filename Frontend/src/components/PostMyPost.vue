<template>
  <div
    id="post"
    class="
      flex flex-col
      bg-black
      text-snow
      pb-4
      mt-10
      h-96
      w-2/4
      overscroll-contain
      overflow-auto
    "
    :class="{ myPost: mypost.user.id == $store.state.userId }"
  >
    <!--ici, on aura le contenu du post. le v-bind="$attrs" arrête l'erreur: Extraneous non-props attributes
    L'autre methode c'est inheritAttrs: false déclarée dans OnePost-->
    <div class="flex flex-col gap-4 ml-4 mt-3 w-c30">
      <span>{{ mypost.user.nom }}</span>
      <div class="flex flex-row gap-4">
        <span class="w-3/5 break-words">{{ mypost.body }} </span>
        <img v-if="mypost.image" class="flex w-2/6" :src="mypost.image" alt="postPhoto" />
      </div>

      <span>{{ mypost.user.createdAt }}</span>
    </div>

    <!--ici on aura la suppression et la modif du message-->
    <div class="flex flex-row gap-3 mt-7 pl-4">
      <input
        type="button"
        class="modifier border border-black p-1 rounded-md w-20"
        value="modifier"
        @click="isOpen = !isOpen"
      />
      <input
        type="button"
        class="supprimer border border-black p-1 rounded-md w-20"
        value="supprimer"
        @click="deletePost"
      />
    </div>
    <!--ici on aura l'input de la modif-->
    <!--il faudra remplacer tout les input type text par textarea.
    Les rows et cols gèrent la hauteur et longueur 
    -->
    <div class="textinput container flex flex-col gap-3"  v-if="isOpen">
      <text-area-autosize name="send" v-model="form.body" />
      <!--ici boutons confirmer et input type file-->
      <div class="flex-col flex gap-3 ml-4">
        <input
          type="file"
          ref="fileUpload"
          @change="onFileSelected"
          accept="image/*"
        />
        <input
          type="button"
          class="confirmer border border-black p-1 rounded-md w-20"
          value="confirmer"
          @click.prevent="modifyPost(), isOpen = false"
          tabindex="-1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TextAreaAutosize from "./TextAreaAutosize.vue";
export default {
  inheritAttrs: false,
  name: "PostMyPost",
  components: {
    TextAreaAutosize,
  },
  props: ["mypost"],
  data() {
    return {
      selectedFile: null,
      isOpen: false,
      form: {
        body: "",
      },
    };
  },
  methods: {
    //foncion pour enlever le nom de l'image d'input
    clear() {
      const input = this.$refs.fileUpload;
      input.type = "text";
      input.type = "file";
    },
    //autre méthode
    /* clearInput(e) {
      e.target.value = '';
    }, */

    onFileSelected(event) {
      this.selectedFile = event.target.files[0]; //it will take the first element in the event>target>files
      //to see the path in the console i can console warn(event)  (its for image upload)
      console.warn(this.selectedFile);
    },

    //modifier le post
    async modifyPost() {
      if (this.selectedFile && this.form.body) {
        const formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.name);
        formData.append("body", this.form.body);
        await axios
          .put(
            "http://localhost:4000/api/post/" + this.$route.params.postId,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            }
          )
          .then((response) => {
            (this.form.body = ""), //enlève le contenu du mssage dans l'input
              console.warn(response);
            this.$emit("refetchPost"); //change dynamiquement le contenu
          });

        //contrairement à l'opération dans CommentsMyPost
        this.clear();
      } else if (!this.selectedFile && this.form.body) {
        const formData = new FormData();
        //formData.append("image", this.message.image, this.message.image.name);
        formData.append("body", this.form.body);
        await axios
          .put(
            "http://localhost:4000/api/post/" + this.$route.params.postId,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            }
          )
          .then((response) => {
            (this.form.body = ""),
              //enlève le contenu du mssage dans l'input
              console.warn(response);
            this.$emit("refetchPost");
          });

        //contrairement à l'opération dans CommentsMyPost
      } else {
        const formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.name);
        //formData.append("body", this.form.body);
        await axios
          .put(
            "http://localhost:4000/api/post/" + this.$route.params.postId,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
              onUploadProgress: (uploadEvent) => {
                console.warn(
                  "Upload Progress" +
                    Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
                    "%"
                );
              },
            }
          )
          .then((response) => {
            console.warn(response);
            this.$emit("refetchPost"); //change dynamiquement le contenu. On refetch symplement le post ici
          });

        //contrairement à l'opération dans CommentsMyPost
        this.clear();
      }
      this.$emit("refetchPost");
    },
    async deletePost(e) {
      e.preventDefault();
      await axios.delete(
        "http://localhost:4000/api/post/" + this.$route.params.postId,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      )
        .then(() => {
          this.$router.push({ name: "Home" });
        });
    },
  },
};
</script>

<style scoped>
.myPost {
  background-color: #a40606;
}
.myPost .modifier,
.myPost .supprimer,
.myPost .confirmer {
  background-color: #a6a2a2;
  color: black;
}
</style>