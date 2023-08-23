<template>
  <div class="side-bar">
    <q-drawer
      v-model="chatStore.leftDrawerOpen"
      show-if-above
      bordered
      :breakpoint="600"
    >
      <q-toolbar class="bg-grey-3">
        <q-avatar class="cursor-pointer">
          <img :src="authStore.profilePhoto" />
        </q-avatar>

        <span class="q-ml-md">Conversations</span>

        <q-space />

        <q-btn round flat icon="more_vert">
          <q-menu auto-close :offset="[110, 8]">
            <q-list style="min-width: 150px">
              <q-item clickable>
                <q-item-section>Unread</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>All</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <!-- <q-btn
          round
          flat
          icon="close"
          class="WAL__drawer-close"
          @click="chatStore.leftDrawerOpen = !chatStore.leftDrawerOpen"
        /> -->
      </q-toolbar>

      <q-toolbar class="bg-grey-2">
        <q-input
          rounded
          outlined
          dense
          class="WAL__field full-width"
          bg-color="white"
          v-model="search"
          placeholder="Search User"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>

      <q-scroll-area style="height: calc(100% - 100px)">
        <ConversationLoadingSkeleton
          v-if="chatStore.conversationLoadingStatus"
        />
        <q-list v-else-if="conversations.length">
          <q-item
            v-for="conversation in conversations"
            :key="conversation.id"
            clickable
            @click="openConversation(conversation)"
            class="position-relative"
          >
            <q-item-section avatar>
              <q-avatar>
                <img :src="otherMember(conversation).photo" />
              </q-avatar>
              <!-- <q-badge
                rounded
                color="positive"
                label="new"
                class="chat-notifucation"
              /> -->
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                {{ otherMember(conversation).name }}
              </q-item-label>
              <q-item-label
                class="conversation__summary"
                :class="{
                  'text-weight-medium text-grey-9':
                    conversation.senderID != authStore.authUser.id &&
                    !conversation.read,
                }"
                caption
              >
                <q-icon
                  :name="conversation.read ? 'done_all' : 'check'"
                  :color="conversation.read ? 'blue' : 'grey-6'"
                  size="16px"
                />
                {{
                  conversation.senderID == authStore.authUser.id
                    ? "Me"
                    : otherMember(conversation).name.split(" ")[0]
                }}
                :
                {{
                  conversation.lastMessage
                    ? conversation.lastMessage.substring(0, 14)
                    : ""
                }}
                {{
                  conversation.read &&
                  conversation.lastMessage &&
                  conversation.lastMessage.length > 14
                    ? "..."
                    : ""
                }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label caption>
                {{ timeDiff(conversation.sentAt) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <span v-else class="absolute-center text-center text-subtitle2">
          No Conversation yet
        </span>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import { useChatStore } from "src/stores/chat.store";
import { useAuthStore } from "src/stores/auth.store";
import useChat from "src/composables/useChat";
import ConversationLoadingSkeleton from "src/components/Chat/ConversationLoadingSkeleton.vue";

const chatStore = useChatStore();
const authStore = useAuthStore();
const { timeDiff } = useChat();
const search = ref("");

const $q = useQuasar();

const style = computed(() => ({
  height: $q.screen.height + "px",
}));

const otherMember = (conversation) => {
  const user = conversation.membersInfo.find(
    (member) => authStore.authUser.id != member.id
  );
  user.photo = !user.photo
    ? authStore.defaultAvatar
    : (!user.photo.includes("http") ? process.env.imagesBaseURL : "") +
      user.photo;
  return user;
};

const openConversation = (conversation) => {
  chatStore.productMessageModel = null;
  chatStore.newConversationUser = null;
  if ($q.screen.lt.md) {
    chatStore.leftDrawerOpen = false;
  }
  chatStore.openSelectedConversation(conversation);
};

const conversations = computed(() => {
  if (!search.value?.trim()) {
    return chatStore.conversations;
  }

  return chatStore.conversations.filter((conversation) => {
    const otherMember = conversation.membersInfo.find(
      (member) => member.id != authStore.authUser.id
    );
    return otherMember.name.toLowerCase().includes(search.value.toLowerCase());
  });
});
</script>
<style>
.chat-notifucation {
  position: absolute;
  top: 5px;
  right: 10px;
}
@media (max-width: 768px) {
  .side-bar aside.q-drawer {
    width: 100% !important;
  }
}
</style>
