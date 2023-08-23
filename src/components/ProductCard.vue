<template>
  <q-card class="cursor-pointer relative-position">
    <div class="img-holder" @click="ProductDetail(product)">
      <q-img
        :src="
          product.gallery.length ? imageBaseURL + product.gallery[0].path : ''
        "
        class="fit"
      />
    </div>

    <q-card-section>
      <q-btn
        :disable="wishlistStore.wishlistLoader == product.id"
        round
        outline
        flat
        @click="addToWishlist(product)"
        size="sm"
        color="primary"
        class="absolute bg-white shadow-sm"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      >
        <q-spinner-ios
          v-if="wishlistStore.wishlistLoader == product.id"
          color="red"
          size="1.5em"
        />
        <i
          v-else
          class="fa-2x"
          :class="{
            'fa fa-heart-o': product.favorite != 1,
            'fa fa-heart': product.favorite == 1,
          }"
          aria-hidden="true"
        ></i>
      </q-btn>
      <div @click="ProductDetail(product)">
        <p class="ellipsis text-subtitle2 mobile-font">
          {{ product.title }}
        </p>
        <p v-if="product.price" class="price text-primary text-center">
          RS:{{ product.price }}
        </p>
        <p v-else class="price text-center text-orange">FREE</p>
        <!-- <q-badge v-else rounded color="orange" label="Free" class="price" /> -->
      </div>

      <div @click="ProductDetail(product)" class="flex justify-between">
        <small class="mobile-font">
          {{ product.city || getAddress(product.neighborhood) }}
        </small>
        <small class="mobile-font">
          {{ formatDate(product.created_at) }}
        </small>
      </div>
    </q-card-section>

    <!-- Feature badge -->
    <q-badge
      v-if="product.featured"
      color="amber"
      class="featured-baadge shadow-sm"
      >Featured
    </q-badge>
    <!-- New badge -->
    <q-badge
      v-if="!timeDiff(product.created_at).includes('d')"
      color="primary"
      class="new-baadge shadow-sm"
      >New
    </q-badge>
    <!-- Donation badge -->
    <q-badge
      v-if="!product.price"
      color="positive"
      class="donation-baadge shadow-sm"
      >Donation
    </q-badge>
  </q-card>
</template>

<script setup>
import useTimeFormat from "src/composables/useTimeFormat.js";
import { useWishlistStore } from "../stores/wishlist.store";
import { useProductStore } from "../stores/products.store";
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
const imageBaseURL = process.env.imagesBaseURL;
const wishlistStore = useWishlistStore();
const productStore = useProductStore();
const router = useRouter();
const $q = useQuasar();
const { timeDiff } = useTimeFormat();

const props = defineProps({
  product: Object,
});

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const { product, parentDiv } = toRefs(props);

const addToWishlist = (product) => {
  wishlistStore.addWishlist(product);
};

const ProductDetail = (product) => {
  productStore.loadedProduct = $q.screen.gt.sm ? null : product;
  router.push({
    path: `/product_details/${product.slug}`,
  });
  const index = productStore.recentProducts.findIndex(
    (object) => object.id === product.id
  );
  if (index === -1) {
    productStore.recentProducts.unshift(product);
  } else {
    productStore.recentProducts = productStore.recentProducts.filter(
      (pro) => pro.id != product.id
    );
    productStore.recentProducts.unshift(product);
  }
};

const getAddress = (address) => {
  if (address) {
    address = address.replace(", Pakistan", "");
    address = address.replace("Pakistan", "");
  }

  return address.substring(0, 15);
};

const formatDate = (date) => {
  date = new Date(date);
  return `${date.getDate()} ${months[date.getMonth()]}`;
};
</script>

<style lang="scss" scoped>
.img-holder {
  height: 160px;
  width: 100%;
}
.price {
  font-weight: 600;
}
.featured-baadge {
  position: absolute;
  top: 40px;
  right: 0;
}
.new-baadge {
  position: absolute;
  top: 18px;
  right: 0;
}
.donation-baadge {
  position: absolute;
  top: 18px;
  right: 0;
}

@media (max-width: $breakpoint-sm-max) {
  .mobile-font {
    font-size: 9px;
  }
  .img-holder {
    height: 120px;
  }
}
</style>
