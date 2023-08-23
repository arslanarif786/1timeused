<template>
  <div class="scroll-div">
    <div
      v-for="conversation in conversations"
      :key="conversation.id"
      @click="openConversation(conversation)"
      class="user q-pa-sm flex cursor-pointer items-center border-bottom"
      :class="{
        ' bg-grey-3':
          chatStore.selectedConversation &&
          chatStore.selectedConversation.id == conversation.id,
      }"
    >
      <q-avatar class="q-mr-md">
        <img
          :src="otherMember(conversation).photo"
          referrerpolicy="no-referrer"
        />
      </q-avatar>
      <div class="col">
        <div class="row items-center justify-between">
          <div class="text-h6 ellipsis">
            {{ otherMember(conversation).name }}
          </div>

          <div class="text-caption">{{ timeDiff(conversation.sentAt) }}</div>
        </div>

        <span class="text-caption ellipsis"
          >{{
            conversation.senderID == authStore.authUser.id
              ? "Me"
              : otherMember(conversation).name.split(" ")[0]
          }}
          : {{ conversation.lastMessage.substring(0, 25) }}
          {{ conversation.lastMessage.length > 25 ? "..." : "" }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth.store";
import { useChatStore } from "src/stores/chat.store";
import useChat from "src/composables/useChat";
import { toRefs } from "vue";
const imageBaseURL = process.env.imagesBaseURL;
const props = defineProps({
  conversations: Array,
});
const { conversations } = toRefs(props);
const authStore = useAuthStore();
const chatStore = useChatStore();
const { timeDiff } = useChat();

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
  console.log(conversation);
  chatStore.viewType = "chat";
  chatStore.openSelectedConversation(conversation);
};
</script>

<style lang="scss" scoped>
.scroll-div {
  height: 80vh;
  overflow: auto;
}
.scroll-div::-webkit-scrollbar {
  width: 5px;
}

.scroll-div::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 10px;
}
.text-h6 {
  font-size: 14px;
}
.users {
  &:hover {
    background: #eeeeee !important;
  }
}
</style>
