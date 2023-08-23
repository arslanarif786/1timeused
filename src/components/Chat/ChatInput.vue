<template>
  <div
    class="write-message absolute-bottom w-100"
    :class="{ 'q-px-sm': $q.screen.gt.sm }"
  >
    <q-input
      dense
      rounded
      outlined
      v-model="messageValue"
      label="Write Message"
    >
      <template v-slot:prepend>
        <q-icon name="collections" class="cursor-pointer" />
      </template>
      <template v-slot:after>
        <q-btn round dense flat icon="mic" />
        <q-btn round dense flat icon="send" />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref } from "vue";
const messageValue = ref("");
</script>

<style lang="scss" scoped>
.write-message {
  z-index: 1;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #fff;
  @media (max-width: 991.98px) {
    padding: 0;
  }
}
</style>
