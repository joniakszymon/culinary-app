<template>
  <router-link :to="`/recipe/${slugify(recipe?.title as string)}`">
    <div class="recipe">
      <img :src="recipe?.imgSrc" :alt="`image of ${recipe?.title}`" />
      <div class="info">
        <p class="title">{{ recipe?.title }}</p>
        <p class="serving">
          Danie dla:
          {{
            recipe?.servings === 1
              ? `${recipe?.servings} osoby`
              : `${recipe?.servings} osób`
          }}
        </p>
        <p class="level">
          Poziom:
          {{ difficultLevel() }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Recipe } from "@/types/recipe";
import { slugify } from "@/helpers/utils";

export default defineComponent({
  name: "RecipeComponent",
  props: {
    recipe: {
      type: Object as () => Recipe,
    },
  },
  setup(props) {
    onMounted(() => {
      console.log(props.recipe);
    });
    function difficultLevel() {
      switch (props.recipe?.difficult) {
        case 1:
          return "Bardzo łatwy";
        case 2:
          return "Łatwy";
        case 3:
          return "Średnio-zaawansowany";
        case 4:
          return "Zaawansowany";
        case 5:
          return "Profesjonalny";
        default:
          return "Brak informacji";
      }
    }
    return {
      difficultLevel,
      slugify,
    };
  },
});
</script>
<style scoped lang="scss">
a {
  text-decoration: none;
  .recipe {
    border-radius: 5px;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.05);
    overflow: hidden;
    transition: scale 0.3s ease-in-out;
    img {
      width: 100%;
      height: auto;
    }
    .info {
      padding: 10px;
    }
  }
  &:hover {
    .recipe {
      scale: 1.03;
    }
  }
}
</style>
