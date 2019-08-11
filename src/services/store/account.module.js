import { levyService } from "../api";
import { router } from "../router";

const user = JSON.parse(localStorage.getItem("user"));

const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };
const getters = {};
const actions = {
  login({ dispatch, commit }, { username, password }) {
    commit("loginRequest", { username });

    levyService.signIn(username, password).subscribe(
      user => {
        commit("loginSuccess", user);
        console.log("logIn ", user);
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      },
      _ => {
        commit("loginFailure", "Invalid username or password");
        dispatch("alert/error", "Invalid username or password", { root: true });
      }
    );
  },
  logout({ commit }) {
    localStorage.removeItem("user");
    router.push("/");
    commit("logout");
  },
  register({ dispatch, commit }, user) {
    commit("registerRequest");
    levyService.signup(user).subscribe(
      response => {
        commit("registerSuccess", response);
        router.push("/signin");
        setTimeout(() => {
          // display success message after route change completes
          dispatch("alert/success", "Registration successful", { root: true });
        });
      },
      error => {
        console.error("Unexpected error: ", error);
        commit("registerFailure", error);
        dispatch("alert/error", error, { root: true });
      }
    );
  }
};
const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state) {
    state.status = { registering: true };
  },
  registerSuccess(state) {
    state.status = {};
  },
  registerFailure(state, error) {
    state.status = {};
    console.error(error);
  }
};

export const account = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
