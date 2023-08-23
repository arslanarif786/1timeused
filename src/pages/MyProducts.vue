<template>
  <div v-if="store.loadingStatus" class="container">
    <div class="flex items-center justify-center">
      <q-spinner color="primary" size="5em" />
    </div>
  </div>
  <div
    v-else
    class="container"
    :class="{ 'relative-position': $q.screen.gt.sm }"
  >
    <div>
      <div
        v-if="store.myProducts.length"
        class="q-pa-md row items-start q-gutter-md justify-center"
      >
        <ProductCardTile
          v-for="product in store.myProducts"
          :key="product"
          :product="product"
        />
      </div>

      <div v-else class="text-center absolute-center w-100">
        This profile has not added any products
      </div>
    </div>
    <!-- Add Button -->
    <div class="add-button">
      <q-btn
        round
        color="primary"
        glossy
        icon="add"
        @click="$router.push('/add_product')"
      >
        <q-tooltip class="grey-10">Add Your Products</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<script setup>
import ProductCardTile from "../components/ProductCardTile.vue";
import { onMounted } from "vue";
import { useProductStore } from "../stores/products.store";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth.store";
import useMetaTags from "src/composables/useMetaTags";

useMetaTags({
  title: "My Products",
});
const router = useRouter();
const store = useProductStore();
const authStore = useAuthStore();
onMounted(() => {
  if (!authStore.authUser) {
    router.push(
      router.options.history.state.back == "/login" ||
        router.options.history.state.forward == "/login"
        ? router.options.history.state.back
        : "/login"
    );
  }
  store.loadMyProducts();
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 60vh;
  @media screen and (max-width: 768px) {
    min-height: 88vh;
  }
}

.add-button {
  position: absolute;
  position: fixed;
  right: 20px;
  bottom: 10%;
}
.q-responsive {
  position: unset;
  max-width: 100%;
  max-height: 100%;
}
</style>
