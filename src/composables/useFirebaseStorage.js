import {
  getDownloadURL,
  getStorage,
  ref as firebaseRef,
  uploadBytesResumable,
} from "firebase/storage";
import { ref } from "vue";
import { useChatStore } from "src/stores/chat.store";

export default function useFirebaseStorage() {
  const chatStore = useChatStore();
  const uploadProgress = ref(0);
  const uploadFileToFirebaseStorage = (file, type = "chat-image") => {
    // Create a root references
    const storage = getStorage();

    const storageRef = firebaseRef(
      storage,
      `test/images/${
        chatStore.selectedConversation.id
      }/${Date.now()}${file.name.substring(0, 5)}.${file.name.split(".").pop()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadProgress.value = progress;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          chatStore.sendMessage({
            message: downloadURL,
            attachmentType: 1,
          });
          setTimeout(() => {
            uploadProgress.value = 0;
          }, 200);

          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return {
    uploadFileToFirebaseStorage,
    uploadProgress,
  };
}
