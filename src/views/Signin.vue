<template>
  <div>
      <h1 class="title"> Sign In </h1>
      <a  href="/signup"> or create an account </a>
    <form @submit.prevent="handleSubmit">
    
       <div class="field">
              <label class="label">Username</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input is-rounded"
                  :class="getValidationClass('username')"
                  type="text"
                  name="username"
                  id="username"
                  value="form.username"
                  v-model="form.username"
                  :disabled="sending"
                  v-on:keyup="keyEvtTriggered = true"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <p
                class="help is-danger"
                v-if="!$v.form.username.required && keyEvtTriggered"
              >
                Username is required
              </p>
              <p class="help is-success" v-else></p>
      </div>

       <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input is-rounded"
                  :class="getValidationClass('password')"
                  type="password"
                  name="password"
                  id="password"
                  value="form.password"
                  v-model="form.password"
                  :disabled="sending"
                  v-on:keyup="keyEvtTriggered = true"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-key"></i>
                </span>
              </div>
              <p
                class="help is-danger"
                v-if="!$v.form.password.required && keyEvtTriggered"
              >
                Password is required
              </p>
              <p class="help is-success" v-else></p>
      </div>
       <div class="field is-grouped-centered">
            <p>
              <a class="btn-control">
                  <button class="button is-link" :disabled="$v.$invalid">
                  Signin
                </button>
                </a>
            </p>
              <p class="btn-control">
                 <a>
                 <button class="button is-light">
                  Sign in with Google
                </button>
                </a>
              </p>
               
            </div>

    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "signin",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
      keyEvtTriggered: false,
      submitted: false,
      sending: false,
    };
  },
  validations: {
     form: {
        username: {
          required,
        },
        password: {
          required,
        },
      }
  },
  computed: {
    ...mapState("account", ["status"])
  },
  created() {
    this.logout();
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
     getValidationClass(fieldName) {
        const field = this.$v.form[fieldName];
        let isDanger = !field.required && (field.$invalid || field.$dirty);
        return  isDanger && this.keyEvtTriggered
        ? { "is-danger": true }
        : this.keyEvtTriggered
        ? { "is-success": true }
        : {};
     },
    handleSubmit() {
      this.sending = true;
       this.$v.$touch();
      if (!this.$v.$isvalid) {
          this.submitted = true;
          const { username, password } = this;
          if (username && password) {
            this.login({ username, password });
          }
      }
      this.sending = false;
     
    }
  }
}
</script>

<style lang="scss" scoped>
  .title{
    padding-left: 15%;
  }
  .input {
    width: 40%;
  }
  .button {
    width: 40%;
  }
  .btn-control {
    padding-top: 10px;
  }
 
</style>
