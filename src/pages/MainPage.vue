<template>
  <div class="container">
    <!-- <h1 class="title">Main Page</h1> -->
    <div class="row">
      <!-- Left side for random recipes -->
      <div class="col-md-6">
        <RecipePreviewList title="Explore this recipes" class="RandomRecipes center" />
      </div>
      <!-- Right side for login or last viewed recipes -->
      <div class="col-md-6">
        <div v-if="$root.store.username">
          <RecipePreviewList
            title="Last Viewed Recipes"
            :class="{
              RandomRecipes: true,
              blur: !$root.store.username,
              center: true
            }"
            :disabled="!$root.store.username"
          />
        </div>
        <div v-else>
          <div class="container">
            <h1 class="title">Login</h1>
            <b-form @submit.prevent="onLogin">
              <b-form-group
                id="input-group-Username"
                label-cols-sm="3"
                label="Username:"
                label-for="Username"
              >
                <b-form-input
                  id="Username"
                  v-model="$v.form.username.$model"
                  type="text"
                  :state="validateState('username')"
                ></b-form-input>
                <b-form-invalid-feedback>
                  Username is required
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-Password"
                label-cols-sm="3"
                label="Password:"
                label-for="Password"
              >
                <b-form-input
                  id="Password"
                  type="password"
                  v-model="$v.form.password.$model"
                  :state="validateState('password')"
                ></b-form-input>
                <b-form-invalid-feedback>
                  Password is required
                </b-form-invalid-feedback>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                style="width:100px;display:block;"
                class="mx-auto w-100"
                >Login</b-button
              >
              <div class="mt-2">
                Do not have an account yet?
                <router-link to="register"> Register here</router-link>
              </div>
            </b-form>
            <b-alert
              class="mt-2"
              v-if="form.submitError"
              variant="warning"
              dismissible
              show
            >
              Login failed: {{ form.submitError }}
            </b-alert>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { required } from "vuelidate/lib/validators";
import { mockLogin } from "../services/auth.js";

export default {
  name: "MainPage",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const success = true; // Modify this to test the error handling
        const response = mockLogin(this.form.username, this.form.password, success);

        // Login the user
        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
