<template>
  <div>
    <form @submit.prevent="validateUser">
      <section class="section">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  :class="getValidationClass('email')"
                  v-on:keyup="keyEvtTriggered = true"
                  type="email"
                  name="email"
                  id="email"
                  value="hello@"
                  v-model="form.email"
                  :disabled="sending"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fa fa-check"></i>
                </span>
              </div>
              <p
                class="help is-danger"
                v-if="
                  (!$v.form.email.required || !$v.form.email.email) &&
                    keyEvtTriggered
                "
              >
                This email is invalid
              </p>
              <p class="help is-danger" v-else-if="!keyEvtTriggered"></p>
              <p class="help is-success" v-else>This email is valid</p>
            </div>

            <div class="field">
              <label class="label">Username</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  :class="getValidationClass('username')"
                  v-on:keyup="keyEvtTriggered = true"
                  type="text"
                  name="username"
                  id="username"
                  value="form.email"
                  v-model="form.username"
                  :disabled="sending"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fa fa-check"></i>
                </span>
              </div>
              <p
                class="help is-danger"
                v-if="!$v.form.username.required && keyEvtTriggered"
              >
                Username is required
              </p>
              <p
                class="help is-danger"
                v-else-if="!$v.form.username.minLength && keyEvtTriggered"
              >
                Username must be at least 3 chars lenght
              </p>
              <p class="help is-danger" v-else-if="!keyEvtTriggered"></p>
              <p class="help is-success" v-else>This username is valid</p>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  :class="getValidationClass('password')"
                  v-on:keyup="keyEvtTriggered = true"
                  type="password"
                  name="password"
                  id="password"
                  value="form.password"
                  v-model="form.password"
                  :disabled="sending"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-key"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fa fa-check"></i>
                </span>
              </div>
              <p
                class="help is-danger"
                v-if="!$v.form.password.required && keyEvtTriggered"
              >
                Password is required
              </p>
              <p
                class="help is-danger"
                v-else-if="!$v.form.password.minLength && keyEvtTriggered"
              >
                Password must be at least 10 chars lenght
              </p>
              <p class="help is-danger" v-else-if="!keyEvtTriggered"></p>
              <p class="help is-success" v-else>This password is valid</p>
            </div>

            <div class="field">
              <label class="label">Confirm password</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  :class="getValidationClass('cpassword')"
                  v-on:keyup="keyEvtTriggered = true"
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  value="form.cpassword"
                  v-model="form.cpassword"
                  :disabled="sending"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-key"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fa fa-check"></i>
                </span>
              </div>
              <p
                class="help is-danger"
                v-if="!$v.form.cpassword.required && keyEvtTriggered"
              >
                Confirm password is required
              </p>
              <p
                class="help is-danger"
                v-else-if="!$v.form.cpassword.sameAsPassword && keyEvtTriggered"
              >
                Passwords must match
              </p>
              <p class="help is-danger" v-else-if="!keyEvtTriggered"></p>
              <p class="help is-success" v-else>Password confirmed</p>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" :disabled="$v.$invalid">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import router from "../router";

import levyService from "@/services/levyService";

export default {
  name: "SignupForm",
  mixins: [validationMixin],
  data() {
    return {
      keyEvtTriggered: false,
      form: {
        email: null,
        username: null,
        password: null,
        cpassword: null
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      formFieldNames: ["email", "username", "password", "cpassword"]
    };
  },
  validations: {
    form: {
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
        sameAsPassword: sameAs("password")
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      let inDanger = field.$invalid || field.$dirty;
      switch (field) {
        case "username":
          inDanger =
            (this.$v.form.username.required ||
              this.$v.form.username.minLength) &&
            inDanger;
          break;
        case "email":
          inDanger =
            (this.$v.form.email.required || this.$v.form.email.email) &&
            inDanger;
          break;
        case "password":
          inDanger =
            (this.$v.form.password.required ||
              this.$v.form.password.minLength) &&
            inDanger;
          break;
        case "cpassword":
          inDanger =
            (this.$v.form.cpassword.required ||
              this.$v.form.cpassword.sameAsPassword) &&
            inDanger;
          break;
      }
      return inDanger && this.keyEvtTriggered
        ? { "is-danger": true }
        : this.keyEvtTriggered
        ? { "is-success": true }
        : {};
    },
    clearForm() {
      this.$v.$reset();
      this.keyEvtTriggered = false;
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
      this.$v.$touch();
      if (!this.$v.$isvalid) {
        this.saveUser();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
