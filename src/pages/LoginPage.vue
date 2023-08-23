<template>
  <div class="login-bg-img flex justify-center items-center">
    <div class="container q-py-lg">
      <div class="column items-center w-100">
        <div>
          <img
            @click="$router.push('/')"
            src="../../public/images/img_splash_logo.png"
            width="200"
          />
        </div>
        <q-form
          ref="loginForm"
          @submit.prevent="onSubmit"
          class="flex justify-center items-center w-100"
          greedy
        >
          <div class="q-pa-md account-tab">
            <q-input
              v-model="credentials.email"
              label="Enter Your Email"
              class="q-mb-md"
              :rules="[rules.required, rules.email]"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

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

            <div class="w-100 q-my-lg">
              <div class="flex justify-between items-center">
                <q-btn type="submit" color="primary" glossy label="Login" />

                <q-btn
                  flat
                  color="primary"
                  label="Forgot Password ?"
                  @click="$router.push('/forgot')"
                />
              </div>

              <p class="text-center q-py-md text-grey">Or Login With</p>
              <div class="text-center q-mb-lg">
                <q-btn
                  :disable="store.checkingForRedirectionResult"
                  color="blue"
                  icon-right="facebook"
                  label="login with facebook"
                  @click="loginWithFacebook"
                />
              </div>
              <div class="text-center q-mb-lg">
                <q-btn
                  :disable="store.checkingForRedirectionResult"
                  label="login with Google"
                  @click="loginWithGoogle"
                >
                  <img
                    src="../../public/icons/google-color.svg"
                    alt="google "
                    width="20"
                    class="q-mx-md"
                  />
                </q-btn>
              </div>

              <div class="register text-center">
                <q-btn
                  flat
                  color="primary"
                  label="Register With Email"
                  @click="$router.push('/signup')"
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
import { onMounted, ref } from "vue";
import useValidationRules from "src/composables/useValidationRules";
import { useAuthStore } from "src/stores/auth.store";
import useFirebaseAuth from "src/composables/useFirebaseAuth";
import { useRouter } from "vue-router";
import useMetaTags from "src/composables/useMetaTags";

const store = useAuthStore();
const router = useRouter();
const appURL = ref(process.env.appURL);
const { rules } = useValidationRules();

useMetaTags({
  title: "Login",
});

const { loginWithGoogle, loginWithFacebook, getFirebaseAuthRedirectResult } =
  useFirebaseAuth();

const password = ref("");
const isPwd = ref(true);
const credentials = ref({
  email: "",
  password: null,
});

getFirebaseAuthRedirectResult();

onMounted(() => {
  appURL.value = `https://${location.host}/`;
});

const onSubmit = () => {
  store.login(credentials.value).then((response) => {
    if (response.status == 200) {
      router.push("/");
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

.underline-none {
  text-decoration: none;
}

@media (max-width: $breakpoint-sm-max) {
  .account-tab {
    width: 100%;
  }
}
</style>
