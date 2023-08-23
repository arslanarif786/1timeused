<template>
  <div>
    <div
      @scroll="handleScroll"
      class="container flex justify-center items-center"
    >
      <div class="column q-mt-md">
        <h5 class="text-center q-pb-lg">Feature Products</h5>
        <ProductsList
          :products="store.featuredProducts"
          :loader="store.featuredProductsLoader"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "@vue/runtime-core";
import { useProductStore } from "src/stores/products.store.js";
import ProductsList from "../ProductsList.vue";
let lastApiCallTime = Date.now();

const store = useProductStore();

const handlePagination = () => {
  window.addEventListener("scroll", () => {
    if (Date.now() - lastApiCallTime < 1200) {
      return false;
    }
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      console.log("scrolled to bottom");
      console.log(store.hasMoreFeaturedPages);
      if (store.hasMoreFeaturedPages) {
        store.featuredCurrentPage++;
        store.loadFeaturedProducts();
        lastApiCallTime = Date.now();
      }
    }
  });
};

onMounted(() => {
  store.featuredCurrentPage = 1;
  store.loadFeaturedProducts();
  window.addEventListener("scroll", handlePagination);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handlePagination);
});
</script>

<style lang="scss" scoped>
h5 {
  margin: 0;
}
</style>
