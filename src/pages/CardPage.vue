<template>
  <div class="container q-py-lg">
    <h1 class="text-h5 text-center w-100">Add Products</h1>
    <!-- Avatar -->
    <div class="profile-avatar column items-center w-100">
      <q-avatar size="100px">
        <img
          src="data:image/jpeg;base64,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"
        />
        <div class="absolute-bottom text-right" style="right: 6px; bottom: 5px">
          <q-btn round color="black" size="8px" icon="photo_camera" />
        </div>
      </q-avatar>

      <div class="flex justify-center items-center w-100">
        <div class="q-pa-md account-tab">
          <!-- Purpose Tabs -->
          <div class="col-12 q-my-lg">
            <div class="purpose">
              <div class="text-h6">Purpose:</div>
              <q-tabs v-model="tab" class="text-teal">
                <q-tab class="text-primary" name="mails" label="Rental" />
                <q-tab class="text-primary" name="alarms" label="Sale" />
                <q-tab class="text-primary" name="movies" label="Both" />
                <q-tab class="text-primary" name="donate" label="Donate" />
              </q-tabs>
            </div>
          </div>
          <q-input
            outlined
            v-model="user.city"
            label="Enter City"
            class="q-mb-md"
          />
          <q-input
            outlined
            v-model="user.email"
            label="TalhaTahir@gmail.com"
            class="q-mb-md"
          />
          <q-input
            outlined
            v-model="user.phone"
            label="Enter Phone "
            class="q-mb-md"
          />
          <q-input
            outlined
            v-model="user.neighbourhood"
            label="Enter Neighborhood "
            class="q-mb-md"
          />
          <q-toggle v-model="accept" label="Show my phone number in ads" />
        </div>
      </div>

      <q-btn color="primary" glossy label="Update Setting" />
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
const accept = ref(false);

const user = ref({
  name: "Asif Ali",
  email: "anyemail@gmail.com",
  city: "Lahore",
  neighbourhood: "Johar Town",
  phone: "+9230012345678",
});
</script>




<style lang="scss" scoped>
.account-tab {
  width: 50%;
}
.text-h6 {
  font-size: 15px;
}

@media (max-width: $breakpoint-sm-max) {
  .account-tab {
    width: 100%;
  }
}
</style>
