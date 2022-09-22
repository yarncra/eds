<template>
  <div v-if="valutes" class="w-3/4 h-[100vh] pt-[100px] mx-auto">
    <div
      class="converter flex w-full justify-between items-center bg-[#a3cfd83f] rounded-md p-10"
    >
      <div class="w-3/4 text-start">
        <input
          v-model="valute"
          type="text"
          class="search text-center px-3 py-1 bg-[#a3cfd83f] rounded-md text-white placeholder:text-white"
          placeholder="0"
          @change="changeValute"
        />
      </div>
      <div class="w-1/4 flex items-center gap-2">
        <eds-select
          class="font-medium text-base text-white"
          :options="optionsSelectValute"
          :selectedOption="selectedOptionValute"
          @selectOption="optionSelectValute"
        />
        <i
          class="material-icons cursor-pointer w-[26px] text-center border-[1px] border-white rounded-[50%]"
          @click="swapCalcValute(optionsSelectValute)"
          >swap_horiz</i
        >
      </div>

      <div class="w-3/4 text-end">
        <input
          disabled="disabled"
          :value="`${Number(calcValute)} ₽`"
          type="text"
          class="search text-center px-3 py-1 bg-[#a3cfd83f] rounded-md text-white placeholder:text-white"
          placeholder="Поиск"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import edsSelect from '../components/select/edsSelect.vue';
import { useStore } from 'vuex';

export default {
  components: { edsSelect },
  setup() {
    const { getters, commit, dispatch } = useStore();

    onMounted(() => {
      dispatch('getCurrencyRate').then(() => {
        selectedOptionValute.value = initValute.value;
      });
    });

    onBeforeUnmount(() => {
      valute.value = '0';
      commit('resetSelect');
    });

    const valutes = computed(() => getters.valutes);
    const calcValute = computed(() => getters.calcValute);
    const currentValue = computed(() => getters.currentValue);
    const initValute = computed(() => getters.initValute);

    const optionsSelectValute = reactive(valutes);
    const selectedOptionValute = ref('');
    const valute = ref('');

    watch(valute, () => {
      commit('setValuteLeftSelect', {
        number: valute.value,
        option: selectedOptionValute.value,
      });
    });

    const changeValute = () => {
      commit('setCurrentValue', valute.value);
    };

    const optionSelectValute = (option) => {
      selectedOptionValute.value = option;
      commit('setValuteLeftSelect', {
        number: valute.value,
        option: selectedOptionValute.value,
      });
    };

    const swapCalcValute = () => {
      commit('swapCalcValute', selectedOptionValute.value);
      valute.value = currentValue.value;
      calcValute.value = calcValute.value;
    };

    return {
      optionSelectValute,
      selectedOptionValute,
      optionsSelectValute,
      calcValute,
      valutes,
      valute,
      swapCalcValute,
      changeValute,
    };
  },
};
</script>

<style lang="scss">
.converter {
  -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
  -moz-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
  box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
}
</style>
