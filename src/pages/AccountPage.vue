<template>
  <div class="container q-py-lg">
    <h1 class="text-subtitle1 text-center vw99 desktop-only">Account</h1>
    <!-- Avatar -->
    <div class="profile-avatar column items-center vw99">
      <q-avatar size="100px">
        <img :src="profilePhoto" alt="img" style="object-fit: cover" />
      </q-avatar>
      <div v-if="profile" class="text-subtitle1 text-center q-pt-sm">
        {{ profile.name }}
      </div>
      <div v-if="profile" class="email text-grey">{{ profile.email }}</div>
    </div>
    <div class="flex justify-center items-center vw99">
      <div class="q-mt-md account-tab">
        <q-list bordered class="bg-white rounded" style="border-radius: 10px">
          <div v-for="(menu, index) in menus" :key="index">
            <q-item @click="handleMenuClick(menu)" clickable>
              <q-item-section avatar>
                <q-icon color="primary" :name="menu.icon" />
              </q-item-section>

              <q-item-section>{{ menu.title }}</q-item-section>
            </q-item>
            <q-separator />
          </div>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth.store";
import { onMounted, ref, computed } from "vue";
import { useWishlistStore } from "../stores/wishlist.store";
import useMetaTags from "src/composables/useMetaTags";

useMetaTags({
  title: "Account",
});
const store = useWishlistStore();

const imageBaseURL = process.env.imagesBaseURL;
const router = useRouter();
const authStore = useAuthStore();
const profile = authStore.authUser;
onMounted(() => store.loadwishlistProducts());

const profilePhoto = computed(() => {
  if (profile && profile.photo)
    return (
      (!profile.photo.includes("http") ? imageBaseURL : "") + profile.photo
    );
  else if (authStore.firebaseUser && authStore.firebaseUser.photoURL)
    return authStore.firebaseUser.photoURL;
  else return `https://www.w3schools.com/w3images/avatar2.png`;
});

const menus = ref([
  {
    title: "Wishlist",
    icon: "favorite_border",
    to: "/wishlist",
  },
  {
    title: "My Products",
    icon: "add_circle",
    to: "/my_products",
  },
  {
    title: "Account Setting",
    icon: "settings",
    to: "/account_setting",
  },
  {
    title: "Suggestions",
    icon: "feedback",
    to: "/suggestion",
  },
  {
    title: "Donation",
    icon: "volunteer_activism",
    to: "/donation",
  },
  {
    title: "Terms",
    icon: "notifications_none",
    to: "https://1timeused.com/terms-conditions",
  },
  {
    title: "Privacy Policy",
    icon: "perm_contact_calendar",
    to: "https://1timeused.com/privacy-policy",
  },
  {
    title: "Rate the App",
    icon: "star",
    to: "https://play.google.com/store/apps/details?id=com.horizam.onetimeused",
  },
  {
    title: "About Us",
    icon: "man",
    to: "/about_us",
  },
  {
    title: `Sign ${authStore.authUser ? "Out" : "In"}`,
    icon: "logout",
    to: `/log${authStore.authUser ? "out" : "in"}`,
  },
]);

const openWindow = (url) => {
  window.open(url, "_blank");
};

const handleMenuClick = (menu) => {
  if (menu.to.includes("http")) {
    openWindow(menu.to);
  } else if (!profile && menu.to == "/account_setting") {
    menu.to = "/login";
  } else if (menu.to == "/logout") {
    authStore.logout();
  } else {
    router.push(menu.to);
  }
};
</script>

<style lang="scss" scoped>
.account-tab {
  width: 50%;
  // border: 1px solid red;
  // border-radius: 4px;
}

@media (max-width: $breakpoint-sm-max) {
  .account-tab {
    width: 100%;
  }
}
</style>
