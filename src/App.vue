<template>
  <HeaderComponent />
  <div class="container">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default defineComponent({
  components: {
    HeaderComponent,
  },
});
</script>

<style lang="scss">
$primary-color: #0f0f0f;
$font-family: "Lora", serif;
$font-size-base: 16px;

* {
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $font-family;
  font-size: $font-size-base;
  color: $primary-color;
  a {
    color: $primary-color;
  }
}
.container {
  position: relative;
  max-width: 1200px;
  margin: auto;
  width: 100%;
  height: 100%;
  margin-top: 140px;
}
ul > li {
  a {
    padding: 10px 15px;
  }
}
</style>
