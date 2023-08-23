<template>
  <q-page>
    <CarouselSection />
    <div class="container">
      <RecentProducts v-if="productStore.recentProducts.length" />
      <FeaturedProductsSection v-if="productStore.featuredProducts.length" />
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, onMounted } from "vue";
import CarouselSection from "components/Home/CarouselSection.vue";
import FeaturedProductsSection from "src/components/Home/FeaturedProductsSection.vue";
//import ProductCardSkeleton from "src/components/ProductCardSkeleton.vue";
import RecentProducts from "src/components/Home/Mobile/RecentProducts.vue";
import { useAuthStore } from "../stores/auth.store";
import { useProductStore } from "../stores/products.store";
import { useRoute } from "vue-router";
import useMetaTags from "src/composables/useMetaTags";

useMetaTags({
  title: "Home",
});
const productStore = useProductStore();
const authStore = useAuthStore();
const route = useRoute();

onMounted(() => {
  productStore.loadRecentProducts();
  productStore.loadFeaturedProducts();
  if (route.query.code) {
    authStore.loginWithFacebook(
      location.href.split("?").pop().replace("code=", "")
    );
  }
});
</script>
