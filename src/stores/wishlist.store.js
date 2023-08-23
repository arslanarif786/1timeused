import {
  defineStore
} from 'pinia'
import {
  Notify
} from 'quasar'
import {
  persistData,
  getPersistentData
} from 'src/helpers/persistentHelper'
import API from 'src/services/API'
import {
  useProductStore
} from '../stores/products.store'
import {
  useSellerStore
} from '../stores/seller.store'
import {
  ref
} from 'vue'


const sellerStore = useSellerStore()

const toggleFavorite = (productID, products) => {
  console.log(productID)
  console.log(products)
  const index = products.findIndex(product => product.id == productID);
  if (index == -1) {
    return products;
  }

  products[index].favorite = products[index].favorite == 1 ? 0 : 1;
  return products;
}

export const useWishlistStore = defineStore("wishlistStore", {

  state: () => ({
    wishlistProducts: [],
    wishlistLoader: 0
  }),

  getters: {
    getWishlistLoader: (state => state.wishlistLoader)
  },

  actions: {

    async addWishlist(product) {
      const product_id = product.id;
      this.wishlistLoader = product_id
      const store = useProductStore()
      const response = await API.post("wishlist", {
        product_id
      })
      if (response.status == 200) {
        this.wishlistLoader = 0
        Notify.create({
          message: response.message,
          icon: 'done',
          position: 'top-right',
          color: 'positive',
        })
        store.recentProducts = toggleFavorite(product_id, store.recentProducts)
        store.donateProducts = toggleFavorite(product_id, store.donateProducts)
        store.featuredProducts = toggleFavorite(product_id, store.featuredProducts)
        store.subCategoryProduct = toggleFavorite(product_id, store.subCategoryProduct)
        store.searchProducts = toggleFavorite(product_id, store.searchProducts)
        sellerStore.sellerProducts = toggleFavorite(product_id, sellerStore.sellerProducts)


        if (store.loadedProduct && store.loadedProduct.related_products) {
          store.loadedProduct.related_products = toggleFavorite(product_id, store.loadedProduct.related_products)
        }

        if (store.loadedProduct && store.loadedProduct.id == product_id) {
          store.loadedProduct.favorite = store.loadedProduct.favorite == 1 ? 0 : 1;
        }
        if (response.message.includes('removed')) {
          this.wishlistProducts = this.wishlistProducts.filter(pro => pro.id != product_id)
        } else {
          this.wishlistProducts.unshift(product);
        }

        persistData('wishlist_products', this.wishlistProducts);
        if (store.recentProducts.length) {
          persistData('viewed_products', store.recentProducts);
        }
        if (store.featuredProducts.length) {
          persistData('featured_products', store.featuredProducts);
        }


      }

    },

    async loadwishlistProducts() {
      if (this.wishlistProducts.length) {
        return;
      }

      const wishlistProducts = getPersistentData('wishlist_products', 2);
      if (wishlistProducts) {
        this.wishlistProducts = wishlistProducts;
        return;
      }

      const response = await API.get('wishlist');
      if (response.status == 200) {
        this.wishlistProducts = response.data;
        persistData('wishlist_products', response.data);
      }
    },
  }
})
