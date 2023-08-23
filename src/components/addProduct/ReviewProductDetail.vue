<template>
  <div class="row">
    <!-- Single Item -->
    <div class="col-12 col-md-12">
      <div class="label-font">Title:</div>
      <div class="info-text text-grey q-pb-md">
        {{ product.title }}
      </div>
    </div>
    <!-- Single Item -->
    <div class="col-12 col-md-12">
      <div class="label-font">Description:</div>
      <div class="info-text text-grey q-pb-md">
        {{ product.description }}
      </div>
    </div>
  </div>
  <div class="row">
    <!-- Single Item -->
    <div class="col-4 col-md-4">
      <div class="label-font">Price:</div>
      <div class="info-text text-grey q-pb-md">
        {{ product.price }}
      </div>
    </div>
    <!--  Single Item s -->
    <div class="col-4 col-md-4">
      <div class="label-font">Cataegory</div>
      <div class="info-text text-grey q-pb-md">
        {{ selectedCategoryTitle }}
      </div>
    </div>
    <!--  Single Item s -->
    <div class="col-4 col-md-4">
      <div class="label-font">SubCataegory</div>
      <div class="info-text text-grey q-pb-md">
        {{ selectedSubcategoryTitle }}
      </div>
    </div>
  </div>
  <div class="row">
    <!-- Single Item -->
    <div class="col-4 col-md-4">
      <div class="label-font">Purpose:</div>
      <div class="info-text text-grey q-pb-md">
        {{ product.purpose }}
      </div>
    </div>
    <!--  Single Item s -->
    <div class="col-4 col-md-4">
      <div class="label-font">Condition</div>
      <div class="info-text text-grey q-pb-md">
        {{ product.condition }}
      </div>
    </div>
    <!--  Single Item s -->
    <div class="col-4 col-md-4">
      <div class="label-font">Color</div>
      <div class="info-text text-grey q-pb-md">
        {{ product.color }}
      </div>
    </div>
  </div>
  <div class="row">
    <!-- Single Item -->
    <div class="col-4 col-md-4">
      <div class="label-font">Size:</div>
      <div class="info-text text-grey q-pb-md">
        {{ product.size }}
      </div>
    </div>
    <!--  Single Item s -->
    <div class="col-4 col-md-4">
      <div class="label-font">Total Items</div>
      <div class="info-text text-grey q-pb-md">
        {{ product.current_stock }}
      </div>
    </div>
    <!--  Single Item s -->
    <div class="col-4 col-md-4">
      <div class="label-font">Brand Name</div>
      <div class="info-text text-grey q-pb-md">
        {{ product.brand }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { useCategoryStore } from "src/stores/categories.store";
import { toRefs } from "vue";
const imageBaseURL = process.env.imagesBaseURL;
const props = defineProps({
  product: Object,
});
const { product } = toRefs(props);

const categoryStore = useCategoryStore();

const selectedCategoryTitle = computed(() =>
  categoryStore.categories.length && product.value.category_id
    ? categoryStore.categories.find(
        (cat) => cat.id == product.value.category_id
      ).title
    : ""
);

const selectedSubcategoryTitle = computed(() => {
  return categoryStore.subCategories.length && product.value.sub_category_id
    ? categoryStore.subCategories.find(
        (cat) => cat.id == product.value.sub_category_id
      ).title
    : "";
});
</script>
