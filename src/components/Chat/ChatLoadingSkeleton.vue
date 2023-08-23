<template>
  <div class="column">
    <div
      v-for="i in 7"
      :key="i"
      class="flex items-center"
      :style="i % 2 == 0 && 'align-self:end'"
    >
      <q-skeleton
        class="q-mr-sm mobile-view"
        v-show="i % 2 != 0"
        bordered
        type="circle"
      />
      <q-skeleton width="200px" height="80px" class="mobile-view" />
      <q-skeleton
        class="q-ml-sm mobile-view"
        v-show="i % 2 == 0"
        bordered
        type="circle"
      />
    </div>
  </div>
</template>
<style scoped>
@media (max-width: 767.98px) {
  .mobile-view {
    margin-bottom: 20px !important;
  }
}
</style>
