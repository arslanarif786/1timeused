import API from "src/services/API";
import {
  onBeforeUnmount,
  onMounted,
  reactive,
  ref
} from "vue";
import {
  useProductStore
} from 'src/stores/products.store'
import {
  useRoute
} from "vue-router";
const store = useProductStore();

export default function useSearch() {

  let hasMorePages = false;
  let currentPage = 1;
  let lastApiCallTime = Date.now();
  const search = ref("");
  const route = useRoute();
  const searchSuggestions = ref();
  const searchInput = ref();
  let searchVal = '';
  const get_location = reactive({
    neighborhood: "",
    latitude: "",
    longitude: "",
  });

  const getLocalSearchHistory = () => {
    const localHistory = localStorage.getItem('local_search_history');
    return localHistory ? JSON.parse(localHistory) : [];
  }

  const addToLocalSearchHistory = (query) => {
    if (!query || query.length < 3) {
      return;
    }
    let localHistory = getLocalSearchHistory();
    const index = localHistory.findIndex(val => val == query);
    if (index > -1) {
      localHistory.splice(index, 1);
    }
    localHistory.unshift(query);
    localHistory = localHistory.slice(0, 10);
    localStorage.setItem('local_search_history', JSON.stringify(localHistory))
  }


  const getSearchSuggestions = async (val, update, abort) => {
    searchVal = val;

    update(async () => {
      if (val) {
        const response = await API.get(`searchSuggestions?q=${val}`)
        searchSuggestions.value = response.data.map(search => search.keyword);
      } else {
        searchSuggestions.value = getLocalSearchHistory();
      }
    });
  }

  const searchProducts = async (paginated = false) => {
    searchInput.value.hidePopup();
    document.querySelector('#q-app').click();
    if (currentPage == 1 || !paginated) {
      store.searchProducts = [];
    }
    store.loadingStatus = true;
    const query = search.value || searchVal;

    const userCurrentPosition = JSON.parse(localStorage.getItem('user_current_position'));
    let latLng = '';

    if (get_location) {
      latLng = `&latitude=${get_location.latitude}&longitude=${get_location.longitude}`;
    } else if (userCurrentPosition) {
      latLng = `&latitude=${userCurrentPosition.latitude}&longitude=${userCurrentPosition.longitude}`;
    }

    const response = await API.get(`search?q=${query}&page=${currentPage}${latLng}`);
    store.loadingStatus = false;
    store.searchProducts = [...store.searchProducts, ...response.data];
    console.log(response)
    hasMorePages = response.links.next ? true : false;
    currentPage = response.meta.current_page;
    if (response.data) {
      addToLocalSearchHistory(query)
    }
  }

  const handlePagination = () => {
    console.log("handle pagination called")
    if (route.path != '/search') {
      return
    }
    if ((Date.now() - lastApiCallTime) < 1200) {
      return false;
    }
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      console.log('scrolled to bottom')
      console.log(hasMorePages)
      if (hasMorePages) {
        currentPage++;
        searchProducts(true);
        lastApiCallTime = Date.now();
      }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handlePagination)
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handlePagination)
  });

  return {
    searchSuggestions,
    getSearchSuggestions,
    searchProducts,
    search,
    searchInput,
    get_location
  };
}
