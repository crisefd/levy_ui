<template>
  <div>
    <form novalidate class="md-layout jc-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100 overflow-x">
        <md-card-header>
          <div class="md-title">Sign up</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">Name</label>
                <md-input
                  name="name"
                  id="name"
                  autocomplete="given-name"
                  v-model="form.name"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.name.required"
                  >The name is required</span
                >
                <span class="md-error" v-else-if="!$v.form.name.minlength"
                  >Invalid name</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('surname')">
                <label for="surname">Surname</label>
                <md-input
                  name="surname"
                  id="surname"
                  autocomplete="family-name"
                  v-model="form.surname"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.surname.required"
                  >The surname is required</span
                >
                <span class="md-error" v-else-if="!$v.form.surname.minlength"
                  >Invalid surname</span
                >
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required"
              >The email is required</span
            >
            <span class="md-error" v-else-if="!$v.form.email.email"
              >Invalid email</span
            >
          </md-field>

          <md-field :class="getValidationClass('username')">
            <label for="username">Username</label>
            <md-input
              name="username"
              id="username"
              v-model="form.username"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.username.required"
              >The username is required</span
            >
            <span class="md-error" v-else-if="!$v.form.username.minlength"
              >Invalid username</span
            >
          </md-field>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input
                  name="password"
                  type="password"
                  id="password"
                  v-model="form.password"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.password.required"
                  >The password is required</span
                >
                <span class="md-error" v-else-if="!$v.form.password.minlength"
                  >Password should contain minimum 10 charecters</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="cpassword">Confirm Password</label>
                <md-input
                  name="cpassword"
                  type="password"
                  id="cpassword"
                  v-model="form.cpassword"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.cpassword.required"
                  >The confirm password is required</span
                >
                <span class="md-error" v-else-if="!$v.form.cpassword.minlength"
                  >Confirm Password should contain minimum 10 charecters</span
                >
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Submit</md-button
          >
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved"
        >The user {{ lastUser }} was saved with success!</md-snackbar
      >
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength
  // maxLength,
  // password
} from "vuelidate/lib/validators";
import router from "../router";

import levyService from "@/services/levyService";

export default {
  name: "SignupForm",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        name: null,
        surname: null,
        email: null,
        username: null,
        password: null,
        cpassword: null
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      formFieldNames: [
        "name",
        "surname",
        "email",
        "username",
        "password",
        "cpassword"
      ]
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      surname: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      username: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(10)
      },
      cpassword: {
        required,
        minLength: minLength(10)
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.formFieldNames.forEach(fieldName => {
        this.form[fieldName] = null;
      });
      window.setTimeout(() => {
        router.push({ name: "home" });
      }, 2000);
    },
    saveUser() {
      this.sending = true;
      const userData = {};
      this.formFieldNames.forEach(fieldName => {
        if (fieldName !== "cpassword") {
          userData[fieldName] = this.form[fieldName];
        }
      });
      levyService.signUp(userData).subscribe({
        next: response => {
          console.log("Success: ", response);
          window.setTimeout(() => {
            this.sending = false;
            this.clearForm();
            this.lastUser = userData.username;
            this.userSaved = true;
          }, 1500);
        },
        error: error => {
          console.error("Unexpected error: " + error);
        }
      });
    },

    validateUser() {
      this.formFieldNames.forEach(fname => {
          this.$v.form[fname].$touch();
      });
      if (!this.$v.$isvalid) {
        this.saveUser();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.jc-center {
  justify-content: center;
}
.overflow-x {
  overflow-x: hidden;
}
</style>
