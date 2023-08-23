<template>
  <div class="slider-main" v-if="product && product.gallery.length">
    <q-carousel
      animated
      v-model="slide"
      :navigation="product.gallery.length > 1"
      dark
      infinite
      :arrows="product.gallery.length > 1"
      swipeable
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      v-model:fullscreen="fullscreen"
      class="fit details-carousel"
    >
      <q-carousel-slide
        v-for="(image, index) in product.gallery"
        :key="image.id"
        :name="index"
        :img-src="imageBaseURL + image.path"
      />
      <template v-slot:control>
        <q-carousel-control position="bottom-right" :offset="[18, 18]">
          <q-btn
            push
            round
            dense
            color="white"
            text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
        <q-carousel-control position="top-right" :offset="[10, 30]">
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
            <i
              v-if="wishlistStore.wishlistLoader == product.id"
              class="fa fa-repeat fa-2x"
              aria-hidden="true"
            ></i>
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
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProductStore } from "src/stores/products.store";
import { useWishlistStore } from "src/stores/wishlist.store";
const { toRefs } = require("@vue/reactivity");
const wishlistStore = useWishlistStore();
const imageBaseURL = process.env.imagesBaseURL;
const productStore = useProductStore();
const props = defineProps({
  product: Object,
});
const slide = ref(0);
const fullscreen = ref(false);
const { product } = toRefs(props);
const addToWishlist = (product) => {
  wishlistStore.addWishlist(product);
};
</script>

<style>
.details-carousel .q-panel.scroll {
  background: rgb(22, 19, 19);
}
.q-carousel__slide {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
<style lang="scss" scoped>
.slider-main {
  height: 190px;
  width: 100%;

  @media screen and (min-width: $breakpoint-sm-min) {
    height: 340px;
  }

  @media screen and (min-width: $breakpoint-md-min) {
    height: 540px;
  }
}
</style>
