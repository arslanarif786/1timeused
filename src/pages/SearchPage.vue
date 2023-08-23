<template>
  <div class="container q-mb-md" @scroll="handleScroll">
    <ProductsHeader
      :viewType="viewType"
      @toggleViewType="viewType = viewType == 'grid' ? 'tile' : 'grid'"
    />

    <div class="row justify-center items-start q-gutter-md q-mt-sm q-px-sm">
      <div class="col-md-4 col-12">
        <q-input
          ref="neighborhood"
          for="neighborhood"
          bg-color="white"
          rounded
          outlined
          dense
          placeholder="Custom location instead of current?"
          label="Your location"
          @keydown.enter="getLocation"
          v-model="get_location.neighborhood"
          @update:model-value="getLocation"
          class="q-pa-none"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>
      </div>

      <div class="col-md-6 col-12">
        <q-select
          ref="searchInput"
          bg-color="white"
          rounded
          outlined
          @keydown.enter="searchProducts"
          v-model="search"
          use-input
          hide-selected
          fill-input
          dense
          @update:model-value="searchProducts"
          debounce="400"
          label="Search Here"
          @filter="getSearchSuggestions"
          :options="searchSuggestions"
          @filter-abort="searchProducts"
          style="max-width: 100%"
          dropdown-icon="false"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results</q-item-section>
            </q-item>
          </template>

          <template v-slot:after>
            <q-btn
              @click="searchProducts"
              color="white"
              text-color="primary"
              round
              icon="search"
              size="16px"
            >
            </q-btn>
          </template>
        </q-select>
        <div
          v-show="search"
          class="text-center text-grey q-my-md text-subtitle1"
        >
          Results for "<span class="text-bold">{{ search }}</span
          >"
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <ProductsList
      id="productsDiv"
      :products="store.searchProducts"
      :viewType="viewType"
      :loader="store.searchLoader"
    />

    <div
      v-if="!store.searchProducts.length && !store.searchLoader"
      class="empty_space"
    >
      <div class="rounded-borders flex flex-center">
        <div class="text-subtitle1">No result found</div>
      </div>
    </div>
  </div>
  <div class="container">
    <div
      style="height: 40vh"
      v-show="!store.searchProducts || !store.searchProducts.length"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import useSearch from "../composables/useSearch";
import { useProductStore } from "src/stores/products.store";
import ProductsHeader from "src/components/ProductsHeader.vue";
import ProductsList from "src/components/ProductsList.vue";
import useMetaTags from "src/composables/useMetaTags";
import useProductForm from "src/composables/useProductForm";
import useValidationRules from "src/composables/useValidationRules";

useMetaTags({
  title: "Search",
});
const store = useProductStore();

const viewType = ref("grid");

const {
  searchInput,
  searchSuggestions,
  getSearchSuggestions,
  searchProducts,
  search,
  get_location,
} = useSearch();

const { product, productError, productForm } = useProductForm();
const { rules } = useValidationRules();
const getLocation = () => {
  console.log("location get", get_location);
};

watch(get_location, (current) => {
  console.log(get_location);
});
onMounted(() => {
  searchInput.value.focus();

  const input = document.getElementById("neighborhood");
  const options = {
    //bounds: defaultBounds,
    componentRestrictions: { country: "pk" },
    fields: ["geometry", "formatted_address", "name"],
    strictBounds: false,
    types: ["geocode"],
  };

  setTimeout(() => {
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    console.log("autocomplete", autocomplete);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      get_location.neighborhood = place.formatted_address || place.name;
      console.log("place", place);
      if (place.geometry && place.geometry.location) {
        get_location.latitude = place.geometry.location.lat();
        get_location.longitude = place.geometry.location.lng();
      } else {
        console.log("Returned place contains no geometry");
      }
    });
  }, 2000);
});
</script>

<style lang="scss" scoped>
.search-bg {
  background: #fff;
}
.text-bold {
  font-weight: 500;
  color: black;
}
.empty_space {
  height: calc(50vh - 371px);
}

@media (max-width: 1024px) {
  .mb-10-mobile {
    margin-bottom: 10px;
  }
}
</style>
