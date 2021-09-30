<template>
  <div
    id="post"
    class="
      flex flex-col
      bg-pinky-1
      text-ox-bl
      pb-4
      mt-10
      h-96
      md:w-2/4
      w-full
      md:overscroll-contain md:overflow-auto
    "
    :class="{ myPost: mypost.user.id == $store.state.userId }"
  >
    <div class="flex flex-col gap-4 ml-4 mt-3 lg:w-c30">
      <span>{{ mypost.user.nom }}</span>
      <div class="flex flex-row gap-4">
        <span class="w-3/5 break-words">{{ mypost.body }} </span>
        <img
          v-if="mypost.image"
          class="flex lg:w-2/6 w-2/6 mr-2"
          :src="mypost.image"
          alt="postPhoto"
        />
      </div>

      <span>{{ mypost.user.createdAt }}</span>
    </div>

    <div
      v-if="mypost.user.id == this.$store.state.userId"
      class="flex flex-row gap-3 mt-7 pl-4"
    >
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

    <div class="textinput container flex flex-col gap-3" v-if="isOpen">
      <text-area-autosize
        class="border border-black border-solid w-64 ml-4 mt-4 text-black"
        name="send"
        v-model="form.body"
        rows="2"
      />

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
          @click.prevent="modifyPost(), (isOpen = false)"
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
    clear() {
      const input = this.$refs.fileUpload;
      input.type = "text";
      input.type = "file";
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.warn(this.selectedFile);
    },

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
            (this.form.body = ""), console.warn(response);
            this.$emit("refetchPost");
          });
      } else if (!this.selectedFile && this.form.body) {
        const formData = new FormData();

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
            (this.form.body = ""), console.warn(response);
            this.$emit("refetchPost");
          });
      } else {
        const formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.name);

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
            this.$emit("refetchPost");
          });
      }
      this.$emit("refetchPost");
    },
    async deletePost(e) {
      e.preventDefault();
      await axios
        .delete("http://localhost:4000/api/post/" + this.$route.params.postId, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
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
