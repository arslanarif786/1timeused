<template>
  <q-footer bordered elevated class="bottom-nav">
    <q-tabs
      v-model="footerTab"
      indicator-color="white"
      dense
      active-color="white"
      no-caps
      class="bg-primary text-grey font-creepster"
      dark
    >
      <q-tab
        v-for="link in footerLinks"
        :key="link.title"
        :name="link.title"
        @click="$router.push(link.to)"
        :icon="link.icon"
        :label="link.title"
      />
    </q-tabs>
  </q-footer>
</template>

<script setup>
import { ref } from "vue";

const footerLinks = [
  {
    title: "Home",
    icon: "home",
    to: "/",
  },
  {
    title: "Category",
    icon: "category",
    to: "/category",
  },
  {
    title: "Products",
    icon: "add_circle",
    to: "/my_products",
  },
  {
    title: "Donate",
    icon: "emoji_events",
    to: "/donation",
  },
  {
    title: "Profile",
    icon: "person",
    to: "/account",
  },
];

const footerTab = ref("Home");
</script>

<style lang="scss">
.bottom-nav .q-tab__label {
  font-size: 10px;
}
</style>
