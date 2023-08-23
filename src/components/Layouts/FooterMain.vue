<template>
  <footer class="text-muted">
    <!-- Section: Links  -->

    <div class="container flex justify-center">
      <!-- Grid row -->
      <div class="row">
        <!-- Grid column -->
        <div class="col-3 mx-auto">
          <!-- Content -->
          <h6 class="text-uppercase fw-bold">
            <div class="q-mr-xl">
              <img
                src="https://1timeused.com/assets/img/logo/logo.png"
                style="width: 180px; padding: 5px"
              />
            </div>
          </h6>
          <p>
            On 1timeused app you are able to sell your old and new clothes,
            shoes, jewellery and any other accessories or equipments.
          </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-3 mx-auto">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold">Products</h6>
          <p>
            <a class="text-reset cursor-pointer" @click="$router.push('/')"
              >Home</a
            >
          </p>
          <p>
            <a
              class="text-reset cursor-pointer"
              @click="$router.push('/category')"
              >Category</a
            >
          </p>
          <p>
            <a
              class="text-reset cursor-pointer"
              @click="$router.push('/wishlist')"
              >Wishlist</a
            >
          </p>
          <p>
            <a
              class="text-reset cursor-pointer"
              @click="$router.push('/suggestion')"
              >Suggestion</a
            >
          </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-3 mx-auto">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold">Useful links</h6>
          <p>
            <a
              class="text-reset cursor-pointer"
              @click="$router.push('/my_products')"
              >My Products</a
            >
          </p>
          <p>
            <a
              class="text-reset cursor-pointer"
              @click="$router.push('/donation')"
              >Donate</a
            >
          </p>
          <p>
            <a
              class="text-reset cursor-pointer"
              @click="$router.push('/account')"
              >Profile</a
            >
          </p>
          <p>
            <a class="text-reset cursor-pointer">Help</a>
          </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-3 mx-auto mb-md-0">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold">Contact</h6>
          <p><q-icon name="home" /> Johar Town Lahore</p>
          <p>
            <q-icon name="email" />
            horizamtech@gmail.com
          </p>
          <p><q-icon name="call" />+ 01 234 567 88</p>
          <p><q-icon name="print" /> + 01 234 567 89</p>
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>

    <!-- Section: Links  -->

    <!-- Copyright -->
    <div
      class="text-center copy-right"
      style="background-color: rgba(0, 0, 0, 0.05)"
    >
      © 2022 Copyright:
      <a class="text-reset fw-bold">1timeused.com</a>
    </div>
    <!-- Copyright -->
  </footer>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
footer {
  background: #eceff1;
  background-image: url(../../../public/images/footerbg.png);
  background-position: center;

  h6 {
    margin: 20px 0;
  }
  a {
    text-decoration: none;
    color: #545c64;
  }
  p {
    color: #545c64;
  }
  .copy-right {
    padding: 15px;
  }
}
</style>
