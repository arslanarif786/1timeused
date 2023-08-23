<template>
  <div class="col-12 col-md-6 q-pa-sm" v-if="product">
    <q-card class="top-card q-px-md q-mb-md" flat bordered>
      <div class="title-date flex justify-between items-center">
        <div class="text-h6 ellipsis common-size">{{ product.title }}</div>
        <div class="text-grey common-size">
          {{ product.created_at.substring(0, 10) }}
        </div>
      </div>
      <div class="title-date flex justify-between items-center">
        <div
          v-if="product.price"
          class="ellipsis text-subtitle1 text-primary common-size price"
        >
          RS:{{ product.price }}
        </div>
        <div
          v-if="!product.price"
          class="ellipsis text-subtitle1 text-grey common-size"
        >
          FREE
        </div>
        <div class="text-subtitle1 common-size text-grey">
          <q-icon name="visibility" color="primary" />
          {{ product.views }}
        </div>
      </div>
      <div class="title-date flex justify-between items-center">
        <div class="text-subtitle1 text-grey ellipsis common-size">
          {{ product.neighborhood }}
        </div>
        <div class="text-subtitle1 common-size">
          <span class="text-primary">in Stock:</span>
          <span class="dark">{{ product.current_stock }}</span>
        </div>
      </div>
    </q-card>

    <!-- Product-Details Card -->
    <q-card class="my-card q-px-md" flat bordered>
      <div class="title">
        <div class="text-h6 ellipsis common-size">Product Details</div>
      </div>

      <div class="title-date flex justify-between items-center">
        <div class="ellipsis text-subtitle1 text-grey common-size">Type</div>
        <div class="text-subtitle1 common-size text-grey">
          {{ product.category.title }}
        </div>
      </div>
      <q-separator />
      <div class="title-date flex justify-between items-center">
        <div class="ellipsis text-subtitle1 text-grey common-size">
          Condition
        </div>
        <div class="text-subtitle1 common-size text-grey">
          {{ product.condition }}
        </div>
      </div>
      <q-separator />
      <div class="title-date flex justify-between items-center">
        <div class="ellipsis text-subtitle1 text-grey common-size">Size</div>
        <div class="text-subtitle1 common-size text-grey">
          {{ product.size }}
        </div>
      </div>
      <q-separator />
      <div class="title-date flex justify-between items-center">
        <div class="ellipsis text-subtitle1 text-grey common-size">Colors</div>
        <div class="text-subtitle1 common-size text-grey">
          {{ product.color }}
        </div>
      </div>
      <q-separator />
      <div class="title-date flex justify-between items-center">
        <div class="ellipsis text-subtitle1 text-grey common-size">Purpose</div>
        <div class="text-subtitle1 common-size text-grey">
          {{ product.purpose }}
        </div>
      </div>
      <q-separator />
      <div class="title-date flex justify-between items-center">
        <div class="ellipsis text-subtitle1 text-grey common-size">Brand</div>
        <div class="text-subtitle1 common-size text-grey">
          {{ product.brand }}
        </div>
      </div>
      <q-separator />
      <div class="title-date flex justify-between items-center">
        <div class="ellipsis text-subtitle1 text-grey common-size">
          Neighbourhood
        </div>
        <div class="text-subtitle1 common-size text-grey">
          {{ product.neighborhood.substring(0, 50) }}
        </div>
      </div>
      <q-separator />
      <div class="title q-pt-sm">
        <div class="text-h6 ellipsis common-size">Description</div>
        <p class="text-grey common-size">
          {{ product.description.replace(", Pakistan", "").substr(0, 50)
          }}{{ product.description.length > 50 ? "..." : "" }}
        </p>
      </div>
      <div class="title text-grey q-pb-sm">
        <span v-show="toggleText"
          >{{ product.description.substr(50) }} <br />
          <a
            @click="toggleText = !toggleText"
            class="text-subtitle2 text-blue cursor-pointer"
          >
            <u>Less</u><q-icon name="expand_less" />
          </a>
        </span>
        <a
          @click="toggleText = !toggleText"
          v-show="!toggleText"
          class="text-subtitle2 text-blue cursor-pointer"
          ><u>More</u><q-icon name="expand_more" />
        </a>
      </div>
    </q-card>

    <!-- Seller Contact -->
    <q-card
      v-if="!authStore.authUser || authStore.authUser.id != product.seller.id"
      class="my-card q-pa-md q-my-sm"
      flat
      bordered
    >
      <div class="title-date">
        <div class="text-h6 ellipsis common-size">Contact Seller</div>
      </div>
      <div class="title-date">
        <div class="row flex items-center justify-center">
          <div class="col-1">
            <q-btn round>
              <q-avatar size="42px">
                <img
                  :src="
                    product.seller.photo
                      ? imageBaseURL + product.seller.photo
                      : `https://www.w3schools.com/w3images/avatar2.png`
                  "
                />
              </q-avatar>
            </q-btn>
          </div>
          <div class="col-11">
            <div class="seller-info q-pl-lg">
              <div
                class="text-subtitle1 cursor-pointer"
                @click="openSellerProfile(product.seller.id)"
              >
                {{ product.seller.name }}
              </div>
              <small class="text-grey" v-if="product.seller.created_at">
                Member since
                {{ product.seller.created_at.substring(0, 10) }}
              </small>
            </div>
          </div>
        </div>
      </div>

      <q-btn
        color="primary"
        size="sm"
        label="Chat With Seller"
        class="w-100 q-my-md"
        @click="redirectToChat"
      />

      <div v-show="product.seller.phone" class="show-number text-center">
        <q-icon name="call" color="primary" />
        <span
          @click="togglePhone = !togglePhone"
          v-show="togglePhone"
          class="cursor-pointer"
          >{{ product.seller.phone }}</span
        >
        <a
          @click="togglePhone = !togglePhone"
          v-show="!togglePhone"
          class="underline-none text-grey cursor-pointer"
          >********* Show Number</a
        >
      </div>
    </q-card>
  </div>
</template>

<script setup>
const { toRefs, ref } = require("@vue/reactivity");
const { useAuthStore } = require("src/stores/auth.store");
const { useChatStore } = require("src/stores/chat.store");
const { useRouter } = require("vue-router");
const imageBaseURL = process.env.imagesBaseURL;
const toggleText = ref(false);
const togglePhone = ref(false);

const authStore = useAuthStore();
const router = useRouter();
const chatStore = useChatStore();

const props = defineProps({
  product: Object,
});

const openSellerProfile = (id) => {
  router.push({ path: `/seller_profile/${id}` });
};

const { product } = toRefs(props);

const redirectToChat = () => {
  chatStore.reffererProduct = product.value;
  chatStore.newConversationUser = product.value.seller;
  chatStore.productMessageModel = {
    productID: "" + product.value.id,
    productName: product.value.title,
    productImage: product.value.gallery.length
      ? product.value.gallery[0].path
      : null,
  };
  router.push(`/chat/${product.value.seller.id}`);
};
</script>

<style></style>

<style scoped lang="scss">
.price {
  font-weight: 600;
}
.top-card {
  margin-top: 20px;
}

.common-size {
  @media screen and (max-width: $breakpoint-sm-max) {
    font-size: 12px;
  }
}
</style>
