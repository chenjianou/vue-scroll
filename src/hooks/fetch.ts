import { computed, isRef, onMounted, Ref, ref, watch } from 'vue';
import axios from 'axios';

interface IPagination {
  page: number
  pageSize: number
  total: number
}
export function useFetch(endpoint: any) {
  let data = ref(null);
  let loading = ref(false);
  let error =  ref('');
  // ...
  function fetchData() {
    // ...
    loading.value = true;
    // If it's a ref, get its value
    // otherwise use it directly
      return axios.get(isRef(endpoint) ? endpoint.value : endpoint).then(resp => {
        data.value = resp.data.data;
      }).catch((err) => {
        error = err;
      }).finally(() => {
        loading.value = false;
      }); // ...
  }
  // watch the endpoint if its a ref/computed value
  if (isRef(endpoint)) {
    watch(endpoint, () => {
      // refetch the data again
      fetchData();
    });
  }
  onMounted(() => {
    fetchData();
  })
  return {
    data,
    loading,
    error
    // ...
  };
};

export function usePagination (endpoint: any, paginationMeta: Ref<IPagination>) {
  const paginateEndPoint = computed(() => {
    return `${endpoint}?page=${paginationMeta.value.page}&pageSize=${paginationMeta.value.pageSize}`
  });
  function nextPage () {
   paginationMeta.value.page ++;
  };
  function prevPage () {
    if (paginationMeta.value.page <= 1) {
      return;
    };
   paginationMeta.value.page --;
  };
  return {
    endpoint: paginateEndPoint,
    nextPage,
    prevPage,
  }
};