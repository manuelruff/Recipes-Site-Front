<template>
  <div>
    <b-modal v-model="modalShow" title="Create New Recipe" @ok="submitForm" @cancel="closeModal" :ok-disabled="!isFormValid" @hidden="resetForm">
      <b-form @submit.prevent="submitForm">
        <!-- Main Warning Message -->
        <b-alert v-if="!isFormValid" variant="danger" show>
          You must fill all the fields to insert recipe - at least one ingredient and instruction.
        </b-alert>

        <!-- Title -->
        <b-form-group label="Title:" :state="validateField(formData.title)">
          <b-form-input v-model="formData.title" required></b-form-input>
        </b-form-group>

        <!-- Image URL -->
        <b-form-group label="Image URL:" :state="validateField(formData.image)">
          <b-form-input v-model="formData.image" required maxlength="500"></b-form-input>
        </b-form-group>

        <!-- Instructions -->
        <b-form-group v-for="(instruction, index) in formData.instructions" :key="'instruction-' + index" :label="'Instruction ' + (index + 1)">
          <b-form-input v-model="instruction.text" required></b-form-input>
          <b-button @click="removeInstruction(index)" variant="danger">Remove</b-button>
        </b-form-group>
        <b-button @click="addInstruction" variant="success">Add Instruction</b-button>

        <!-- Ready in Minutes -->
        <b-form-group label="Ready in Minutes:" :state="validateField(formData.readyInMinutes)">
          <b-form-input type="number" v-model="formData.readyInMinutes" required :min="1"></b-form-input>
        </b-form-group>

        <!-- Servings -->
        <b-form-group label="Servings:" :state="validateField(formData.servings)">
          <b-form-input type="number" v-model="formData.servings" required :min="1"></b-form-input>
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
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { BModal, BButton, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BFormCheckbox, BAlert } from 'bootstrap-vue';
import { PostMyRecipe } from "../services/user.js";

export default {
  components: {
    BModal,
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    // BFormInvalidFeedback,
    BFormCheckbox,
    BAlert
  },
  data() {
    return {
      modalShow: false,
      formData: {
        title: '',
        image: '',
        instructions: [],
        readyInMinutes: 1,
        servings: 1,
        glutenFree: false,
        vegan: false,
        vegetarian: false,
        ingredients: []
      }
    };
  },
  computed: {
    isFormValid() {
      const fieldsFilled = this.formData.title && this.formData.image && this.formData.readyInMinutes >= 1 && this.formData.servings >= 1;
      const instructionsFilled = this.formData.instructions.length > 0 && this.formData.instructions.every(instr => instr.text.trim() !== '');
      const ingredientsFilled = this.formData.ingredients.length > 0 && this.formData.ingredients.every(ingr => ingr.name.trim() !== '' && ingr.amount.trim() !== '');
      return fieldsFilled && instructionsFilled && ingredientsFilled;
    }
  },
  methods: {
    openModal() {
      this.modalShow = true;
    },
    closeModal() {
      this.modalShow = false;
    },
    resetForm() {
      this.formData.title = '';
      this.formData.image = '';
      this.formData.instructions = [];
      this.formData.readyInMinutes = 1;
      this.formData.servings = 1;
      this.formData.glutenFree = false;
      this.formData.vegan = false;
      this.formData.vegetarian = false;
      this.formData.ingredients = [];
    },
    async submitForm() {
      if (!this.isFormValid) {
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
        const response = await PostMyRecipe(newRecipe);
        if(response.status === 200){
          console.log('Recipe added successfully:', response.data);
          this.closeModal();
        }
        else{
          console.log("Error adding recipe: ", response);
        }
      } catch (error) {
        console.error('Error adding recipe:', error);
      }
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
</style>