<template>
  <div class="row items-start">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center">
          <div class="img-holder">
            <img
              class="rounded-borders fit"
              src="https://www.w3schools.com/w3images/avatar2.png"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6 ellipsis" style="font-size: 12px">
            Any product
          </div>
          <div class="flex justify-between">
            <div class="text-caption text-grey ellipsis">12 apr</div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
const product = {
  productName: "Any Product",
  productID: 123,
  productImage: "https://www.w3schools.com/w3images/avatar2.png",
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

.img-holder {
  height: 100px;
  width: 100%;
}
.img-holder > img {
  object-fit: cover;
}
</style>
