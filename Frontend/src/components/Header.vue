<template>
  <header class="container flex justify-center">
    <div class="bg-rufous lg:w-11/12 lg:h-20 flex items-center">
      <div id="nav-logo" class="flex lg:w-1/3 justify-center items-center">
        <img src="../assets/icon-left-font.svg" />
      </div>
      <div id="nav-elements" class="lg:w-2/3">
        <ul
          class="
            flex flex-row
            gap-4
            justify-around
            items-center
            text-xl text-snow
          "
        >
          <li>
            <router-link to="/"
              >Accueil <font-awesome-icon icon="home" class="text-2xl"
            /></router-link>
          </li>
          <li>
            Messages <font-awesome-icon icon="comment-alt" class="text-2xl" />
          </li>
          <li>
            Notifications <font-awesome-icon icon="bell" class="text-2xl" />
          </li>
          <li class=""><DropdownAccount /></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import DropdownAccount from "./DropdownAccount.vue";
export default {
  name: "Header",
  components: { DropdownAccount },
};
</script>


