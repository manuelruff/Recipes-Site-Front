<template>
  <div>
    <b-modal v-model="modalShow" title="Create New Recipe" @ok="submitForm" @cancel="closeModal">
      <b-form @submit.prevent="submitForm">
        <!-- Title -->
        <b-form-group label="Title:" :state="validateField(formData.title)">
          <b-form-input v-model="formData.title" required></b-form-input>
          <b-form-invalid-feedback>Title is required.</b-form-invalid-feedback>
        </b-form-group>

        <!-- Image URL -->
        <b-form-group label="Image URL:" :state="validateField(formData.image)">
          <b-form-input v-model="formData.image" required></b-form-input>
          <b-form-invalid-feedback>Image URL is required.</b-form-invalid-feedback>
        </b-form-group>

        <!-- Instructions -->
        <b-form-group v-for="(instruction, index) in formData.instructions" :key="'instruction-' + index" :label="'Instruction ' + (index + 1)">
          <b-form-input v-model="instruction.text" required></b-form-input>
          <b-button @click="removeInstruction(index)" variant="danger">Remove</b-button>
        </b-form-group>
        <b-button @click="addInstruction" variant="success">Add Instruction</b-button>
        <b-form-invalid-feedback v-if="!formData.instructions.length">At least one instruction is required.</b-form-invalid-feedback>

        <!-- Ready in Minutes -->
        <b-form-group label="Ready in Minutes:" :state="validateField(formData.readyInMinutes)">
          <b-form-input type="number" v-model="formData.readyInMinutes" required :min="0"></b-form-input>
          <b-form-invalid-feedback>Ready in minutes is required and cannot be less than 0.</b-form-invalid-feedback>
        </b-form-group>

        <!-- Servings -->
        <b-form-group label="Servings:" :state="validateField(formData.servings)">
          <b-form-input type="number" v-model="formData.servings" required :min="0"></b-form-input>
          <b-form-invalid-feedback>Servings is required and cannot be less than 0.</b-form-invalid-feedback>
        </b-form-group>

        <!-- Dietary Preferences -->
        <b-form-group label="Dietary Preferences:">
          <b-form-checkbox v-model="formData.glutenFree">Gluten-Free</b-form-checkbox>
          <b-form-checkbox v-model="formData.vegan">Vegan</b-form-checkbox>
          <b-form-checkbox v-model="formData.vegetarian">Vegetarian</b-form-checkbox>
        </b-form-group>

        <!-- Ingredients -->
        <b-form-group v-for="(ingredient, index) in formData.ingredients" :key="'ingredient-' + index">
          <b-form-input v-model="ingredient.name" placeholder="Name" required></b-form-input>
          <b-form-input v-model="ingredient.amount" type="text" placeholder="Amount" required></b-form-input>
          <b-button @click="removeIngredient(index)" variant="danger">Remove</b-button>
        </b-form-group>
        <b-button @click="addIngredient" variant="success">Add Ingredient</b-button>
        <b-form-invalid-feedback v-if="!formData.ingredients.length">At least one ingredient is required.</b-form-invalid-feedback>

      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { BModal, BButton, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BFormCheckbox } from 'bootstrap-vue';
import axios from 'axios';

export default {
  components: {
    BModal,
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BFormCheckbox
  },
  data() {
    return {
      modalShow: false,
      formData: {
        title: '',
        image: '',
        instructions: [],
        readyInMinutes: '',
        servings: '',
        glutenFree: false,
        vegan: false,
        vegetarian: false,
        ingredients: []
      }
    };
  },
  methods: {
    openModal() {
      this.modalShow = true;
    },
    closeModal() {
      this.modalShow = false;
      this.resetForm();
    },
    resetForm() {
      this.formData.title = '';
      this.formData.image = '';
      this.formData.instructions = [];
      this.formData.readyInMinutes = '';
      this.formData.servings = '';
      this.formData.glutenFree = false;
      this.formData.vegan = false;
      this.formData.vegetarian = false;
      this.formData.ingredients = [];
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }

      // Prepare data for submission
      let newRecipe = {
        title: this.formData.title,
        image: this.formData.image,
        instructions: this.formData.instructions.map(instr => ({ text: instr.text })),
        readyInMinutes: parseInt(this.formData.readyInMinutes),
        servings: parseInt(this.formData.servings),
        glutenFree: this.formData.glutenFree,
        vegan: this.formData.vegan,
        vegetarian: this.formData.vegetarian,
        ingredients: this.formData.ingredients.map(ingr => ({ name: ingr.name, amount: ingr.amount }))
      };

      try {
        const response = await axios.post('http://localhost:80/users/myrecipes', newRecipe);
        console.log('Recipe added successfully:', response.data);
        this.closeModal();
      } catch (error) {
        console.error('Error adding recipe:', error);
      }
    },
    validateForm() {
      let valid = true;
      if (!this.formData.title) valid = false;
      if (!this.formData.image) valid = false;
      if (!this.formData.instructions.length) valid = false;
      if (!this.formData.readyInMinutes || this.formData.readyInMinutes < 0) valid = false;
      if (!this.formData.servings || this.formData.servings < 0) valid = false;
      return valid;
    },
    validateField(field) {
      return !!field;
    },
    addInstruction() {
      this.formData.instructions.push({ text: '' });
    },
    removeInstruction(index) {
      this.formData.instructions.splice(index, 1);
    },
    addIngredient() {
      this.formData.ingredients.push({ name: '', amount: '' });
    },
    removeIngredient(index) {
      this.formData.ingredients.splice(index, 1);
    }
  }
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
