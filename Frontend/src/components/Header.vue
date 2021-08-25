<template>
  <header class=" container flex justify-center">
    <div class=" bg-rufous lg:w-11/12 lg:h-32 flex items-center">
      <div id="nav-logo" class="flex lg:w-1/3 justify-center items-center"> 
        <img src="../assets/icon-left-font.svg">
      </div>
      <div id="nav-elements" class=" lg:w-2/3">
        <ul class=" flex flex-row gap-4 justify-around text-xl text-snow">
          <li class="flex gap-4 items-center">Messages <font-awesome-icon icon="comment-alt" class=" text-2xl"/></li>
          <li>Notifications <font-awesome-icon icon="bell" class=" text-2xl"/></li>
          <li>Déconnexion <font-awesome-icon icon="sign-out-alt" class=" text-2xl"/></li>
          <li>Mon compte <font-awesome-icon icon="user-circle" class=" text-2xl"/></li>
        </ul>
      </div>

    </div>
  </header>
</template>

<script>
export default {
  name:'Header'
}


</script>


