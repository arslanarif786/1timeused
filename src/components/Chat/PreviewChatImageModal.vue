<template>
  <!-- <div class="relative-position">

    <div id="myModal" class="modal">
      <span class="close" @click="$emit('previewChatImageModal', true)"
        >&times;</span
      >
      <img class="modal-content" :src="imagePath" id="img01" />
    </div>
  </div> -->

  <div class="modal">
    <span class="close" @click="$emit('previewChatImageModal', true)"
      >&times;</span
    >
    <div class="absolute-center">
      <img :src="imagePath" id="img01" />
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  imagePath: String,
});

const { imagePath } = toRefs(props);
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 2001;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
}

img#img01 {
  max-height: 90vh;
  max-width: 90vw;
  object-fit: contain;
}

/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 20px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: 400;
  transition: 0.3s;
  z-index: 2002;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
</style>
