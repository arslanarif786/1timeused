import {
  store
} from 'quasar/wrappers'
import {
  createPinia
} from 'pinia'
import {
  markRaw
} from 'vue';

import route from 'src/router'
import {
  Cookies
} from 'quasar'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(({
  ssrContext
}) => {
  const pinia = createPinia()
  const router = route();
  pinia.use(({
    store
  }) => {
    const cookies = process.env.SERVER ?
      Cookies.parseSSR(ssrContext) :
      Cookies // otherwise we're on client

    store.$router = markRaw(router)
    store.$cookies = markRaw(cookies)
  });

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia
})
