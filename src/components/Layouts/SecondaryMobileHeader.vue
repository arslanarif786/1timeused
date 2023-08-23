<template>
  <div class="bg-white">
    <div
      class="container bg-primary row border-bottom items-center"
      style="height: 60px; width: 100%"
    >
      <q-icon
        @click="
          $route.path == '/chat' && !chatStore.leftDrawerOpen && $q.screen.lt.md
            ? (chatStore.leftDrawerOpen = true)
            : $router.back()
        "
        name="keyboard_backspace"
        size="sm"
        color="white"
        class="absolute"
      />

      <div
        class="q-ml-xl"
        v-if="
          $route.path.includes('/chat') &&
          !chatStore.leftDrawerOpen &&
          $q.screen.lt.md
        "
      >
        <q-avatar class="q-mr-sm" size="40px">
          <img :src="chatMember.photo" />
        </q-avatar>
        <span
          @click="$router.push(`/seller_profile/${chatMember.id}`)"
          class="text-white cursor-pointer"
          style="font-size: 0.9rem"
          >{{ chatMember.name }}</span
        >
      </div>

      <span
        v-else
        class="text-weight-reguler text-h6 text-white q-mx-auto"
        style="text-transform: capitalize; font-size: 0.9rem"
        >{{
          $route.path.includes("/category/")
            ? $route.params.name ||
              $route.params.slug.replace("_", " ").replace("-", " ")
            : $route.path.split("/")[1].replace("_", " ").replace("-", " ")
        }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from "src/stores/chat.store";
import { useAuthStore } from "src/stores/auth.store";
import { computed } from "@vue/runtime-core";

const chatStore = useChatStore();
const authStore = useAuthStore();

const chatMember = computed(() => {
  const user = chatStore.newConversationUser
    ? chatStore.newConversationUser
    : chatStore.selectedConversation.membersInfo.find(
        (user) => user.id != authStore.authUser.id
      );

  user.photo = !user.photo
    ? authStore.defaultAvatar
    : (!user.photo.includes("http") ? process.env.imagesBaseURL : "") +
      user.photo;
  return user;
});
</script>

<style lang="scss" scoped></style>
