<template>
  <q-scroll-area :visible="false" style="height: 110px; max-width: 100%">
    <div class="row no-wrap q-my-lg q-px-md flex justify-center">
      <div v-for="(category, index) in categories" :key="index">
        <div
          class="text-center"
          :class="{ 'q-mr-lg': index != categories.length - 1 }"
        >
          <q-btn
            size="15px"
            outline
            round
            color="primary"
            @click="subcategoryPage(category.slug)"
          >
            <q-avatar size="30px">
              <img :src="`${imageBaseURL}${category.thumbnail}`" />
            </q-avatar>
          </q-btn>
          <span class="text-caption ellipsis q-mt-sm">
            {{ category.title.substring(0, 10) }}
          </span>
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { computed, onMounted } from "@vue/runtime-core";
import { useCategoryStore } from "src/stores/categories.store.js";
import { useRouter } from "vue-router";
const store = useCategoryStore();
const router = useRouter();

const imageBaseURL = process.env.imagesBaseURL;
onMounted(() => {
  store.loadCategories();
});
const subcategoryPage = (slug) => {
  router.push({ path: `/category/${slug}` });
};
const categories = computed(() => store.categories);
</script>

<style scoped>
.q-scrollarea:-webkit-scrollbar {
  display: none;
}
</style>
