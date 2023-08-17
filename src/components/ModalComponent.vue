<template>
  <button @click="showModal">Add new recipe</button>
  <div v-if="modalVisible" class="modal">
    <div class="modal-wrapper">
      <button class="close" @click="toggleModal()">
        <v-icon icon="mdi-close" />
      </button>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Ref, ref } from "vue";

export default defineComponent({
  name: "ModalComponent",
  emits: ["showModal"],
  setup(_, { emit }) {
    const modalVisible: Ref<boolean> = ref(false);
    function toggleModal() {
      modalVisible.value = !modalVisible.value;
    }
    function showModal() {
      emit("showModal", modalVisible.value);
      toggleModal();
    }
    return {
      modalVisible,
      toggleModal,
      showModal,
    };
  },
});
</script>
<style scoped lang="scss">
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.2);
  .modal-wrapper {
    min-width: 800px;
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
    padding: 40px;
    .close {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
