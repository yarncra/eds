<template>
  <div
    v-if="options"
    class="select relative bg-a-white"
    :class="{ select_active: isVisible }"
  >
    <div
      class="min-w-[80px] h-6 px-6 py-2 flex items-center font-normal text-sm border-[1px] border-white rounded-[4px] text-white cursor-pointer"
      @click="filterOptions(selectedOption)"
    >
      <i class="material-icons absolute top-0 right-0">{{
        isVisible ? 'arrow_drop_up' : 'arrow_drop_down'
      }}</i>

      {{ selectedOption.CharCode }}
    </div>
    <div
      ref="select"
      class="select__items min-w-[400px] h-[50vh] overflow-scroll h absolute z-[998] top-[70px] left-0 bg-[#a3cfd83f] mt-5 font-normal text-sm rounded-md"
      v-show="isVisible"
    >
      <div
        class=""
        v-for="option in filteredOptions"
        :key="option.ID"
        @click="selectOption(option)"
      >
        <div class="px-3 py-2 border-b-[1px] border-b-white cursor-pointer">
          <span class="px-2">
            {{ option.Name }}
          </span>
          <span class="">
            {{ option.CharCode }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from 'vue';

export default {
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    selectedOption: {
      type: Object,
      default() {
        return '';
      },
    },
  },

  setup(props, ctx) {
    const isVisible = ref(false);
    const filteredOptions = ref([]);

    const selectOption = (option) => ctx.emit('selectOption', option);
    const filterOptions = (selectedOption) => {
      isVisible.value = !isVisible.value;
      filteredOptions.value = props.options.filter(
        (el) => el.Name !== selectedOption.Name
      );
    };

    const hideSelect = () => (isVisible.value = false);

    onMounted(() => {
      document.addEventListener('click', () => hideSelect(), true);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', hideSelect);
    });

    return {
      isVisible,
      filteredOptions,
      selectOption,
      filterOptions,
      hideSelect,
    };
  },
};
</script>

<style lang="scss">
.select__items {
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
}
</style>
