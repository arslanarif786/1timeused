<template>
  <div class="container" :class="{ 'relative-position': $q.screen.gt.sm }">
    <div class="text-center absolute-center w-100">
      <h1 class="text-subtitle1 text-center">About One Time Used</h1>
    </div>
  </div>
</template>

<script setup>
import useMetaTags from "src/composables/useMetaTags";

useMetaTags({
  title: "About Us",
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 60vh;

  @media screen and (max-width: 768px) {
    min-height: 88vh;
  }
}
</style>
