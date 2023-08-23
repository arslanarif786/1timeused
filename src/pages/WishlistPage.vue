<template>
  <div
    class="container q-py-lg"
    :class="{ 'relative-position': $q.screen.gt.sm }"
  >
    <div class="text-center desktop-only">
      <q-icon name="favorite_border" color="grey-7" size="4rem" />
      <div class="text-h3 q-my-md text-grey-9">My Wishlist</div>
    </div>

    <ProductsList :products="store.wishlistProducts" view-type="tile" />

    <div
      class="m-5 text-center absolute-center w-100"
      v-if="!store.wishlistProducts.length"
    >
      <div class="m-5 text-subtitle1">No Prodcuts Added in Wishlist</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import ProductCard from "src/components/ProductCard.vue";
import { useWishlistStore } from "../stores/wishlist.store";
import ProductsList from "src/components/ProductsList.vue";
import useMetaTags from "src/composables/useMetaTags";

useMetaTags({
  title: "Favorite Products",
});
const store = useWishlistStore();
onMounted(() => {
  store.loadwishlistProducts();
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
>
