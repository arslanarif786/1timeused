<template>
  <SliderMain :product="product" />
  <div class="container q-mb-lg" v-if="product">
    <div class="row">
      <ProductDetailCard :product="product" />
      <div class="col-12 col-md-6 q-pa-sm desktop-only">
        <q-card
          class="top-card q-px-md q-mb-md related-product-card"
          flat
          bordered
        >
          <div class="text-h6 q-my-md">Related Products</div>

          <div class="row">
            <div
              class="
                flex
                q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg
                justify-center
                items-center
              "
            >
              <ProductsList
                :products="product.related_products"
                :loader="productStore.loadingStatus"
              />
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Screen } from "quasar";
import { useMeta } from "quasar";
export default {
  async preFetch({ store, currentRoute }) {
    let screen = "application";
    if (!process.env.SERVER) {
      if (Screen.gt.sm) {
        screen = "desktop";
      }
    }
    const productStore = useProductStore(store);
    if (
      !productStore.loadedProduct ||
      (productStore.loadedProduct.slug != currentRoute.params.slug &&
        productStore.loadedProduct.id != currentRoute.params.slug)
    ) {
      const response = await productStore.loadProductDetails(
        currentRoute.params.slug,
        screen
      );
    }
  },
};
</script>

<script setup>
import { computed } from "vue";
import ProductCard from "src/components/ProductCard.vue";
import { useProductStore } from "src/stores/products.store";
import { useWishlistStore } from "src/stores/wishlist.store";
import ProductDetailCard from "../components/productDetail/ProductDetailCard.vue";
import SliderMain from "../components/productDetail/SliderMain.vue";
import useMetaTags from "src/composables/useMetaTags";
import ProductsList from "src/components/ProductsList.vue";
const { toRefs } = require("@vue/reactivity");
const wishlistStore = useWishlistStore();
const imageBaseURL = process.env.imagesBaseURL;
const productStore = useProductStore();
const product = computed(() => productStore.loadedProduct);
const addToWishlist = (product) => {
  wishlistStore.addWishlist(product);
};

useMetaTags({
  title: product.value.title,
  description: product.value.description,
  image: product.value.gallery[0].path,
});
</script>

<style scoped>
.top-card {
  margin-top: 20px;
}
</style>

<style lang="scss">
.q-card.related-product-card {
  @media screen and (max-width: $breakpoint-sm-max) {
    text-align: center;
    padding: 0;
  }
}
</style>
