<template>
  <header class="container flex flex-row justify-center items-center">
    <div
      class="
        flex flex-row
        w-2/3
        h-12
        sm:h-16
        md:h-16 md:w-1/3
        lg:h-20 lg:w-1/3
        justify-center
        items-center
        overflow-hidden
      "
    >
      <div class="flex">
        <img class="flex w-full" src="../assets/icon-left-font.png" />
      </div>
    </div>
    <div
      class="
        bg-rufous
        w-3/12
        h-12
        md:w-6/12 md:h-16
        lg:w-7/12 lg:h-20
        flex
        justify-center
        items-center
        lg:items-center
        md:items-center
      "
    >
      <div id="nav-elements" class="md:w-full w-20">
        <ul
          class="
            flex
            lg:flex-row
            md:flex-row
            lg:gap-4
            md:gap-4 md:ml-1
            justify-around
            items-center
            lg:text-xl
            text-snow
            md:text-sm
            text-xs
          "
        >
          <li class="hidden md:block">
            <router-link to="/"
              >Accueil <font-awesome-icon icon="home" class="lg:text-2xl"
            /></router-link>
          </li>
          <li class="hidden md:block">
            Messages
            <font-awesome-icon icon="comment-alt" class="lg:text-2xl" />
          </li>
          <li class="hidden md:block">
            Notifications <font-awesome-icon icon="bell" class="lg:text-2xl" />
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
