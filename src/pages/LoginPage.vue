<template>
  <div class="container">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";
import loginBackground from "@/assets/pictures/welcomeback_login.jpg"; // Adjust the path if necessary

export default {
  name: "LoginPage",
  components: {
    LoginForm
  },
  mounted() {
    document.body.style.backgroundImage = `url(${loginBackground})`;
    document.body.style.backgroundSize = "contain";
    document.body.style.backgroundPosition = "left";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.minHeight = "100vh";
  },
  beforeDestroy() {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundSize = "";
    document.body.style.backgroundPosition = "";
    document.body.style.backgroundRepeat = "";
    document.body.style.minHeight = "";
  }
};
</script>


<style scoped>
.container{
  margin-right: -12px; /* Add some space from the right edge */

}

.title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
