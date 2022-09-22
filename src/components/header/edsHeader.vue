<template>
  <header
    class="header fixed top-0 left-0 z-10 w-full text-gray-500 bg-violet-300"
  >
    <div class="container">
      <ul class="flex items-center h-[40px] w-3/4 mx-auto">
        <li class="mr-3">
          <router-link :to="{ name: 'valutes' }" active-class="active"
            >Валюты</router-link
          >
        </li>
        <li class="">
          <router-link :to="{ name: 'converter' }" active-class="active"
            >Конвертер</router-link
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss">
.header {
  -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
  -moz-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
  box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
}
.active {
  color: #fff;
}
</style>
