<template>
  <div class="chat-container">
    <div class="container">
      <div class="chat-hight">
        <div class="row q-my-sm">
          <div
            v-if="chatStore.viewType === 'conversations' || $q.screen.gt.sm"
            class="col-md-3 col-12 bg-white rounded-10"
          >
            <ConversationsSection :conversations="chatStore.conversations" />
          </div>
          <div class="col-md-1"></div>
          <div
            v-if="chatStore.viewType != 'conversations' || $q.screen.gt.sm"
            class="
              col-md-8 col-12
              bg-white
              rounded-10
              chat-box
              relative-position
            "
          >
            <div class="scroll-div">
              <div class="q-pa-md row justify-center">
                <q-scroll-area
                  delay="300"
                  class="chat-scroller"
                  style="width: 100%"
                  :visible="false"
                >
                  <!-- <q-chat-message label="Sunday, 19th" /> -->

                  <q-spinner
                    v-if="chatStore.chatLoadingStatus"
                    color="primary"
                    size="3em"
                    class="absolute-center"
                  />

                  <div v-else>
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
                        message.attachmentType == 0
                          ? message.message
                          : `<img src='${message.message}' style='max-width:200px' />`,
                      ]"
                      :text-html="message.attachmentType != 0 ? true : false"
                      :sent="authStore.authUser.id == message.senderID"
                      :stamp="timeDiff(message.sentAt)"
                    />
                  </div>
                </q-scroll-area>
              </div>
            </div>
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useChatStore } from "src/stores/chat.store";
import { useAuthStore } from "src/stores/auth.store";
import useFirebaseAuth from "src/composables/useFirebaseAuth";
import ConversationsSection from "src/components/Chat/ConversationsSection.vue";
import ChatInput from "src/components/Chat/ChatInput.vue";
import { useRouter } from "vue-router";
import useChat from "src/composables/useChat";

const chatStore = useChatStore();
const authStore = useAuthStore();
const { loginAnonymously } = useFirebaseAuth();
const router = useRouter();
const { timeDiff } = useChat();

onMounted(() => {
  if (!authStore.authUser) {
    router.push("/login");
  }
  if (!authStore.isUserAuthenticatedOnFirebase) {
    loginAnonymously();
  }
  chatStore.lookForConversationChanges();
});

const getMember = (id) => {
  const user = chatStore.selectedConversation.membersInfo.find(
    (member) => member.id == id
  );
  if (!user) return user;

  user.photo = !user.photo
    ? authStore.defaultAvatar
    : (!user.photo.includes("http") ? process.env.imagesBaseURL : "") +
      user.photo;
  return user;
};
</script>
<style lang="scss" scoped>
.chat-box {
  position: relative;
}

.chat-box {
  height: 80vh;

  @media screen and (max-width: $breakpoint-sm-max) {
    height: 80vh;
    margin-top: 10px;
  }

  @media (max-width: 991.98px) {
    height: 86vh;
    .chat-scroller {
      height: 78vh;
    }
  }
  @media (max-width: 767.98px) {
    height: 82.5vh;
    .chat-scroller {
      height: 72vh;
    }
  }

  @media (max-width: 370px) and (max-height: 760px) {
    height: 81vh;
    .chat-scroller {
      height: 73vh;
    }
  }

  @media (max-width: 340px) and (max-height: 660px) {
    height: 79vh;
    .chat-scroller {
      height: 70vh;
    }
  }
}

.chat-scroller {
  height: 68vh;
}
</style>
