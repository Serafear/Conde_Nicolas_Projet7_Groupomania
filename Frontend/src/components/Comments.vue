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
        p-1
        px-2
        text-ox-bl
        border-black
      "
    >
      <font-awesome-icon
        icon="comment"
        class="comment text-2xl text-rufous mt-1"
      />
      <p>{{ Post.id }}</p>
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
        -right-3
        absolute
        z-20
        md:mt-5
        mt-5
        text-gunmetal
        p-2
        md:h-72
        h-80
        md:w-96
        w-60
        bg-an-br
        rounded-xl rounded-b-none
        overscroll-contain
        overflow-auto
        shadow-xl
        flex flex-col
        gap-3
        items-center
      "
    >
      <dropdown-comments
        v-for="homecomment in pc.Comments"
        :key="homecomment.id"
        :homecomment="homecomment"
        @refetchPost="refreshPost"
      />
    </div>

    <div
      v-if="isOpen"
      class="
        md:-bottom-80
        -bottom-80
        md:-mb-9
        -mb-16
        -right-3
        absolute
        md:w-96
        w-60
        z-20
        text-gunmetal
        p-2
        bg-rufous
        rounded-xl rounded-t-none
        shadow-xl
        flex flex-col
        lg:flex-row
        gap-2
      "
    >
      <text-area-autosize-small
        class="
          box-border
          md:w-4/6
          w-5/6
          border border-black
          shadow-lg
          text-black
        "
        name="input"
        v-if="isOpen"
        v-model:comment="comment.body"
      />
      <input
        type="file"
        ref="fileUpload"
        class="hidden"
        accept="image/*"
        @change="onFileSelected"
      />

      <div class="flex flex-row gap-2 md:w-5/6 w-64 items-center" v-if="isOpen">
        <p class="text-snow">choisir un fichier :</p>
        <button
          class="
            flex flex-row
            gap-2
            bg-an-br
            p-1
            border border-dotted border-rufous
            animate-pulse
          "
          @click="$refs.fileUpload.click()"
        >
          <font-awesome-icon
            icon="file-image"
            class="file-image text-2xl text-rufous"
          />
        </button>

        <input
          type="button"
          class="confirmer border border-black px-1 bg-an-br rounded-md"
          value="confirmer"
          @click.prevent="createComment"
          tabindex="-1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DropdownComments from "./DropdownComments.vue";
import TextAreaAutosizeSmall from "./TextAreaAutosizeSmall.vue";
export default {
  name: "Comments",
  props: ["Post"],
  emits: [],
  components: {
    DropdownComments,
    TextAreaAutosizeSmall,
  },
  data() {
    return {
      pc: {
        body: "",
        image: "",
      },
      isOpen: false,
      selectedFile: null,
      comment: {
        body: "",
      },
    };
  },
  async created() {
    this.refreshPost();
  },
  methods: {
    async refreshPost() {
      let fetchPost = await axios.get(
        `http://localhost:4000/api/post/${this.Post.id}`,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.warn(fetchPost);
      this.pc = fetchPost.data;
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.warn(this.selectedFile);
    },
    async createComment() {
      if (this.selectedFile && this.comment.body) {
        const formData = new FormData();
        formData.append("body", this.comment.body);
        formData.append("image", this.selectedFile, this.selectedFile.name);
        formData.append("userId", this.$store.state.userId);
        formData.append("postId", this.Post.id);
        await axios
          .post(
            `http://localhost:4000/api/post/${this.Post.id}/comment`,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            }
          )
          .then((response) => {
            (this.comment.body = ""), console.warn(response);
            this.refreshPost();
          });
      } else if (!this.selectedFile && this.comment.body) {
        const formData = new FormData();
        formData.append("body", this.comment.body);
        formData.append("userId", this.$store.state.userId);
        formData.append("postId", this.Post.id);
        await axios
          .post(
            `http://localhost:4000/api/post/${this.Post.id}/comment`,
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("token")),
              },
            }
          )
          .then((response) => {
            (this.comment.body = ""), console.warn(response);
            this.refreshPost();
          });
      } else if (this.selectedFile && !this.comment.body) {
        const formData = new FormData();

        formData.append("image", this.selectedFile, this.selectedFile.name);
        formData.append("userId", this.$store.state.userId);
        formData.append("postId", this.Post.id);
        await axios
          .post(
            `http://localhost:4000/api/post/${this.Post.id}/comment`,
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
            this.refreshPost();
          });
      }
      this.refreshPost();
    },
  },
};
</script>

<style scoped>
.dropButton {
  background-color: #f9e7e7;
}
.comment {
  color: #a40606;
}
.owner .dropButton {
  background-color: #a40606;
  border-color: #a40606;
}
.owner .comment {
  color: white;
}
</style>
