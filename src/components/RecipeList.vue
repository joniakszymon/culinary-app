<template>
  <div class="recipe-list">
    <div v-for="recipe in recipes" :key="recipe.id" class="recipe-container">
      <RecipeComponent :recipe="recipe"></RecipeComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RecipeComponent from "@/components/RecipeComponent.vue";
import { Recipe } from '@/types/recipe';

export default defineComponent({
  name: "RecipeList",
  components: {
    RecipeComponent,
  },
  setup() {
    const recipes: { [key: number]: Recipe } = {
      0: {
        id: 0,
        title: "Spaghetti Carbonara",
        servings: 2,
        difficult: 2,
        ingredients: [
          { name: "Spaghetti", quantity: "200g" },
          { name: "Pancetta", quantity: "100g" },
          { name: "Eggs", quantity: "2" },
          { name: "Parmesan cheese", quantity: "50g" },
          { name: "Black pepper", quantity: "to taste" },
        ],
        imgSrc: "https://fomantic-ui.com/images/wireframe/image.png",
        instructions: "...",
      },
      1: {
        id: 1,
        title: "Caesar Salad",
        servings: 4,
        difficult: 3,
        ingredients: [
          { name: "Romaine lettuce", quantity: "1 head" },
          { name: "Croutons", quantity: "1 cup" },
          { name: "Parmesan cheese", quantity: "1/2 cup" },
          { name: "Chicken breast", quantity: "2" },
          { name: "Caesar dressing", quantity: "1/4 cup" },
        ],
        imgSrc: "https://fomantic-ui.com/images/wireframe/image.png",
        instructions: "...",
      },
      2: {
        id: 2,
        title: "Vegetable Omelette",
        servings: 1,
        ingredients: [
            { name: "Eggs", quantity: "3" },
            { name: "Bell pepper", quantity: "1/2" },
            { name: "Tomato", quantity: "1" },
            { name: "Onion", quantity: "1/4" },
            { name: "Spinach", quantity: "1 cup" },
            { name: "Cheese", quantity: "1/4 cup" },
        ],
        imgSrc: "https://fomantic-ui.com/images/wireframe/image.png",
        instructions: "...",
        difficult: 1,
      },
      3: {
        id: 3,
        title: "Alfredo Pasta",
        servings: 3,
        difficult: 2,
        ingredients: [
          { name: "Fettuccine pasta", quantity: "8 oz" },
          { name: "Heavy cream", quantity: "1 cup" },
          { name: "Butter", quantity: "1/4 cup" },
          { name: "Parmesan cheese", quantity: "1/2 cup" },
          { name: "Garlic", quantity: "2 cloves" },
          { name: "Salt and pepper", quantity: "to taste" },
        ],
        imgSrc: "https://fomantic-ui.com/images/wireframe/image.png",
        instructions: "...",
      },
    };
    return {
      recipes,
    };
  },
});
</script>
<style scoped lang="scss">
.recipe-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    align-items: center;
    justify-content: center;
}
</style>
