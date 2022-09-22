<template>
  <div
    class="w-[100vw] min-h-[100vh] bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600"
  >
    <div class="pt-16">
      <div class="container">
        <div v-if="valutes" class="w-3/4 pb-10 mx-auto">
          <input
            v-model="nameOrCharCode"
            type="text"
            class="search w-1/2 px-3 py-1 bg-[#a3cfd83f] rounded-md text-white placeholder:text-white"
            placeholder="Поиск"
          />
          <div
            class="currency-rate-list mt-5 rounded-md w-full mx-auto bg-[#a3cfd83f]"
          >
            <ul class="mt-2 p-2 flex text-center border-b-2 border-indigo-300">
              <li class="w-3/4">Валюта</li>
              <li class="w-1/4">Время</li>
              <li class="w-1/4"></li>
              <li class="w-1/4">Курс</li>
              <li class="w-1/4">Изменения</li>
            </ul>
            <ul class="list mt-2" v-for="item in valutes" :key="item.ID">
              <li
                class="w-full max-w-full flex justify-between items-center text-center"
              >
                <div class="w-3/4 text-sm">
                  {{ item.swap ? 'Российский рубль' : item.Name }}
                </div>
                <div class="w-1/4 text-sm">
                  {{ currencyRate.Timestamp }}
                </div>
                <div class="w-1/4 text-sm text-center">
                  <i
                    class="material-icons cursor-pointer align-middle w-[26px] border-[1px] border-white rounded-[50%]"
                    @click="swapValutes(item.ID)"
                    >swap_horiz</i
                  >
                </div>

                <div class="w-1/4 text-sm">
                  <span>
                    {{ item.Value.toFixed(3) }}
                  </span>
                  <span class=""
                    >&nbsp;{{ item.swap ? item.CharCode : '₽' }}</span
                  >
                </div>

                <div class="w-1/4 text-sm flex items-center justify-center">
                  <div
                    :class="{
                      'text-rose-300': !currencyRateUpOrDown(
                        item.Value,
                        item.Previous
                      ),
                      'text-green-300': currencyRateUpOrDown(
                        item.Value,
                        item.Previous
                      ),
                    }"
                  >
                    {{ currencyRateDelta(item.Value, item.Previous) }}
                  </div>
                  <div
                    class="material-icons"
                    :class="{
                      'text-rose-300': !currencyRateUpOrDown(
                        item.Value,
                        item.Previous
                      ),
                      'text-green-300': currencyRateUpOrDown(
                        item.Value,
                        item.Previous
                      ),
                    }"
                  >
                    {{
                      currencyRateUpOrDown(item.Value, item.Previous)
                        ? 'arrow_drop_up'
                        : 'arrow_drop_down'
                    }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {},
  setup() {
    const { dispatch, getters, commit } = useStore();

    onMounted(() => {
      dispatch('getCurrencyRate');
    });

    onBeforeUnmount(() => {
      commit('clearFilter');
    });

    const currencyRate = computed(() => getters.currencyRate);
    const valutes = computed(() => getters.valutes);

    const nameOrCharCode = ref('');

    watch(nameOrCharCode, () => {
      commit('filterByNameOrCharCode', nameOrCharCode.value);
    });

    const swapValutes = (id) => commit('swapValutes', id);
    const currencyRateUpOrDown = (value, previous) =>
      value > previous ? true : false;
    const currencyRateDelta = (value, previous) => {
      return Math.abs(value - previous).toFixed(3);
    };

    return {
      currencyRate,
      valutes,
      currencyRateUpOrDown,
      currencyRateDelta,
      swapValutes,
      nameOrCharCode,
    };
  },
};
</script>

<style lang="scss">
.search,
.currency-rate-list {
  -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
  -moz-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
  box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
}
</style>
