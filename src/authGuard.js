import { store } from "./store";

export default (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.user) {
      next({
        path: "/sign-in"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresNotAuth)) {
    if (store.getters.user) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
