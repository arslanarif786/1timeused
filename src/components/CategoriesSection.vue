<template>
  <div class="conatiner">
    <div class="navbar flex justify-center">
      <div class="dropdown">
        <button
          class="dropbtn text-uppercase"
          v-for="category in categories"
          :key="category"
          @mouseenter="selectCategory(category)"
        >
          {{ category.title }}

          <q-icon name="expand_more" />
        </button>
        <div class="dropdown-content">
          <div class="row items-start q-gutter-md justify-center">
            <div
              class="col-md-2 col-12"
              v-for="(subCategory, index) in store.subCategories"
              :key="index"
            >
              <q-card
                class="my-card cursor-pointer"
                @click="subCategoryProduct(subCategory.id)"
              >
                <div class="img-holder">
                  <img
                    :src="imageBaseURL + subCategory.thumbnail"
                    alt="product"
                  />
                </div>

                <q-card-section style="padding: 0px">
                  <q-btn
                    color="primary"
                    :label="subCategory.title"
                    class="w-100"
                    size="sm"
                  />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <section class="flex justify-center items-center categories">
    <ul class="flex justify-center q-my-xs" style="width: 100%">
      <li v-for="category in categories" :key="category">
        <a href="#" :id="`catMenu_${category.id}`"
          >{{ category.title }}
          <q-icon name="expand_more" />

          <q-menu transition-show="scale" transition-hide="scale">
            <q-list style="min-width: 100px">
              <q-item
                clickable
                v-for="subcategory in category.subcategories"
                :key="subcategory.id"
              >
                <q-item-section
                  @click="subCategoryProduct(category.id, subcategory.id)"
                  >{{ subcategory.title }}</q-item-section
                >
              </q-item>

              <q-separator />
            </q-list>
          </q-menu>
        </a>
      </li>
    </ul>
  </section> -->
</template>

<script setup>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";

import { useCategoryStore } from "../stores/categories.store";

const store = useCategoryStore();

const imageBaseURL = process.env.imagesBaseURL;

onMounted(() => {
  store.loadCategories();
});

const selectCategory = (category) => {
  store.loadSubCategory(category.id);
};

const router = useRouter();
const categories = computed(() => store.categories);
const categoryStore = useCategoryStore();
const subCategoryProduct = (subcategoryID) => {
  // console.log("categoryID" + categoryID + "  Subcategory ID" + subcategoryID);
  // categoryStore.subCategories = categoryStore.categories.find(
  //   (cat) => cat.id == categoryID
  // ).subcategories;
  router.push(`/subcategory-product/${subcategoryID}`);
};
</script>

<style scoped lang="scss">
// .categories {
//   background: #fff;

//   ul {
//     li {
//       a {
//         padding: 5px 10px;
//         text-transform: uppercase;
//         letter-spacing: 0.05em;
//         color: #25262a;
//         font-size: 15px;
//         text-decoration: none !important;
//       }
//       a {
//         &:hover {
//           background: #b03254;
//           color: #fff;
//           transition: all 0.5s;
//         }
//       }
//       list-style: none;
//     }
//   }
// }

.navbar {
  overflow: hidden;
  background-color: #333;
  font-family: Arial, Helvetica, sans-serif;
}

.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font: inherit;
  margin: 0;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: 100%;
  max-width: 1450px;
  left: 0;
  padding: 20px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.my-card {
  width: 100%;
  max-width: 250px;
}

.img-holder {
  height: 150px;
  width: 100%;
}

.img-holder img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.dropbtn {
  &:hover {
    background-color: #ab2549;
    cursor: pointer;
  }
}
</style>
