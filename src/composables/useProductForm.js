import {
  ref,
  watch,
  computed,
  onMounted
} from "vue";
import compressImage from "./useImageCompression";
import {
  useRouter,
  useRoute
} from "vue-router";
import {
  useProductStore
} from "src/stores/products.store";
import {
  useCategoryStore
} from "../stores/categories.store";
import API from "src/services/API";

export default function useProductForm() {
  const router = useRouter();
  const route = useRoute();
  const productStore = useProductStore();
  const productForm = ref(null);
  const categoryStore = useCategoryStore();
  const stepper = ref("");
  const actionType = ref("add");


  const product = ref({
    title: "Cloths",
    category_id: "",
    neighborhood: "",
    sub_category_id: "",
    price: "5000",
    color: "All",
    purchase_price: 0,
    discount: 0,
    color: '',
    meta_tag: '',
    current_stock: 1,
    description: "This is a Good Quality Product and up to 50% off on Every Item",
    images: [],
    condition: "used",
    latitude: '',
    longitude: '',
    discountTil: "",
    brand: "Gul Ahmad",
    size: "6 Meters",
    purpose: "Rental",
  });

  const productError = ref({
    images: null,
    Location: null
  });

  onMounted(async () => {
    categoryStore.loadCategories();

    if (route.params.id) {
      const response = await API.get(`products/${route.params.id}`);
      if (response.status == 200) {
        product.value = response.data
        product.value.images = [];
        actionType.value = "edit";
        categoryStore.loadSubCategory(product.value.category_id);
      }
    }
  });

  watch(product.value, (current) => {
    if (actionType.value == 'edit') {
      productError.value.images = null;
      if (!current.latitude || !current.longitude) {
        productError.value.Location = "Select location from given Locations"
      } else {
        productError.value.Location = null
      }
    } else {
      if (!current.images.length) {
        productError.value.images = "At least one image must be uploaded";
      } else {
        productError.value.images = null;
      }
      if (!current.latitude || !current.longitude) {
        productError.value.Location = "Select location from given Locations"
      } else {
        productError.value.Location = null
      }
    }
  });


  const goToNextStep = () => {
    productForm.value.validate().then((success) => {
      if (success && (product.value.images.length || product.value.gallery.length)) {
        stepper.value.next();
      }
    });
  };

  const loadSubCategory = () => {
    categoryStore.loadSubCategory(product.value.category_id);
    product.value.sub_category_id = "";
  };


  const submitForm = async () => {
    console.log(product.value)
    if (product.value.purpose == 'Donate') {
      product.value.price = 0
    }
    let response;
    if (actionType.value == 'edit') {
      response = await productStore.updateProduct(product.value);
    } else {
      response = await productStore.addMyProduct(product.value);
    }

    if (response.status == 200) {
      if (response.data.purpose == "Donate") {
        router.push({ path: "/donation" });
      } else {
        router.push({ path: "/my_products" });
      }

    }
  };

  const setFiles = async (files) => {
    const compressedImages = [];

    for (let i = 0; i < files.length && i < 10; i++) {
      compressedImages[i] = await compressImage(files[i]);
    }
    for (let i = 0; i < compressedImages.length && i < 10; i++) {
      product.value.images.push(compressedImages[i]);
    }

  };
  const removeOldImage = (index, imageId) => {
    console.log(index, imageId);
    product.value.gallery.splice(index, 1)
    API.delete(`seller/products/gallery/${imageId}`)
  };


  return {
    productForm,
    product,
    productError,
    formValidated: computed(() => productForm.value && productForm.value.validate()),
    goToNextStep,
    loadSubCategory,
    submitForm,
    setFiles,
    stepper,
    actionType,
    removeOldImage
  }
}
