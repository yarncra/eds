import { createStore } from 'vuex';
import currencyRate from './modules/currencyRate';

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    currencyRate,
  },
});
export default store;
