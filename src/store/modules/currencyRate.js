import dateFormat from 'dateformat';
import api from '../../api/currencyRate';

export default {
  state: {
    currencyRate: {},
    valutes: [],
    optionSelectValute: {},
    calcValute: null,
    currentValue: null,
    filteredValutes: [],
    isLoading: false,
    initValute: {},
  },

  mutations: {
    currencyRateStart(state) {
      state.isLoading = true;
    },
    currencyRateSuccess(state, payload) {
      state.valutes = [];
      state.isLoading = false;
      state.currencyRate = {
        ...payload,
        Timestamp: dateFormat(new Date(payload.Timestamp), 'dd.mm.yyyy hh:mm'),
      };

      Object.values(state.currencyRate.Valute).map((el) => {
        state.valutes.push({
          ...el,
          swap: false,
        });
      });

      state.initValute = state.valutes[0];
    },
    currencyRateFailure(state) {
      state.isLoading = false;
    },

    swapValutes(state, id) {
      state.valutes.map((el) => {
        if (el.ID === id) {
          el.Value = 1 / el.Value;
          el.swap = !el.swap;
          return el;
        } else {
          return el;
        }
      });
    },

    filterByNameOrCharCode(state, nameOrCharCode) {
      state.filteredValutes = [];

      state.filteredValutes = state.valutes;

      state.filteredValutes = state.filteredValutes.filter((el) => {
        if (
          el.Name.toLowerCase().indexOf(nameOrCharCode.toLowerCase()) !== -1 ||
          el.CharCode.toLowerCase().indexOf(nameOrCharCode.toLowerCase()) !== -1
        ) {
          return el;
        }
      });
    },

    clearFilter(state) {
      state.filteredValutes = [];
    },

    setValuteLeftSelect(state, { number, option }) {
      state.currentValue = number;
      state.calcValute = (
        state.valutes.filter((el) => el.ID === option.ID)[0].Value *
        Number(number)
      ).toFixed(3);
    },

    swapCalcValute(state, valute) {
      state.calcValute = !valute.swap
        ? state.calcValute / Number(valute.Value)
        : state.calcValute * Number(valute.Value);

      state.currentValue = !valute.swap
        ? state.currentValue / Number(valute.Value)
        : state.currentValue * Number(valute.Value);

      valute.swap = !valute.swap;
    },
    setCurrentValue(state, value) {
      state.currentValue = value;
    },
    resetSelect(state) {
      state.calcValute = '';
    },
  },

  actions: {
    getCurrencyRate({ commit }) {
      return new Promise((resolve) => {
        commit('currencyRateStart');
        api
          .getCurrencyRate()
          .then((response) => {
            commit('currencyRateSuccess', response.data);
            resolve(() => console.log('data arriwed'));
          })
          .catch((result) => {
            console.log(
              'errors from getCurrencyRate action',
              result.response.errors
            );
          });
      });
    },
  },

  getters: {
    currencyRate(state) {
      return state.currencyRate;
    },
    valutes(state) {
      if (state.filteredValutes.length) return state.filteredValutes;
      return state.valutes;
    },

    calcValute(state) {
      return state.calcValute;
    },

    currentValue(state) {
      return state.currentValue;
    },
    initValute(state) {
      return state.initValute;
    },
  },
};
