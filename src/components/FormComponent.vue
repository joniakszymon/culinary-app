<template>
  <form>
    <v-text-field
      v-model="state.name"
      :error-messages="getErrorMessages(v$.name)"
      label="Name"
      required
      @input="v$.name.$touch"
      @blur="v$.name.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.servings"
      :error-messages="getErrorMessages(v$.servings)"
      label="Servings"
      required
      type="number"
      @input="v$.servings.$touch"
      @blur="v$.servings.$touch"
    ></v-text-field>

    <v-autocomplete
      v-model="state.ingredients"
      :error-messages="getErrorMessages(v$.ingredients)"
      :items="items"
      chips
      label="Ingredients"
      multiple
      required
      @input="v$.ingredients.$touch"
      @blur="v$.ingredients.$touch"
    ></v-autocomplete>

    <v-textarea
      v-model="state.instructions"
      :error-messages="getErrorMessages(v$.instructions)"
      label="Instructions"
      required
      @input="v$.instructions.$touch"
      @blur="v$.instructions.$touch"
    ></v-textarea>

    <v-file-input
      accept="image/*"
      label="File input"
      @change="getFileInputValue"
    ></v-file-input>

    <v-text-field
      v-model="state.difficult"
      :error-messages="getErrorMessages(v$.difficult)"
      label="Difficult"
      required
      type="number"
      @input="v$.difficult.$touch"
      @blur="v$.difficult.$touch"
    ></v-text-field>

    <v-btn class="me-4" @click="submitForm">Submit</v-btn>
    <v-btn @click="clear">Clear</v-btn>
  </form>
</template>

<script lang="ts">
import { reactive, ref, defineComponent, Ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, between } from "@vuelidate/validators";
import { ingredients } from "../helpers/utils";
import axios from "axios";

export default defineComponent({
  name: "FormComponent",
  emits: ["addRecipe"],
  setup(_, { emit }) {
    const items = ref(ingredients);
    const myFileInputValue: Ref<File | null> = ref(null);

    const initialState = {
      name: "Test",
      servings: 2,
      ingredients: ["Milk", "Butter"],
      instructions: "test",
      image: null,
      difficult: 2,
    };

    const state: any = reactive({
      ...initialState,
    });

    const rules = {
      name: { required },
      servings: { required, between: between(1, 10) },
      ingredients: { required },
      instructions: { required },
      difficult: { required, between: between(1, 5) },
    };

    const v$ = useVuelidate(rules, state);

    function getFileInputValue(event: any) {
      const file = event.target.files;
      myFileInputValue.value = file[0];
    }

    async function sendImage(image: any) {
      try {
        console.log("Co przekazujemy z frontendu? ", image);
        const formData = new FormData();
        formData.append("file", image);

        const response = await axios.post(
          "http://localhost:3000/uploads",
          formData
        );
        console.log("Odpowiedź z serwera:", response.data);
      } catch (error) {
        console.error("Błąd: ", error);
      }
    }

    async function submitForm() {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      }
      if (myFileInputValue.value) {
        sendImage(myFileInputValue.value);
      }
      const myFile = myFileInputValue.value
        ? myFileInputValue.value.name
        : "https://www.google.com/url?sa=i&url=https%3A%2F%2Freact.semantic-ui.com%2Felements%2Fimage%2F&psig=AOvVaw2BQ-96aoaWKKO359V0eDjc&ust=1692361834270000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPi60qHZ44ADFQAAAAAdAAAAABAE";

      const newRecipe = {
        title: state.name,
        servings: state.servings,
        ingredients: state.ingredients,
        instructions: state.instructions,
        imgSrc: myFile,
        difficult: state.difficult,
      };

      emit("addRecipe", newRecipe);

      clear();
    }

    const getErrorMessages = (field: { $errors: any[] }) => {
      return field.$errors.map((e: { $message: any }) => e.$message);
    };

    function clear() {
      v$.value.$reset();

      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    }

    return {
      clear,
      state,
      submitForm,
      v$,
      items,
      getErrorMessages,
      getFileInputValue,
    };
  },
});
</script>
