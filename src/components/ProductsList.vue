<template>
  <div
    v-if="loader"
    class="row justify-center q-gutter-y-md q-gutter-x-sm q-mb-lg"
  >
    <CardSkeleton v-for="i in 10" :key="i" class="product-card" />
  </div>

  <div v-else class="row justify-center q-gutter-y-md q-gutter-x-sm q-mb-lg">
    <div
      v-for="product in products"
      :key="product"
      :class="{ 'product-card': viewType == 'grid' }"
    >
      <ProductCard v-if="viewType == 'grid'" :product="product" />
      <TileProduct v-else :product="product" />
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "@vue/reactivity";
import CardSkeleton from "src/components/CardSkeleton";
import ProductCard from "src/components/ProductCard.vue";
import TileProduct from "./TileProduct.vue";
const props = defineProps({
  products: Array,
  loader: {
    type: Boolean,
    default: false,
  },
  viewType: {
    type: String,
    default: "grid",
  },
});
const { products, loader, viewType } = toRefs(props);
</script>
