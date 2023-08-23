<template>
  <!-- Modal -->
  <q-dialog v-model="open">
    <q-card class="modal-card bg-grey-9">
      <q-card-section class="q-pa-xs">
        <div class="img-holder">
          <img :src="imagePath" alt="upload" class="fit" />
        </div>
      </q-card-section>

      <q-card-section class="q-pa-none" v-if="progress > 0">
        <q-linear-progress size="25px" :value="progress / 100" color="info">
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="info"
              :label="`${progress.toFixed(1)}%`"
            />
          </div>
        </q-linear-progress>
      </q-card-section>

      <q-card-actions align="center" class="q-gutter-md q-mb-sm">
        <q-btn
          size="sm"
          color="red"
          label="Cancel"
          icon="close"
          @click="$emit('closeImageUploadModal', true)"
        />

        <q-btn
          size="sm"
          @click="$emit('sendImage', true)"
          color="positive"
          label="Send"
          icon-right="send"
          :loading="progress > 0"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { toRefs, watch } from "vue";

const props = defineProps({
  imagePath: String,
  open: Boolean,
  progress: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["closeImageUploadModal"]);

const { imagePath, open, progress } = toRefs(props);

// close modal on image upload completion
watch(progress, (current) => {
  if (current > 99) {
    emit("closeImageUploadModal");
  }
});
</script>

<style lang="scss" scoped>
.img-holder {
  max-width: 100%;
  width: 310px;
  height: 310px;
}
.img-holder > img {
  object-fit: contain;
}
</style>
