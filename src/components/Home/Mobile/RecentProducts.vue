<template>
  <div :class="{ 'q-pa-lg': $q.screen.gt.sm }">
    <h5 class="text-center q-pb-xl q-mt-sm">Recent Products</h5>
    <div class="slider" id="slider" :style="{ height: `${sliderHeight}px` }">
      <div class="slide" id="slide">
        <div
          v-for="(i, index) in 17"
          :key="index"
          :style="{
            'margin-right': `${itemMarginRight}px`,
          }"
          class="
            item
            row
            fit
            justify-center
            items-center
            q-gutter-md q-col-gutter
            no-wrap
          "
        >
          <CardSkeleton
            style="height: 266px; width: 180px"
            v-if="store.recentProductsLoader"
          />
          <ProductCard
            :product="
              store.recentProducts[index]
                ? store.recentProducts[index]
                : store.recentProducts[index % store.recentProducts.length]
            "
            style="width: 180px"
          />
        </div>
      </div>

      <q-btn
        class="pro-prev desktop-only"
        round
        color="secondary"
        icon="chevron_left"
        @click="translateX('backward')"
        v-show="slide > 0"
      />

      <q-btn
        class="pro-next desktop-only"
        round
        color="secondary"
        icon="chevron_right"
        v-show="slide == 0 || slide < hiddenItems"
        @click="translateX"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import ProductCard from "src/components/ProductCard.vue";
import CardSkeleton from "src/components/CardSkeleton.vue";
import { useProductStore } from "../../../stores/products.store";
import CardPage from "src/pages/CardPage.vue";
const $q = useQuasar();
const store = useProductStore();
const slide = ref(0);
const sliderHeight = $q.screen.lt.sm ? 275 : 300;
const itemMarginRight = 10;
const totalItems = 10;
const hiddenItems = ref(0);

const translateX = (type = "forward") => {
  if (!hiddenItems.value) {
    hiddenItems.value = countOfHiddenItems();
  }

  if (
    (type == "backward" && slide.value < 1) ||
    (type != "backward" && slide.value >= hiddenItems.value)
  ) {
    return;
  }

  if (type == "backward") {
    slide.value -= 1;
  } else {
    slide.value += 1;
  }

  const slideElement = document.querySelector("#slide");
  slideElement.style.left =
    slide.value *
      -(
        sliderHeight +
        itemMarginRight +
        (slide.value == hiddenItems.value ? 42 : 0)
      ) +
    "px";
};

const countOfHiddenItems = () => {
  const slider = document.getElementById("slider");
  const visibleItems = slider.offsetWidth / (sliderHeight + itemMarginRight);
  return totalItems - Math.ceil(visibleItems);
};
</script>

<style lang="scss" scoped>
h5 {
  margin-bottom: 0;
}

.section-main-div {
  padding-bottom: 0 !important;
}

.slider {
  width: 100%;
  position: relative;
  margin: auto;
  overflow-x: scroll;
  overflow-y: hidden;
}

.slider::-webkit-scrollbar {
  display: none;
}

.slider .slide {
  display: flex;
  position: absolute;
  left: 0;
  transition: 0.3s left ease-in-out;
}

.slider .item:last-child {
  margin-right: 0;
}

.ctrl {
  text-align: center;
  margin-top: 5px;
}

.pro-prev {
  left: 0;
  position: absolute;
  top: 50%;
  margin-top: -27.5px;
}

.pro-next {
  right: 0;
  position: absolute;
  top: 50%;
  margin-top: -27.5px;
}
</style>
