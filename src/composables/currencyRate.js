import { useStore } from 'vuex';

export default function useCurrencyRate() {
  const currencyRate = ref([]);
  const { dispatch } = useStore();

  const getCurrencyRate = async () => {
    let response = await dispatch('getCurrencyRate');
    currencyRate.value = response;
  };

  return {
    currencyRate,
    getCurrencyRate,
  };
}
