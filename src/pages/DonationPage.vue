<template>
  <div class="container" :class="{ 'relative-position': $q.screen.gt.sm }">
    <div class="column q-pb-xl">
      <div class="row justify-center items-center q-my-md">
        <div class="col-md-6 col-12">
          <q-input
            @update:model-value="searchDonatedProduct"
            class="q-my-auto"
            dense
            bg-color="white"
            outlined
            rounded
            debounce="400"
            v-model="search"
            label="Search Here"
            style="max-width: 100%"
          >
            <template v-slot:after>
              <q-btn
                color="white"
                text-color="primary"
                icon="search"
                size="16px"
                rounded
              >
              </q-btn>
            </template>
          </q-input>
          <h6 v-show="search" class="text-center text-grey q-my-md">
            Results for "<span class="text-bold">{{ search }}</span
            >"
          </h6>
        </div>
      </div>

      <!-- <h5 class="text-center q-pb-md">Donate Products</h5> -->

      <ProductsList
        id="productsDiv"
        :products="store.donateProducts"
        :loader="store.loadingStatus"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../stores/products.store";
import { useWishlistStore } from "../stores/wishlist.store";
import useSearch from "../composables/useSearch";
import ProductsList from "src/components/ProductsList.vue";
import useMetaTags from "src/composables/useMetaTags";

useMetaTags({
  title: "Donation Product",
});
const search = ref("");

const model = ref(null);
const imageBaseURL = process.env.imagesBaseURL;
const wishlistStore = useWishlistStore();
const store = useProductStore();
onMounted(() => {
  store.loadDonateProducts();
});

const addToWishlist = (id) => {
  wishlistStore.addWishlist(id);
};

const searchDonatedProduct = (value) => {
  store.loadDonateProducts(value);
};
const donateProducts = computed(() => store.donateProducts);
</script>

<style lang="scss" scoped>
.container {
  min-height: 60vh;

  @media screen and (max-width: 768px) {
    min-height: 88vh;
  }
}

.img-holder {
  height: 160px;
  width: 100%;
}

.donation-baadge {
  position: absolute;
  bottom: 60%;
  right: 0;
}
.my-card {
  width: 210px;
}

@media (max-width: 1290px) {
  .my-card {
    width: 168px;
  }
}

@media (max-width: $breakpoint-sm-max) {
  .my-card {
    width: 150px;
    max-width: 170px;
    font-size: 11px;
  }
  .mobile-font {
    font-size: 10px;
  }
  .img-holder {
    height: 120px;
  }
}

@media (max-width: 336px) {
  .my-card {
    width: 120px;
  }
}
</style>
