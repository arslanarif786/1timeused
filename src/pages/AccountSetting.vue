<template>
  <div class="container q-py-lg">
    <h1 class="text-subtitle1 text-center vw99 desktop-only">
      Account Settings
    </h1>
    <!-- Avatar -->
    <div class="profile-avatar column items-center w-100">
      <q-avatar size="100px">
        <img
          :src="
            imageBase64
              ? imageBase64
              : profile.photo
              ? imageBaseURL + profile.photo
              : `https://www.w3schools.com/w3images/avatar2.png`
          "
          alt="img"
          style="object-fit: cover"
          @click="$refs.fileInput.click()"
        />
        <div
          class="absolute-bottom text-right"
          style="right: -3px; bottom: 1px"
        >
          <input
            type="file"
            label="Standard"
            @change="handleProfileImage($event)"
            ref="fileInput"
            hidden
            @click="$refs.fileInput.click()"
          />
          <i
            class="fa fa-camera cursor-pointer shadow-sm bg-white q-pa-xs rounded"
            @click="$refs.fileInput.click()"
            style="font-size: 20px"
          >
          </i>
        </div>
      </q-avatar>

      <!-- <div class="text-h6 text-center q-pt-sm">{{ userName }}</div>
      <div class="email text-grey">{{ userEmail || userPhone }}</div> -->

      <div class="flex justify-center items-center w-100">
        <div class="q-pa-md account-tab">
          <q-input
            bg-color="white"
            outlined
            v-model="profile.name"
            label="Enter Full Name"
            class="q-mb-md"
            :rules="[
              (val) => val.length >= 3 || 'Name must be atleast 3 characters',
            ]"
          />
          <q-input
            bg-color="white"
            outlined
            v-model="profile.city"
            label="Enter City"
            class="q-mb-md"
          />
          <q-input
            bg-color="white"
            outlined
            v-model="profile.email"
            label="example@mail.com"
            class="q-mb-md"
            :rules="[rules.required, rules.email]"
          />
          <q-input
            bg-color="white"
            outlined
            v-model="profile.phone"
            label="Enter Phone "
            class="q-mb-md"
            maxlength="13"
            type="text"
            @keyup="validatePhone"
            :rules="[
              rules.required,
              (val) => val.length == 13 || 'Number must be 13 characters',
            ]"
          />
          <q-input
            bg-color="white"
            outlined
            v-model="profile.neighborhood"
            label="Enter Neighborhood "
            class="q-mb-md"
          />
          <q-toggle v-model="accept" label="Show my phone number in ads" />
        </div>
      </div>

      <q-btn
        color="primary"
        glossy
        label="Update Setting"
        @click="update_profile()"
      />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth.store";
import { ref } from "vue";
import useValidationRules from "src/composables/useValidationRules";
import compressImage from "src/composables/useImageCompression";
import useMetaTags from "src/composables/useMetaTags";

useMetaTags({
  title: "Account Setting",
});
const imageBaseURL = process.env.imagesBaseURL;
const { rules } = useValidationRules();
const authStore = useAuthStore();
const profile = ref(authStore.authUser);
const accept = ref(false);
const imageBase64 = ref(null);

const validatePhone = () => {
  if (
    profile.value.phone.length <= 4 &&
    profile.value.phone.substring(0, 4) != "+923"
  ) {
    profile.value.phone = "+923";
  } else {
    profile.value.phone = "+" + profile.value.phone.replace(/[^0-9]/g, "");
  }
};

/////////////////     Convert Profile Image into Base64
const convertFileToBase64 = (file) => {
  imageBase64.value = file;
  const reader = new FileReader();
  reader.onloadend = function () {
    imageBase64.value = reader.result;
    //console.log(imageBase64.value);
  };
  reader.readAsDataURL(file);
};
const handleProfileImage = async (e) => {
  const file = e.target.files[0];

  profile.value.photo = await compressImage(file, "profile-img");
  convertFileToBase64(file);
};

//////////////////     Update Profile Button
const update_profile = async () => {
  const response = await authStore.updateProfile(profile.value);
};
</script>

<style lang="scss" scoped>
.rounded {
  border-radius: 10px;
}
.account-tab {
  width: 50%;
}

@media (max-width: $breakpoint-sm-max) {
  .account-tab {
    width: 100%;
  }
}
</style>
