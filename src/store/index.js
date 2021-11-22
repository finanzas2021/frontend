import { createStore } from "vuex";
import auth from "./modules/auth";
import portfolio from "./modules/portfolio";
import history from "./modules/history";

export default createStore({
  modules: {
    auth,
    portfolio,
    history,
  },
});
