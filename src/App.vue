<template>
  <router-view />
</template>

<script>
import { useAuthStore } from "src/stores/auth.store";
export default {
  async preFetch({ store, currentRoute }) {
    const authStore = useAuthStore(store);
    authStore.loadAuthUser();
  },
};
</script>

<script setup></script>
