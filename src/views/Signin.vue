<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <section class="section">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <div
              v-if="alert && alert.message  && createFlashMessage(alert.message)"
            >
              <flash-message></flash-message>
            </div>
            <h1 class="title">Sign in</h1>
            <a href="/signup">or create an account</a>
            <div class="field">
              <label class="label">Username (or email)</label>
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
              >Username is required</p>
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
              >Password is required</p>
              <p class="help is-success" v-else></p>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link" :disabled="$v.$invalid">
                  <span class="label">Sign in</span>
                </button>
              </div>
              <div class="control">
                <button class="button is-light">
                  <span class="fab fa-google"></span>
                  <span class="label">Sign in with Google</span>
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
import { mapState, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { setTimeout } from "timers";

export default {
  title: "Sign in",
  name: "signin",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        username: null,
        password: null
      },
      keyEvtTriggered: false,
      submitted: false,
      sending: false,
      flashMessagePresent: false
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
  computed: {
    ...mapState("account", ["status"]),
    ...mapState({ alert: state => state.alert })
  },
  created() {
    this.flashMessagePresent = false;
    this.logout();
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    ...mapActions({
      clearAlert: "alert/clear"
    }),
    clearFlashMessages() {
      this.clearAlert();
       this.flashMessagePresent = false;
    },
    createFlashMessage(message) {
      if (!this.flashMessagePresent) {
          this.flashError(message, { messageOptions: {timeout: 2000}});
          this.flashMessagePresent = true;
          setTimeout(() => this.clearFlashMessages(), 2000);
      }
     
      return true;
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      let isDanger = !field.required && (field.$invalid || field.$dirty);
      return isDanger && this.keyEvtTriggered
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
        const { username, password } = this.form;
        if (username && password) {
          this.login({ username, password });
        }
      }
      this.sending = false;
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  padding-bottom: 10px;
  margin-top: 10px;
  width: 100%;
  span.label {
    padding-left: 12px;
  }
}
.title {
  text-align: center;
}
</style>
