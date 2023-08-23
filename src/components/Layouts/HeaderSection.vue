<template>
  <div class="bg-white">
    <div
      class="container"
      :class="{ 'bg-primary': $q.screen.lt.md, 'bg-white': $q.screen.gt.sm }"
    >
      <div class="row border-bottom items-center">
        <div class="col col-md-4 text-center">
          <q-input
            class="q-my-auto"
            dense
            filled
            :disable="$route.path == '/search'"
            outlined
            @focus="$router.push('/search')"
            label="Search Here"
            v-if="$q.screen.gt.sm"
            style="max-width: 100%"
          >
            <template v-slot:after>
              <q-btn
                :disable="$route.path == '/search'"
                icon="search"
                size="16px"
                outline
              >
              </q-btn>
            </template>
          </q-input>
        </div>
        <div class="col-2 col-md-4 text-center">
          <router-link to="/">
            <img
              :src="`https://1timeused.com/assets/img/logo/${
                $q.screen.lt.md ? `logo-white` : 'logo'
              }.png`"
              alt=""
              class="brand-logo q-py-sm"
            />
          </router-link>
        </div>
        <div class="col-10 col-md-4 text-center text-right">
          <div>
            <q-btn
              :size="$q.screen.lt.md ? 'sm' : `md`"
              class="q-mr-md"
              round
              color="primary"
              glossy
              icon="mail"
              @click="$router.push('/chat')"
            >
              <q-tooltip class="grey-10">Chat</q-tooltip>
              <!-- <q-badge color="red" floating>2</q-badge> -->
            </q-btn>
            <q-btn
              :size="$q.screen.lt.md ? 'sm' : `md`"
              class="q-mr-md"
              round
              color="primary"
              glossy
              icon="notifications"
              @click="$router.push('/notifications')"
            >
              <q-tooltip class="grey-10">Notifications</q-tooltip>
              <!-- <q-badge color="red" floating>100+</q-badge> -->
            </q-btn>
            <!-- <q-btn
              round
              color="primary"
              icon="category"
              size="md"
              class="q-mr-md desktop-only"
              @click="$router.push('/category')"
            >
              <q-tooltip class="grey-10">Categories</q-tooltip>
            </q-btn> -->
            <q-btn
              round
              color="primary"
              icon="add_circle"
              size="md"
              class="q-mr-md desktop-only"
              @click="$router.push('/my_products')"
            >
              <q-tooltip class="grey-10">My Products</q-tooltip>
            </q-btn>
            <q-btn
              :size="$q.screen.lt.md ? 'sm' : `md`"
              class="q-mr-md"
              round
              color="primary"
              glossy
              icon="search"
              @click="$router.push('/search')"
            >
              <q-tooltip class="grey-10">Search</q-tooltip>
            </q-btn>

            <q-avatar class="cursor-pointer desktop-only">
              <img
                :src="authStore.profilePhoto"
                alt="img"
                style="object-fit: cover"
                referrerpolicy="no-referrer"
              />
              <q-tooltip class="grey-10">Profile</q-tooltip>
              <q-menu
                transition-show="scale"
                transition-hide="scale"
                class="gt-sm"
              >
                <q-list style="min-width: 200px">
                  <q-item clickable>
                    <q-item-section
                      class="flex"
                      @click="$router.push('/account')"
                    >
                      Account</q-item-section
                    >
                  </q-item>
                  <q-item clickable>
                    <q-item-section
                      v-if="profile"
                      @click="$router.push('/account_setting')"
                    >
                      Account Settings</q-item-section
                    >
                    <q-item-section v-else @click="$router.push('/login')">
                      Account Settings</q-item-section
                    >
                  </q-item>

                  <q-separator />
                  <q-item clickable>
                    <q-item-section @click="handleLogout()"
                      >Sign
                      {{ authStore.authUser ? "Out" : "In" }}</q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </q-avatar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useAuthStore } from "src/stores/auth.store";
const authStore = useAuthStore();
const profile = authStore.authUser;

function handleLogout() {
  authStore.logout();
}
</script>

<style lang="scss" scoped>
.brand-logo {
  width: 180px;
}

.q-btn {
  font-size: 1.715em;
  color: #8f8c86;
}

@media (min-width: $breakpoint-md-max) {
  .toolbar {
    padding: 0 4rem;
  }
}

@media (max-width: $breakpoint-md-max) {
  .brand-logo {
    width: 140px;
  }
}
</style>
