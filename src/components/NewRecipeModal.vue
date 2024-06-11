<template>
  <div>
    <b-button id="show-btn" @click="showModal">Open Modal</b-button>
    <b-button id="toggle-btn" @click="toggleModal">Toggle Modal</b-button>

    <b-modal ref="my-modal" hide-footer title="Using Component Methods" @hidden="onModalHidden">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'NewRecipeModal',
  methods: {
    showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal() {
      this.$refs['my-modal'].hide();
    },
    toggleModal() {
      this.$refs['my-modal'].toggle('#toggle-btn');
    },
    onModalHidden() {
      console.log('Modal hidden');
    }
  },
  mounted() {
    this.hideModal(); // Ensure the modal is hidden when the component is mounted
  }
};
</script>
