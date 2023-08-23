<template>
  <div class="container" :class="{ 'relative-position': $q.screen.gt.sm }">
    <div class="row justify-between items-center">
      <div class="col-md-10 col-6">
        <h1 class="app-page-title">
          Notifications
          <q-icon name="notifications_active" color="primary" size="sm" />
        </h1>
      </div>
      <div class="col-md-2 col-6">
        <q-select
          dense
          outlined
          v-model="model"
          :options="options"
          label="This Week"
          class="bg-white"
        />
      </div>
    </div>
    <!-- Notifications Card  -->
    <div v-if="store.notifications.length">
      <div
        class="q-pa-lg bg-white osahan-post-header q-mb-md shadow-sm rounded-10"
        v-for="notification in store.notifications"
        :key="notification.id"
      >
        <div class="row">
          <div class="col-md-9 col-12 cursor-pointer">
            <div class="dropdown-list-image flex items-center">
              <img
                class="rounded-circle q-mr-md"
                src="https://api.dex.proelean.com/uploads/user_snaps/448516476083905.png"
                alt=""
              />
              <div class="text-h6 ellipsis">Asjad Ali Watto</div>
            </div>
          </div>

          <div class="col-md-3 col-12 flex items-center justify-end">
            <small class="text-grey q-mr-lg">5 days ago</small>
            <div>
              <q-icon
                name="delete"
                color="primary"
                size="sm"
                class="cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div class="row cursor-pointer">
          <div class="col-12 q-pa-md">
            <div class="text-grey" style="word-break: break-word">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              repudiandae, distinctio esse nobis consequatur officiis
              consequuntur officia totam hic ad alias, obcaecati harum
              perspiciatis nulla eos atque sed doloribus minus!
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="absolute-center w-100">
      <div class="m-auto text-center">
        <h5 class="text-subtitle1 text-grey">No Notifications Available</h5>
        <div class="notify-img">
          <img src="../../public/icons/notify.svg" alt="notify" width="300" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from "../stores/notification.store";
import { onMounted, ref } from "vue";
import useMetaTags from "src/composables/useMetaTags";

useMetaTags({
  title: "Notifications",
});
const model = ref(null);
const store = useNotificationStore();

const options = [
  "Last Week",
  "Last Month",
  "Last 6 Months",
  "Last Year",
  "All",
];

onMounted(() => store.loadNotification());
</script>

<style lang="scss" scoped>
.container {
  min-height: 60vh;

  @media screen and (max-width: 768px) {
    min-height: 88vh;
  }
}
.app-page-title {
  font-size: 1.5rem;
}
.dropdown-list-image img {
  height: 2.5rem;
  width: 2.5rem;
}
.rounded-circle {
  border-radius: 50% !important;
}
.text-h6 {
  font-size: 17px;
}
</style>
