import { onMounted, ref } from "vue";

export default function useChat() {
  const timeNow = ref(Date.now());
  const openedImage = ref(null);

  onMounted(() => {
    setInterval(() => {
      timeNow.value = Date.now();
    }, 5000);
  });

  const timeDiff = (time) => {
    const differenceinSeconds = (timeNow.value - time) / 1000;
    if (differenceinSeconds < 60) {
      return parseInt(differenceinSeconds) + "s ago";
    } else if (differenceinSeconds > 60 && differenceinSeconds < 3600) {
      return parseInt(differenceinSeconds / 60) + "m ago";
    } else if (differenceinSeconds > 3600 && differenceinSeconds < 86400) {
      return parseInt(differenceinSeconds / 3600) + "h ago";
    } else if (differenceinSeconds > 86400) {
      return parseInt(differenceinSeconds / 86400) + "d ago";
    }
  };

  const handleClick = (e) => {
    if (e.target.classList.contains("chat-img")) {
      openedImage.value = e.target.getAttribute("src");
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClick);
  });

  return {
    timeDiff,
    openedImage,
  };
}
