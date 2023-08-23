<template>
  <div class="login-bg-img flex justify-center items-center">
    <div class="container">
      <q-form @submit="onSubmit" class="flex justify-center items-center">
        <div class="row q-pa-md flex justify-center">
          <div class="col-10 text-center">
            <h6>Reset Your Password</h6>
          </div>
          <div class="col-10">
            <q-input
              v-model="user.token"
              :dense="dense"
              label="Enter Verification Code"
              :rules="[rules.required]"
              class="q-mb-md"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <q-input
              v-model="user.password"
              :type="isPwd ? 'password' : 'text'"
              label="Enter Your Password"
              :rules="[rules.required, rules.password]"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="col-10">
            <q-input
              v-model="user.password_confirmation"
              :type="isPwd2 ? 'password' : 'text'"
              label="Confirm Your Password"
              :rules="[
                (val) =>
                  val.length >= 6 || 'Password must be atleast 6 characters',
                (val) => val == user.password || 'Password do not match',
              ]"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd2 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd2 = !isPwd2"
                />
              </template>
            </q-input>
          </div>
          <div class="col-10 q-my-lg">
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
import useValidationRules from "src/composables/useValidationRules";

const { rules } = useValidationRules();
const password = ref("");
const isPwd = ref(true);
const isPwd2 = ref(true);
const store = useAuthStore();
const user = ref({
  token: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const onSubmit = () => {
  store.resetPassword(user.value);
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
