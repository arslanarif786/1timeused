<template>
  <q-header
    elevated
    v-if="chatStore.selectedConversation || chatStore.newConversationUser"
  >
    <q-toolbar class="bg-grey-3 text-black">
      <q-btn
        round
        flat
        icon="keyboard_arrow_left"
        class="WAL__drawer-open q-mr-sm"
        @click="chatStore.leftDrawerOpen = !chatStore.leftDrawerOpen"
      />

      <q-btn round flat>
        <q-avatar>
          <img :src="chatMember.photo" />
        </q-avatar>
      </q-btn>

      <span
        @click="$router.push(`/seller_profile/${chatMember.id}`)"
        class="q-subtitle-1 q-pl-md cursor-pointer"
      >
        {{ chatMember.name }}
      </span>

      <q-space />

      <q-btn round flat icon="search" />

      <q-btn round flat icon="more_vert">
        <q-menu auto-close :offset="[110, 0]">
          <q-list style="min-width: 150px">
            <q-item clickable>
              <q-item-section>Contact data</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Block</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Select messages</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Silence</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Clear messages</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Erase messages</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useAuthStore } from "src/stores/auth.store";
import { useChatStore } from "src/stores/chat.store";
const chatStore = useChatStore();
const authStore = useAuthStore();

const chatMember = computed(() => {
  const user = chatStore.selectedConversation
    ? chatStore.selectedConversation.membersInfo.find(
        (user) => user.id != authStore.authUser.id
      )
    : chatStore.newConversationUser;

  user.photo = !user.photo
    ? authStore.defaultAvatar
    : (!user.photo.includes("http") ? process.env.imagesBaseURL : "") +
      user.photo;
  return user;
});
</script>
