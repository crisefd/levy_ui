import Vue from "vue";
import Router from "vue-router";
import Signup from "../../views/Signup.vue";
import Signin from "../../views/Signin.vue";
import Default from "../../views/Default.vue";
import Dashboard from "../../views/Dashboard.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    { path: "/", component: Default },
    { path: "/signin", component: Signin },
    { path: "/signup", component: Signup },
    { path: "/dashboard", component: Dashboard },

    // otherwise redirect to default view
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
