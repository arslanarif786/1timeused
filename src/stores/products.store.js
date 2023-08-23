import {
  defineStore
} from "pinia";

import {
  Notify
} from "quasar";

import {
  persistData,
  getPersistentData
} from "src/helpers/persistentHelper";
import API from "src/services/API";

export const useProductStore = defineStore("productsStore ", {
  state: () => ({
    recentProducts: [],
    featuredProducts: [],
    subCategoryProduct: [],
    myProducts: [],
    loadedProduct: null,
    searchProducts: [],
    donateProducts: [],
    btnStatus: 0,
    loadingStatus: false,
    featuredProductsLoader: false,
    recentProductsLoader: false,
    searchLoader: false,
    currentPage: 1,
    hasMorePages: false,
    featuredCurrentPage: 1,
    hasMoreFeaturedPages: false,
  }),

  getters: {},

  actions: {
    async loadRecentProducts() {
      if (this.recentProducts.length) {
        this.loadingStatus = false;
        return;
      }

      this.recentProductsLoader = true;
      const dataKey = "viewed_products";
      const viewedProducts = getPersistentData(dataKey, 1);
      if (viewedProducts) {
        this.recentProductsLoader = false;
        this.recentProducts = viewedProducts;
        return;
      }

      const response = await API.get("products/recentlyviewed");
      this.recentProductsLoader = false;
      if (response.status == 200) {
        this.recentProducts = response.data;
        persistData(dataKey, response.data);
      } else {
        console.log("Error in Recently viewed", response);
      }
    },

    async loadFeaturedProducts() {
      if (this.featuredProducts.length && this.featuredCurrentPage == 1) {
        return;
      }

      if (this.featuredCurrentPage == 1) {
        const featuredProductsResponse = getPersistentData("featured_products", 2);
        if (featuredProductsResponse) {
          this.featuredProducts = featuredProductsResponse.data;
          this.hasMoreFeaturedPages = featuredProductsResponse.links.next ? true : false;
          return;
        }
      }

      this.featuredProductsLoader = true;
      const response = await API.get(`products/featured?page=${this.featuredCurrentPage}`);
      this.featuredProductsLoader = false;
      if (response.status == 200) {
        this.featuredProducts = [...this.featuredProducts, ...response.data];
        this.featuredCurrentPage = response.meta.current_page;
        this.hasMoreFeaturedPages = response.links.next ? true : false;
        if (this.featuredCurrentPage == 1) {
          persistData("featured_products", response);
        }

      } else {
        console.log("Error in Featured", response);
      }
    },

    async loadSubCategoryProduct(id, sort = null, paginated = false) {
      if (this.currentPage == 1 || !paginated) {
        this.subCategoryProduct = [];
      }
      const userCurrentPosition = JSON.parse(localStorage.getItem('user_current_position'));
      const params = {};
      if (userCurrentPosition) {
        params.latitude = userCurrentPosition.latitude;
        params.longitude = userCurrentPosition.longitude;
      }
      if (sort) {
        params.sort = sort;
      }

      this.loadingStatus = true;
      const response = await API.get(`sub_categories/${id}/products`, params);
      this.loadingStatus = false;
      if (response.status == 200) {
        this.subCategoryProduct = [
          ...this.subCategoryProduct,
          ...response.data,
        ];
        this.currentPage = response.meta.current_page;
        this.hasMorePages = response.links.next ? true : false;
      } else {
        console.log("Error in Featured", response);
      }
    },

    async loadMyProducts() {
      if (this.myProducts.length) {
        return;
      }
      const myProducts = getPersistentData("my_products", 1);
      if (myProducts) {
        this.myProducts = myProducts;
        return;
      }
      this.loadingStatus = true;
      const response = await API.get("seller/products");
      this.loadingStatus = false;
      if (response.status == 200) {
        this.myProducts = response.data;
        persistData("my_products", response.data);
      } else {
        console.log("Error in My Products", response);
      }
    },

    async loadProductDetails(slug, screen = 'application') {
      this.loadingStatus = true;
      const response = await API.get(
        `products/${slug}?screen=${screen}`
      );
      this.loadingStatus = false;
      if (response.status == 200) {
        this.loadedProduct = response.data;
      }
      return response;
    },

    async loadSearchProduct(sort) {
      this.searchLoader = true;
      const response = await API.get(`search?sort=${sort}`);
      this.searchLoader = false;
      if (response.status == 200) {
        this.searchProducts = response.data;
      }
      return response;
    },

    async addMyProduct(product) {
      this.btnStatus = 1;
      const response = await API.formData("seller/products", product);
      this.btnStatus = 0;
      if (response.status == 200) {
        if (response.data.purpose == "Donate") {
          this.donateProducts.unshift(response.data);
        } else {
          this.myProducts.unshift(response.data);
        }
        Notify.create({
          message: "Product added successfully",
          icon: "done",
          position: "top-right",
          color: "positive",
        });
      } else {
        Notify.create({
          message: response.message,
          icon: "done",
          position: "top-right",
          color: "negative",
        });
      }
      return response;
    },
    async updateProduct(product) {
      console.log("iN store", product);
      this.btnStatus = 1;
      product._method = "PUT";
      const response = await API.formData(
        `seller/products/${product.id}`,
        product
      );
      this.btnStatus = 0;
      if (response.status == 200) {
        const index = this.myProducts.findIndex(
          (pro) => pro.id == response.data.id
        );
        this.myProducts[index] = response.data;
        Notify.create({
          message: "Product updated successfully",
          icon: "done",
          position: "top-right",
          color: "positive",
        });
      } else {
        Notify.create({
          message: response.message,
          icon: "done",
          position: "top-right",
          color: "negative",
        });
      }
      return response;
    },

    async loadDonateProducts(searchQuery = "") {
      if (this.donateProducts.length) return;
      this.loadingStatus = true;
      let path = "donateproducts";
      if (searchQuery) {
        path += `?q=${searchQuery}`;
      }

      const response = await API.get(path);
      this.loadingStatus = false;
      if (response.status == 200) {
        this.donateProducts = response.data;
      }
      return response;
    },

    async deleteAProduct(id) {
      const response = await API.delete(`seller/products/${id}`);
      if (response.status == 200) {
        this.myProducts = this.myProducts.filter((product) => product.id != id);
        Notify.create({
          message: response.message,
          icon: "done",
          position: "top-right",
          color: "positive",
        });
      } else {
        Notify.create({
          message: response.message,
          icon: "done",
          position: "top-right",
          color: "negative",
        });
      }
    },

    async productStatus(payload) {
      console.log("in store: ", payload);
      const response = await API.post("seller/product_status", payload);

      if (response.status === 200) {
        const index = this.myProducts.findIndex(
          (product) => product.id == payload.id
        );
        if (index > -1) {
          this.myProducts[index].status = payload.status;
        }
        persistData("my_products", this.myProducts);
        Notify.create({
          message: response.message,
          icon: "done",
          position: "top-right",
          color: "positive",
        });
      } else {
        Notify.create({
          message: response.message,
          icon: "done",
          position: "top-right",
          color: "negative",
        });
      }
      return response;
    },
  },
});
