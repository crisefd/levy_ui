import { router, levyService } from "..";

const user = JSON.parse(localStorage.getItem("user"));

const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };
const getters = {};
const actions = {
  login({ dispatch, commit }, { username, password }) {
    commit("loginRequest", { username });

    levyService.signin(username, password).subscribe(
      user => {
        commit("loginSuccess", user);
        router.push("/");
      },
      error => {
        commit("loginFailure", error);
        dispatch("alert/error", error, { root: true });
      }
    );
  },
  logout({ commit }) {
    this.levyService.logout();
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
  state,
  getters,
  actions,
  mutations
};
