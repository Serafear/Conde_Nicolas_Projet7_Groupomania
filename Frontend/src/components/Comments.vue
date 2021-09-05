<template>
  <span class="flex flex-row justify-end gap-3">
    <p>{{Post.id}}</p>
    <dropdown-comments :key="Post.id" :Post="Post" /> 
    <!--dropdown-comment est équivalent a DropdownComment.
    :key et :Post ainsi que le props dans DropdownComment 
    sont indispensable pour la lecture du Post.id
    -->
  </span>
</template>

<script>

import DropdownComments from './DropdownComments.vue'
export default {
  name: "Comments",
  props:["Post"], //props ne fonctionne que parceque comment est enfant de Home ? 
  components:{
    DropdownComments
  }
};
</script>

