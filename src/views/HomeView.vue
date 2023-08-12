<template>
  <div class="home">
    <RecipeList></RecipeList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RecipeList from "@/components/RecipeList.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    RecipeList,
  },
});
</script>
