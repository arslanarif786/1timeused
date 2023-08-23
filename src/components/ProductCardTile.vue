<template>
  <div class="row items-start">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section
          @click="ProductDetail(product)"
          class="col-5 flex flex-center cursor-pointer"
        >
          <div class="img-holder">
            <img
              class="rounded-borders fit"
              :src="imageBaseURL + product.gallery[0].path"
            />
          </div>
        </q-card-section>
        <q-card-section class="col-7">
          <div class="text-h6 ellipsis" style="font-size: 12px">
            {{ product.title.substr(0, 20) }}
            {{ product.title.length > 20 ? "..." : "" }}
          </div>
          <div class="flex justify-between">
            <p v-if="product.price" class="text-caption text-grey ellipsis">
              RS:{{ product.price }}
            </p>
            <p v-else class="prise text-center">FREE</p>
            <div class="text-caption text-primary ellipsis">
              in Stock:<span class="dark">{{ product.current_stock }}</span>
            </div>
          </div>

          <div class="flex justify-between">
            <q-btn
              @click="small = true"
              :label="status[product.status]"
              size="8px"
              color="primary"
              class="q-mb-xs"
            />
            <div class="text-caption text-grey">
              <q-icon name="visibility" color="primary" size="12px" />
              {{ product.views }}
            </div>
          </div>

          <div class="flex justify-between">
            <div class="text-caption text-grey ellipsis">
              {{ product.city || getAddress(product.neighborhood) }}
            </div>
            <div class="text-caption text-grey ellipsis">
              {{ formatDate(product.created_at) }}
            </div>
          </div>
        </q-card-section>
      </q-card-section>
      <span>
        <!-- Edit Delete -->
        <div class="inline cursor-pointer menu-icon shadow-sm">
          <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
        </div>
        <q-menu touch-position>
          <q-list style="min-width: 100px" dense>
            <q-item clickable v-close-popup>
              <q-item-section @click="editProduct">Edit</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="confirm = true">Delete</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </span>
    </q-card>
  </div>

  <!-- Delete Confirmation Modal -->
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm"
          >Are You sure you want to delete this Product</span
        >
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Yes"
          color="primary"
          @click="deleteProduct(product.id)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Modal Order Active & Deactive -->
  <q-dialog v-model="small">
    <q-card style="width: 230px">
      <div class="q-gutter-sm flex column q-pa-md">
        <q-radio
          v-for="(name, index) in status"
          :key="index"
          v-model="product.status"
          @click="changeStatus(index)"
          :val="index"
          :label="name"
          v-close-popup
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
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

const payload = ref({
  id: product.value.id,
  status: product.value.status,
});

const status = ref([
  "Deactivate",
  "Activate",
  "Sold out",
  "Sold Out/Deactivate",
]);

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

const editProduct = () => {
  productStore.selectedProductForEdit = product.value;
  router.push(`/edit_product/${product.value.id}`);
};

const deleteProduct = (id) => {
  productStore.deleteAProduct(id);
};

const changeStatus = (status) => {
  payload.value.status = status;
  productStore.productStatus(payload.value);
};

const getAddress = (address) => {
  if (address) {
    address = address.replace(", Pakistan", "");
    //address = address.replace("Pakistan", "");
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

const confirm = ref(false);
const small = ref(false);

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

.menu-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.911);
  padding: 0px 8px;
  border-radius: 3px !important;
}

p {
  margin: 0 0 3px;
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
