import Vue from "vue";
import Router from "vue-router";
import Signup from "../../views/Signup.vue";
import Signin from "../../views/Signin.vue";
import Home from "../../views/Home.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/signin", component: Signin },
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
