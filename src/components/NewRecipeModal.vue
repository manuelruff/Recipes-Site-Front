<template>
  <div>
    <b-modal v-model="modalShow" title="Create New Recipe" @ok="submitForm" @cancel="closeModal">
      <b-form @submit.prevent="submitForm">
        <b-form-group label="Title:" :state="validateField(formData.title)">
          <b-form-input v-model="formData.title" required></b-form-input>
          <b-form-invalid-feedback>Title is required.</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Image URL:" :state="validateField(formData.image)">
          <b-form-input v-model="formData.image" required></b-form-input>
          <b-form-invalid-feedback>Image URL is required.</b-form-invalid-feedback>
        </b-form-group>
        <!-- Add instructions input -->
        <b-form-group v-for="(instruction, index) in formData.instructions" :key="index" :label="'Instruction ' + (index + 1)">
          <b-form-input v-model="instruction.text" required></b-form-input>
          <b-button @click="removeInstruction(index)" variant="danger">Remove</b-button>
        </b-form-group>
        <b-button @click="addInstruction" variant="success">Add Instruction</b-button>
        <b-form-invalid-feedback v-if="!formData.instructions.length">At least one instruction is required.</b-form-invalid-feedback>
        <b-form-group label="Ready in Minutes:" :state="validateField(formData.readyInMinutes)">
          <b-form-input type="number" v-model="formData.readyInMinutes" required></b-form-input>
          <b-form-invalid-feedback>Ready in minutes are required.</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Servings:" :state="validateField(formData.servings)">
          <b-form-input type="number" v-model="formData.servings" required></b-form-input>
          <b-form-invalid-feedback>Servings are required.</b-form-invalid-feedback>
        </b-form-group>
        <!-- Add dietary preferences checkboxes -->
        <b-form-group label="Dietary Preferences:">
          <b-form-checkbox v-model="formData.glutenFree">Gluten-Free</b-form-checkbox>
          <b-form-checkbox v-model="formData.vegan">Vegan</b-form-checkbox>
          <b-form-checkbox v-model="formData.vegetarian">Vegetarian</b-form-checkbox>
        </b-form-group>
        <!-- Add ingredients input -->
        <b-form-group v-for="(ingredient, index) in formData.ingredients" :key="index" label="Ingredients:">
          <b-form-input v-model="ingredient.name" placeholder="Name" required></b-form-input>
          <b-form-input v-model="ingredient.amount" type="number" placeholder="Amount" required></b-form-input>
          <b-button @click="removeIngredient(index)" variant="danger">Remove</b-button>
        </b-form-group>
        <b-button @click="addIngredient" variant="success">Add Ingredient</b-button>
        <b-form-invalid-feedback v-if="!formData.ingredients.length">At least one ingredient is required.</b-form-invalid-feedback>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { BModal, BButton, BForm, BFormGroup, BFormInput, BFormTextarea, BFormInvalidFeedback, BFormCheckbox } from 'bootstrap-vue';

export default {
  components: {
    BModal,
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BFormTextarea,
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
      // Reset form data
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
    submitForm() {
      // Validate form fields before submitting
      if (!this.validateForm()) {
        return;
      }

      // Create new recipe with form data
      let newRecipe = {
        title: this.formData.title,
        image: this.formData.image,
        instructions: this.formData.instructions.map(instr => instr.text),
        readyInMinutes: this.formData.readyInMinutes,
        servings: this.formData.servings,
        glutenFree: this.formData.glutenFree,
        vegan: this.formData.vegan,
        vegetarian: this.formData.vegetarian,
        ingredients: this.formData.ingredients
        // Add other form fields here
      };
      
      // Do something with the new recipe data, like sending it to an API or storing it in Vuex
      
      // Reset form data and close modal
      this.closeModal();
    },
    validateForm() {
      let valid = true;
      if (!this.formData.title) valid = false;
      if (!this.formData.image) valid = false;
      if (!this.formData.instructions.length) valid = false;
      if (!this.formData.readyInMinutes) valid = false;
      if (!this.formData.servings) valid = false;
      // Add validation for other fields here if needed
      return valid;
    },
    validateField(field) {
      return field ? true : false;
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
.modal-button {
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
}

.b-modal-content {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
}

.b-form-input,
.b-form-textarea,
.b-form-checkbox-group {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  color: white;
}
</style>
