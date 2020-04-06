import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AuthGuard from "./authGuard";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: "/join",
      name: "join",
      component: function() {
        return import("./views/user/Join.vue");
      },
      meta: { requiresNotAuth: true }
    },
    {
      path: "/sign-in",
      name: "sign in",
      component: function() {
        return import("./views/user/SignIn.vue");
      },
      meta: { requiresNotAuth: true }
    },
    {
      path: "/reset-password",
      name: "reset password",
      component: function() {
        return import("./views/user/ResetPassword.vue");
      },
      meta: { requiresNotAuth: true }
    },
    {
      path: "/roster",
      name: "roster",
      component: function() {
        return import("./views/roster/Roster.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/games",
      name: "games",
      component: function() {
        return import("./views/games/Games.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/games/add",
      name: "add game",
      component: function() {
        return import("./views/games/AddGame.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/games/edit/:id",
      name: "edit game",
      component: function() {
        return import("./views/games/EditGame.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/settings",
      name: "settings",
      component: function() {
        return import("./views/user/Settings.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/settings/locations",
      name: "locations",
      component: function() {
        return import("./views/locations/Locations.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/settings/locations/add",
      name: "add location",
      component: function() {
        return import("./views/locations/AddLocation.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/settings/locations/edit/:id",
      name: "edit location",
      component: function() {
        return import("./views/locations/EditLocation.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/settings/opponents",
      name: "opponents",
      component: function() {
        return import("./views/opponents/Opponents.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/settings/opponents/add",
      name: "add opponent",
      component: function() {
        return import("./views/opponents/AddOpponent.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/settings/opponents/edit/:id",
      name: "edit opponent",
      component: function() {
        return import("./views/opponents/EditOpponent.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/settings/profile/edit/",
      name: "edit profile",
      component: function() {
        return import("./views/user/EditProfile.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/settings/change-username",
      name: "change username",
      component: function() {
        return import("./views/user/ChangeUserName.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/settings/change-email",
      name: "change email",
      component: function() {
        return import("./views/user/ChangeEmail.vue");
      },
      meta: { requiresAuth: true }
    },
    {
      path: "/settings/change-password",
      name: "change password",
      component: function() {
        return import("./views/user/ChangePassword.vue");
      },
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach(AuthGuard);

export default router;
