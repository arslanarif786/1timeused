<template>
  <div class="container q-py-lg">
    <h1 class="text-h5 text-center w-100">Suggestion</h1>
    <!-- Avatar -->
    <div class="profile-avatar column items-center w-100">
      <!-- <q-avatar size="100px">
        <img src="https://www.w3schools.com/w3images/avatar2.png" />
        <div class="absolute-bottom text-right" style="right: 6px; bottom: 5px">
          <q-btn round color="black" size="8px" icon="photo_camera" />
        </div>
      </q-avatar>

      <div class="text-h6 text-center q-pt-sm">Talha Tahir</div>
      <div class="email text-grey">Asif.ali142280@gmail.com</div> -->

      <div class="flex justify-center items-center w-100">
        <div class="q-pa-md account-tab">
          <q-input
            bg-color="white"
            outlined
            v-model="credentials.subject"
            label="Subject"
            class="q-mb-md"
            :rules="[
              rules.required,
              (val) => val.length >= 3 || 'Subject atleast 3 characters',
            ]"
          />
          <q-input
            outlined
            bg-color="white"
            type="textarea"
            v-model="credentials.description"
            label="Description"
            class="q-mb-md"
            :rules="[
              rules.required,
              (val) => val.length >= 24 || 'Description atleast 24 characters',
            ]"
          />
        </div>
      </div>

      <q-btn
        color="primary"
        glossy
        label="Add Suggestion"
        @click="add_suggestion()"
      />
    </div>
  </div>
</template>

<script setup>
import { useSellerStore } from "src/stores/seller.store";
import useValidationRules from "src/composables/useValidationRules";
import { ref } from "vue";
import useMetaTags from "src/composables/useMetaTags";

useMetaTags({
  title: "Suggestions",
});
const { rules } = useValidationRules();
const sellerStore = useSellerStore();

const credentials = ref({
  subject: "this user have no complete info",
  description: "this user is not have complete information",
});

const add_suggestion = () => {
  sellerStore.suggestion(credentials.value);
  credentials.value.subject = "";
  credentials.value.description = "";
};
</script>

<style lang="scss" scoped>
.account-tab {
  width: 50%;
}

@media (max-width: $breakpoint-sm-max) {
  .account-tab {
    width: 100%;
  }
}
</style>
