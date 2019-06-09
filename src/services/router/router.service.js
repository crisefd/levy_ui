import Vue from "vue";
import Router from "vue-router";
import { Signup, Signin, Home } from "../../views";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/singin", component: Signin },
    { path: "/signup", component: Signup },

    // otherwise redirect to home
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/signin", "/signup"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/signin");
  }

  next();
});
