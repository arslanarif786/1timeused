<template>
  <div class="login-bg-img flex justify-center items-center">
    <div class="container">
      <q-form @submit="onSubmit" class="flex justify-center items-center">
        <div class="row q-pa-md">
          <div class="col-12 text-center">
            <h6>Reset Your Password</h6>
          </div>
          <div class="col-12">
            <q-input
              v-model="user.email"
              :dense="dense"
              label="Enter Your Email"
              class="q-mb-md"
              :rules="[rules.required, rules.email]"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <p
            class="text-primary cursor-pointer"
            @click="$router.push('/login')"
          >
            <q-icon name="keyboard_backspace" size="sm" /> Back to login
          </p>
          <div class="w-100 q-my-lg">
            <div class="text-center q-mb-lg">
              <q-btn
                color="primary"
                type="submit"
                label="Reset Password"
                class="w-100"
              />
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth.store";
import { useRouter } from "vue-router";
import useValidationRules from "src/composables/useValidationRules";

const { rules } = useValidationRules();
const router = useRouter();
const store = useAuthStore();
const user = ref({
  email: "",
});

const onSubmit = () => {
  store.forgot({ email: user.value.email }).then((response) => {
    if (response.status == 200) {
      router.push("/reset_password");
    }
  });
};
</script>

<style lang="scss" scoped>
.account-tab {
  width: 50%;
}
.login-bg-img {
  background-image: url(../../public/images/img_login.jpg);
  height: 100vh;
}

.text-underline {
  text-decoration: underline;
}

@media (max-width: $breakpoint-sm-max) {
  .account-tab {
    width: 100%;
  }
}
</style>
