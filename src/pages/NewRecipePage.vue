<template>
  <div>
    <button class="modal-button" @click="openModal">Create New Recipe</button>
    
    <div v-if="modalShow" class="modal-overlay">
      <div class="modal">
        <h2>Create New Recipe</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" v-model="formData.title" class="form-control" id="title" required>
          </div>
          <div class="form-group">
            <label for="instructions">Instructions:</label>
            <textarea v-model="formData.instructions" class="form-control" id="instructions" rows="4" required></textarea>
          </div>
          <!-- Add other form fields as needed -->
          <div class="button-group">
            <button type="submit" class="submit-button">Submit</button>
            <button @click="closeModal" class="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalShow: false,
      formData: {
        title: '',
        instructions: ''
        // Add other form fields here
      }
    };
  },
  methods: {
    openModal() {
      this.modalShow = true;
    },
    closeModal() {
      this.modalShow = false;
    },
    submitForm() {
      // Create new recipe with form data
      let newRecipe = {
        title: this.formData.title,
        instructions: this.formData.instructions
        // Add other form fields here
      };
      
      // Do something with the new recipe data, like sending it to an API or storing it in Vuex
      
      // Reset form data and close modal
      this.formData.title = '';
      this.formData.instructions = '';
      this.modalShow = false;
    }
  }
};
</script>

<style scoped>
.modal-button {
  background-color: #4CAF50;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  text-align: right;
}

.submit-button, .cancel-button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
}

.cancel-button {
  background-color: #f44336;
}
</style>
