<template>
  <div class="container">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";

export default {
  name: "LoginPage",
  components: {
    LoginForm
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
}
</style>
