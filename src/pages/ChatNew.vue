<template>
  <PreviewChatImageModal
    :imagePath="openedImage"
    v-if="openedImage"
    @previewChatImageModal="openedImage = null"
  />
  <div class="container">
    <div class="WAL position-relative">
      <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
        <ChatHeader v-if="$q.screen.gt.sm" />
        <ConversationsList />

        <q-page-container class="bg-grey-2">
          <div class="q-pa-md row justify-center items-center">
            <div style="width: 100%">
              <!-- <q-chat-message label="Sunday, 19th" /> -->

              <ChatLoadingSkeleton v-if="chatStore.chatLoadingStatus" />

              <div v-else id="messages-main-div">
                <q-chat-message
                  v-for="message in chatStore.messages"
                  :key="message.id"
                  :name="
                    authStore.authUser.id == message.senderID
                      ? 'Me'
                      : getMember(message.senderID).name
                  "
                  :avatar="
                    authStore.authUser.id == message.senderID
                      ? authStore.profilePhoto
                      : getMember(message.senderID).photo
                  "
                  :text="[
                    message.attachmentType == 0 && !message.productMessageModel
                      ? message.message
                      : message.attachmentType
                      ? `<div> <img class='chat-img cursor-pointer' src='${message.message}' style='max-width:200px' /> </div>`
                      : relatedProductDesign(message),
                  ]"
                  :text-html="
                    message.attachmentType != 0 || message.productMessageModel
                      ? true
                      : false
                  "
                  :sent="authStore.authUser.id == message.senderID"
                  :stamp="timeDiff(message.sentAt)"
                  :bg-color="
                    authStore.authUser.id == message.senderID
                      ? 'green-5'
                      : 'grey-4'
                  "
                  :text-color="
                    authStore.authUser.id == message.senderID
                      ? 'black'
                      : 'black'
                  "
                />

                <q-btn
                  v-if="chatStore.showScrollButton"
                  @click="scrollToBottom"
                  class="fixed-bottom q-mx-auto"
                  fab
                  style="max-width: 40px; bottom: 55px; z-index: 1"
                  icon="arrow_downward"
                  color="accent"
                />
                <!-- <ImagePreview /> -->
              </div>
            </div>
          </div>
          <div
            class="desktop-only flex justify-center items-center column"
            v-if="
              !chatStore.selectedConversation && !chatStore.newConversationUser
            "
          >
            <img src="../../public/images/chat.svg" alt="chat" width="30%" />

            <div class="text-h6 q-py-md text-grey column">
              Select a chat to view conversation
            </div>
          </div>
        </q-page-container>

        <ChatFooter
          v-if="chatStore.selectedConversation || chatStore.newConversationUser"
        />
      </q-layout>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import ConversationsList from "src/components/Chat/ConversationsList.vue";
import ChatLoadingSkeleton from "src/components/Chat/ChatLoadingSkeleton.vue";
import ImagePreview from "src/components/Chat/ImagePreview.vue";
import PreviewChatImageModal from "src/components/Chat/PreviewChatImageModal.vue";

import ChatHeader from "src/components/Chat/ChatHeader.vue";
import ChatFooter from "src/components/Chat/ChatFooter.vue";
import { useChatStore } from "src/stores/chat.store";
import { useAuthStore } from "src/stores/auth.store";
import useFirebaseAuth from "src/composables/useFirebaseAuth";
import { useRouter, useRoute } from "vue-router";
import useChat from "src/composables/useChat";
import { useQuasar } from "quasar";
import useMetaTags from "src/composables/useMetaTags";

const chatStore = useChatStore();
const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();
const { timeDiff, openedImage } = useChat();

const { loginAnonymously } = useFirebaseAuth();

const message = ref("");
const $q = useQuasar();

useMetaTags({
  title: "Chat",
});
onMounted(() => {
  if (!authStore.authUser) {
    router.push(
      router.options.history.state.back == "/login" ||
        router.options.history.state.forward == "/login"
        ? router.options.history.state.back
        : "/login"
    );
  }
  if (!authStore.isUserAuthenticatedOnFirebase) {
    loginAnonymously();
  }
  chatStore.lookForConversationChanges();
  chatStore.paramsSellerId = route.params.id ? parseInt(route.params.id) : null;

  if (
    $q.screen.lt.sm &&
    chatStore.paramsSellerId &&
    (chatStore.newConversationUser || chatStore.selectedConversation)
  ) {
    chatStore.leftDrawerOpen = false;
  }
});

onBeforeUnmount(() => {
  chatStore.leftDrawerOpen = true;
  chatStore.newConversationUser = null;
  chatStore.selectedConversation = null;
  chatStore.messages = [];
});

const getMember = (id) => {
  const user = chatStore.newConversationUser
    ? chatStore.newConversationUser
    : chatStore.selectedConversation.membersInfo.find(
        (member) => member.id == id
      );
  if (!user) return user;

  user.photo = !user.photo
    ? authStore.defaultAvatar
    : (!user.photo.includes("http") ? process.env.imagesBaseURL : "") +
      user.photo;
  return user;
};

const scrollToBottom = () => {
  console.log("tes");
  chatStore.scrollToBottom();
};

const relatedProductDesign = (message) => {
  const product = message.productMessageModel;
  const productImage = product.productImage.includes("http")
    ? product.productImage
    : process.env.imagesBaseURL + product.productImage;

  return `
  <div style="max-width:210px">
  <div class="column">
    <span class="q-mb-md">${sanitizeHTML(message.message)}</span>
    <span style="font-size:0.6rem; margin-bottom:2px">This message is related to:</span>
  </div>
    <div class="row items-center">
        <div class="col-5">
              <img class="rounded-borders fit" style="max-width:110px"
                src="${productImage}"
                />
        </div>
        <div class="col-7">
          <div class="text-h6 text-center" style="font-size: 12px; line-height:1rem">${
            product.productName
          }</div>
        </div>
  </div>
  </div>
  `;
};

function sanitizeHTML(text) {
  var element = document.createElement("div");
  element.innerText = text;
  return element.innerHTML;
}
</script>

<style lang="scss" scoped>
@media (max-width: $breakpoint-xs-max) {
  .container {
    padding: 0 !important;
  }
}

.WAL {
  height: calc(100vh - 100px);
  padding-bottom: 10px;
  background: #f5f5f5 !important;
}
.desktop-only {
  height: calc(100vh - 150px);
}
.text-h6 {
  font-size: 16px;
}

@media (max-width: 768px) {
  .WAL {
    height: calc(100vh - 60px);
    padding-bottom: 0;
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
