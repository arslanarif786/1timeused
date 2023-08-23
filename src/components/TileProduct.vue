<template>
  <div class="row items-start">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center">
          <div
            class="img-holder cursor-pointer"
            @click="ProductDetail(product)"
          >
            <img
              class="rounded-borders fit"
              :src="imageBaseURL + product.gallery[0].path"
            />
          </div>
        </q-card-section>
        <q-card-section class="col-7">
          <div
            @click="ProductDetail(product)"
            class="text-h6 ellipsis cursor-pointer"
            style="font-size: 12px"
          >
            {{ product.title.substr(0, 20) }}
            {{ product.title.length > 20 ? "..." : "" }}
          </div>
          <p
            v-if="product.price"
            @click="ProductDetail(product)"
            class="text-caption text-grey ellipsis cursor-pointer"
          >
            RS:{{ product.price }}
          </p>
          <p
            v-else
            @click="ProductDetail(product)"
            class="prise text-center cursor-pointer"
          >
            FREE
          </p>
          <div
            class="flex justify-between cursor-pointer"
            @click="ProductDetail(product)"
          >
            <div class="text-caption text-grey ellipsis">
              {{ product.city || getAddress(product.neighborhood) }}
            </div>
            <div class="text-caption text-grey ellipsis">
              {{ formatDate(product.created_at) }}
            </div>
          </div>
        </q-card-section>
      </q-card-section>

      <q-btn
        :disable="wishlistStore.wishlistLoader == product.id"
        round
        outline
        flat
        @click="addToWishlist(product)"
        size="sm"
        color="primary"
        class="absolute shadow-sm"
        style="top: 5px; right: 10px"
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
      <!--Featured Badge  -->
      <q-badge v-if="product.featured" color="warning" class="badge shadow-sm">
        Featured
      </q-badge>
      <!-- New badge -->
      <q-badge
        v-if="!timeDiff(product.created_at).includes('d')"
        color="primary"
        class="new-baadge shadow-sm"
        >New
      </q-badge>
      <!-- Donation badge -->
      <q-badge v-if="!product.price" color="positive" class="badge shadow-sm"
        >Donation
      </q-badge>
    </q-card>
  </div>
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
  mainDiv: {
    type: String,
    default: "featured-products",
  },
});
const { product, mainDiv } = toRefs(props);

// const presentDAte = new Date();
// const createdAt = new Date(product.created_at);
// diff.value = Math.abs(presentDAte.getTime() - createdAt.getTime()) / 3600000;
// console.log("date difference ", diff.value);

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
  }

  if (address && address.length > 15) {
    const addressArray = address.split(",");
    return addressArray
      .slice(Math.max(addressArray.length - 5, 1))
      .join(",")
      .substring(1, 15);
  }
  return address;
};

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
const formatDate = (date) => {
  date = new Date(date);
  return `${date.getDate()} ${months[date.getMonth()]}`;
};
</script>

<style lang="scss" scoped>
.my-card {
  height: 130px;
  width: 350px;
  position: relative;
  @media (max-width: $breakpoint-xs-max) {
    width: 97vw;
  }
}
.badge {
  position: absolute;
  top: 50%;
  right: 2px;
}
.new-baadge {
  position: absolute;
  top: 35%;
  right: 2px;
}

.img-holder {
  height: 100px;
  width: 100%;
}
.img-holder > img {
  object-fit: cover;
}
</style>
