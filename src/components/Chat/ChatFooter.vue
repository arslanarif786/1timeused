<template>
  <q-footer
    v-if="chatStore.selectedConversation || chatStore.newConversationUser"
  >
    <q-toolbar class="bg-grey-3 text-black row q-px-none">
      <input
        type="file"
        ref="mediaInput"
        style="display: none"
        @change="selectMedia"
        accept=".png,.jpg,.Jpg,jpeg"
      />
      <q-btn
        round
        flat
        icon="collections"
        class="q-mr-sm"
        @click="$refs.mediaInput.click()"
      />
      <q-input
        rounded
        outlined
        dense
        class="WAL__field col-grow q-mr-sm"
        bg-color="white"
        v-model="chatStore.messageInput[chatMember.id]"
        placeholder="Type a message"
        @keyup.enter="sendMessage"
      />
      <!-- <q-btn round flat icon="mic" /> -->
      <q-btn @click="sendMessage" round flat icon="send" />
    </q-toolbar>
    <ImageUploadPreviewModal
      :imagePath="imageBase64"
      :open="imageUploadPreviewModal"
      @closeImageUploadModal="closeImageUploadModal"
      @sendImage="sendImage"
      :progress="uploadProgress"
    />
  </q-footer>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth.store";
import { useChatStore } from "src/stores/chat.store";
import compressImage from "src/composables/useImageCompression";
import { computed, ref, watch } from "vue";
import ImageUploadPreviewModal from "./ImageUploadPreviewModal.vue";
import useFirebaseStorage from "src/composables/useFirebaseStorage";
const chatFile = ref(null);
const imageUploadPreviewModal = ref(false);
const imageBase64 = ref(null);
const mediaInput = ref();

const chatStore = useChatStore();
const authStore = useAuthStore();

const sendMessage = async () => {
  if (!chatStore.messageInput[chatMember.value.id]?.trim()) {
    return;
  }

  await chatStore.sendMessage({
    message: chatStore.messageInput[chatMember.value.id],
    attachmentType: 0,
    senderID: authStore.authUser.id,
  });

  chatStore.messageInput[chatMember.value.id] = "";
};

async function selectMedia(e) {
  const file = e.target.files[0];
  convertFileToBase64(file);
  chatFile.value = await compressImage(file);
  imageUploadPreviewModal.value = true;
}

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

const convertFileToBase64 = (file) => {
  const reader = new FileReader();
  reader.onloadend = function () {
    imageBase64.value = reader.result;
    //console.log(imageBase64.value);
  };
  reader.readAsDataURL(file);
};

const closeImageUploadModal = () => {
  imageUploadPreviewModal.value = false;
  imageBase64.value = null;
  chatFile.value = null;
  mediaInput.value.value = "";
};

const { uploadFileToFirebaseStorage, uploadProgress } = useFirebaseStorage();

const sendImage = () => {
  uploadFileToFirebaseStorage(chatFile.value);
};
</script>
