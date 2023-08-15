<template>
  <header>
    <div class="logo">CULINARY APP</div>
    <nav>
      <ul>
        <li><a href="">Przepisy</a></li>
        <li><a href="">Konto</a></li>
        <li><a href="">Zaloguj</a></li>
        <li><a href="">Wyloguj</a></li>
        <li><a href="">Zarejesteruj się</a></li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderComponent",
});
</script>
<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100px;
  background-color: rgb(103, 138, 138);
  z-index: 999;
  .logo {
    position: absolute;
    left: 4rem;
  }
  nav {
    position: absolute;
    right: 4rem;
    ul {
      display: flex;
      list-style: none;
    }
  }
}
</style>
