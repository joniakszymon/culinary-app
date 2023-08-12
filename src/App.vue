<template>
  <!--   <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
$primary-color: #0f0f0f;
$font-family: "Lora", serif;
$font-size-base: 16px;

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $font-family;
  font-size: $font-size-base;
  color: $primary-color;
}
.container {
  position: relative;
  max-width: 1200px;
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>
