<template>
  <div class="container" :class="{ 'relative-position': $q.screen.gt.sm }">
    <ProductsHeader
      :viewType="viewType"
      @toggleViewType="viewType = viewType == 'grid' ? 'tile' : 'grid'"
    />
    <ProductsList
      :products="store.subCategoryProduct"
      :viewType="viewType"
      :loader="store.loadingStatus"
      class="q-mt-sm"
    />
    <div
      v-if="!store.subCategoryProduct.length && !store.loadingStatus"
      class="text-center absolute-center w-100"
    >
      <div class="text-subtitle1">No Product Available</div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useProductStore } from "src/stores/products.store";
import ProductsHeader from "src/components/ProductsHeader.vue";
import ProductsList from "src/components/ProductsList.vue";
import useMetaTags from "src/composables/useMetaTags";
import { useCategoryStore } from "src/stores/categories.store";

let lastApiCallTime = Date.now();
const store = useProductStore();
const categoryStore = useCategoryStore();
const route = useRoute();
const viewType = ref("grid");

const selectedSubcategory = computed(
  () =>
    categoryStore.subCategories.find((cat) => cat.id == route.params.id) || {}
);

useMetaTags({
  title: selectedSubcategory.value.title || "Subcategory",
  description: selectedSubcategory.value.title || "Subcategory",
  image: selectedSubcategory.value.thumbnail || "",
});

const handlePagination = () => {
  if (Date.now() - lastApiCallTime < 1200) {
    return false;
  }
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    console.log("scrolled to bottom");
    console.log(store.hasMorePages);
    if (store.hasMorePages) {
      store.currentPage++;
      loadSubCategoryProduct(route.params.id, true);
      lastApiCallTime = Date.now();
    }
  }
};

onMounted(() => {
  store.loadSubCategoryProduct(route.params.id);
  window.addEventListener("scroll", handlePagination);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handlePagination);
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
