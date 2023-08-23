<template>
  <div class="border-bottom">
    <div class="row flex justify-between items-center">
      <div class="col text-center border-right">
        <q-icon
          name="format_list_bulleted"
          @click="$emit('toggleViewType', 'tile')"
          :size="$q.screen.lt.md ? 'sm' : `md`"
          :color="viewType != 'grid' ? 'primary' : 'black'"
          class="icons"
        />
      </div>
      <div class="col text-center border-right">
        <q-icon
          :color="viewType == 'grid' ? 'primary' : 'black'"
          @click="$emit('toggleViewType', 'grid')"
          name="grid_view"
          :size="$q.screen.lt.md ? 'sm' : `md`"
          class="icons"
        />
      </div>
      <div
        @click="sortModal = true"
        class="col text-center border-right cursor-pointer"
      >
        <q-icon
          name="filter_list"
          :size="$q.screen.lt.md ? 'sm' : `md`"
          class="icons"
        />
        <span>Sort By</span>
      </div>
      <div class="col text-center">
        <q-icon
          name="filter_alt"
          :size="$q.screen.lt.md ? 'sm' : `md`"
          class="icons"
          @click="showing = true"
        >
          <q-tooltip v-model="showing">Coming Soon</q-tooltip>
        </q-icon>
        <span>Filter</span>
      </div>
    </div>
  </div>

  <!-- Sort by Modal -->
  <q-dialog v-model="sortModal">
    <q-card style="width: 300px">
      <q-card-section class="q-pa-sm">
        <div class="text-h6 text-center">Sort By</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="q-gutter-sm flex column">
          <q-radio
            v-model="sort_products"
            @click="sortProducts(`desc`)"
            :val="`desc`"
            label="Newest First"
            v-close-popup
          />
          <q-radio
            v-model="sort_products"
            @click="sortProducts(`asc`)"
            :val="`asc`"
            label="Oldest First"
            v-close-popup
          />
          <q-radio
            v-model="sort_products"
            @click="sortProducts(`price<`)"
            :val="`price<`"
            label="Price Low to High"
            v-close-popup
          />
          <q-radio
            v-model="sort_products"
            @click="sortProducts(`price>`)"
            :val="`price>`"
            label="Price High to Low"
            v-close-popup
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- Sort by Modal End -->
</template>
<script setup>
import { ref, toRefs } from "@vue/reactivity";
import { useProductStore } from "src/stores/products.store";
import { useRoute } from "vue-router";

const props = defineProps({
  viewType: {
    type: String,
    default: "grid",
  },
});

const emit = defineEmits(["toggleViewType"]);
const route = useRoute();
//console.log("route path: ", route.path));
const productStore = useProductStore();
const { viewType } = toRefs(props);
const sort_products = ref("");
const sortModal = ref(false);
const showing = ref(false);

const sortProducts = (sort) => {
  if (route.path.includes("/search")) {
    console.log("search");
    productStore.loadSearchProduct(sort);
  } else if (route.path.includes("/subcategory-product/")) {
    console.log("subcategory");
    productStore.loadSubCategoryProduct(route.params.id, sort);
  }
};
</script>

<style lang="scss" scoped>
.icons {
  cursor: pointer;
  padding: 5px 0px;
}
span {
  color: rgb(78, 78, 78);
}

.border-right {
  border-right: 1px solid #dcdcdc;
}
.border-bottom {
  border-bottom: 1px solid #dcdcdc;
}
</style>
