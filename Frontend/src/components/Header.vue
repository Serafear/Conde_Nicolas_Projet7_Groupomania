<template>
  <header class="container flex justify-center">
    <div class="bg-rufous w-10/12 h-12 md:w-9/12 md:h-16 lg:w-11/12 lg:h-20 flex items-center lg:items-center md:items-center
    ">
      <div id="nav-logo" class="flex w-2/3 md:w-1/3 lg:w-1/3 justify-center lg:items-center md:items-center">
        <img src="../assets/icon-left-font.svg" />
      </div>
      <div id="nav-elements" class="lg:w-2/3 md:w-2/3 w-20">
        <ul
          class="
            flex lg:flex-row md:flex-row
            lg:gap-4 md:gap-4 md:ml-3
            justify-around
            items-center
            lg:text-xl text-snow md:text-sm text-xs
          "
        > 
        <!--md:block permet d'afficher les éléments pour les autres screen size malgré le hidden-->
          <li class="hidden md:block" >
            <router-link to="/"
              >Accueil <font-awesome-icon icon="home" class="lg:text-2xl"
            /></router-link>
          </li>
          <li class="hidden md:block">
            Messages <font-awesome-icon icon="comment-alt" class="lg:text-2xl" />
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


