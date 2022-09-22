<template>
  <div
    class="w-[100vw] min-h-[100vh] bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600"
  >
    <eds-header />
    <router-view></router-view>
  </div>
</template>

<script>
import EdsHeader from './components/header/edsHeader.vue';

export default {
  setup() {
    return {};
  },
  components: { EdsHeader },
};
</script>

<style lang="scss"></style>
