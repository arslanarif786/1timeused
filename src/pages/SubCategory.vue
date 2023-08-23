<template>
  <div class="container">
    <div class="row q-my-lg q-gutter-md justify-center">
      <div
        class="col-5 col-md-2"
        v-for="(subCategory, index) in store.subCategories"
        :key="index"
      >
        <q-card
          class="my-card cursor-pointer"
          @click="subCategoryProduct(subCategory.id)"
        >
          <div class="img-holder">
            <img :src="imageBaseURL + subCategory.thumbnail" alt="product" />
          </div>

          <q-card-section style="padding: 0px">
            <q-btn
              color="primary"
              :label="subCategory.title"
              class="w-100"
              size="sm"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useCategoryStore } from "../stores/categories.store";
import { useProductStore } from "../stores/products.store";
import useMetaTags from "src/composables/useMetaTags";

const productStore = useProductStore();
const store = useCategoryStore();
const router = useRouter();
const route = useRoute();
const imageBaseURL = process.env.imagesBaseURL;
const selectedCategory =
  store.categories.find((cat) => cat.slug == route.params.slug) || {};

useMetaTags({
  title: selectedCategory.title || route.params.slug,
  description: selectedCategory.title || route.params.slug,
  image: selectedCategory.thumbnail || "",
});
onMounted(() => {
  store.loadCategories();
  store.loadSubCategory(route.params.slug);
});
const subCategoryProduct = (id) => {
  router.push(`/subcategory-product/${id}`);
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}

.img-holder {
  height: 250px;
  width: 100%;
}

.img-holder img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
