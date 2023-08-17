<template>
  <div class="control-panel">
    <ModalComponent @show-modal="showModal">
      <FormComponent @add-recipe="addNewRecipe"></FormComponent>
    </ModalComponent>
  </div>
  <div class="recipe-list">
    <div v-for="recipe in recipes" :key="recipe._id" class="recipe-container">
      <RecipeComponent :recipe="recipe"></RecipeComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import RecipeComponent from "@/components/RecipeComponent.vue";
import { Recipe } from "@/types/recipe";
import axios from "axios";
import ModalComponent from "./ModalComponent.vue";
import FormComponent from "./FormComponent.vue";

export default defineComponent({
  name: "RecipeList",
  components: {
    RecipeComponent,
    ModalComponent,
    FormComponent,
  },
  setup() {
    const recipes = ref<Recipe[]>([]);

    async function fetchRecipes() {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        recipes.value = response.data;
      } catch (error) {
        console.error("Błąd podczas pobierania przepisów:", error);
      }
    }
    async function addNewRecipe(newRecipe: Recipe) {
      try {
        await axios.post("http://localhost:3000/recipes", newRecipe);
      } catch (error) {
        console.error("Error", error);
      }
    }
    function showModal(modalVisible: boolean) {
      modalVisible = !modalVisible;
      console.log(modalVisible);
    }

    onMounted(() => {
      fetchRecipes();
    });

    return {
      recipes,
      addNewRecipe,
      showModal,
    };
  },
});
</script>

<style scoped lang="scss">
.control-panel {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 30px 0;
}
.recipe-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  align-items: center;
  justify-content: center;
}
</style>
