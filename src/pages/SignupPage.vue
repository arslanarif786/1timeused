<template>
  <div class="login-bg-img flex justify-center items-center">
    <div class="container q-py-lg">
      <div class="column items-center w-100">
        <div>
          <img src="../../public/images/img_splash_logo.png" width="200" />
        </div>

        <q-form
          @submit="onSubmit"
          class="flex justify-center items-center w-100"
        >
          <div class="row q-pa-md account-tab">
            <div class="col-12">
              <q-input
                v-model="credentials.name"
                :dense="dense"
                label="Name"
                class="q-mb-md"
                :rules="[
                  (val) =>
                    val.length >= 3 || 'Name must be atleast 3 characters',
                ]"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>

            <div class="col-12">
              <q-input
                v-model="credentials.email"
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

            <div class="col-4">
              <q-select
                v-model="countryCode"
                :options="options"
                :options-html="optionsHtml"
              >
                <template v-slot:prepend>
                  <img
                    class="q-mr-1"
                    src="https://flagicons.lipis.dev/flags/4x3/pk.svg"
                    width="20"
                  />
                </template>
              </q-select>
            </div>
            <div class="col-1"></div>
            <div class="col-7">
              <q-input
                v-model="credentials.phone"
                :dense="dense"
                :label="!credentials.phone ? `301-12345678` : ''"
                class="q-mb-md"
                maxlength="10"
                @keyup="validatePhone"
                type="text"
                :rules="[
                  rules.required,
                  (val) =>
                    val.substring(0, 1) == 3 || 'Number must start from 3',
                  (val) => val.length == 10 || 'Number must be 10 characters',
                ]"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>
            </div>

            <div class="col-12">
              <q-input
                v-model="credentials.password"
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
            <div class="col-12">
              <q-input
                v-model="credentials.password_confirmation"
                :type="isPwd2 ? 'password' : 'text'"
                label="Confirm Your Password"
                :rules="[
                  (val) =>
                    val.length >= 6 || 'Password must be atleast 6 characters',
                  (val) =>
                    val == credentials.password || 'Password do not match',
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
            <div class="w-100 q-my-lg">
              <div class="text-center q-mb-lg">
                <q-btn
                  color="primary"
                  type="submit"
                  label="Signup"
                  class="w-100"
                />
              </div>

              <div class="register text-center">
                <p class="text-primary">Already have an account?</p>
                <q-btn
                  flat
                  color="primary"
                  label="Sign in Now"
                  class="text-underline"
                  @click="$router.push('/login')"
                />
              </div>

              <div class="copyrights text-center">
                <p class="text-grey">
                  All rights reserved by
                  <a href="#" class="underline-none">1timeused</a><br />
                  powered by <a href="#" class="underline-none">HORIZAM</a>
                </p>
              </div>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth.store";
import { ref } from "vue";
import useValidationRules from "src/composables/useValidationRules";

const { rules } = useValidationRules();
const countryCode = ref("+92");
const optionsHtml = ref("+92");
const store = useAuthStore();
const password = ref("");
const isPwd = ref(true);
const isPwd2 = ref(true);

const credentials = ref({
  name: "",
  email: "",
  phone: "",
  password: "",
  password_confirmation: "",
  fcm_token: "xjjxjjxjjx",
});

const validatePhone = () => {
  if (
    credentials.value.phone.length <= 1 &&
    credentials.value.phone.substring(0, 1) != 3
  ) {
    credentials.value.phone = "3";
  } else {
    credentials.value.phone = credentials.value.phone.replace(/[^0-9]/g, "");
  }
};

const onSubmit = () => {
  store.register(credentials.value);
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

.underline-none {
  text-decoration: none;
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
