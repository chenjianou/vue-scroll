import { computed, isRef, Ref, ref, watch } from 'vue';


export function usePagination (endpoint: any, pageSize: number) {
  const currentPage = ref(1);
  const paginateEndPoint = computed(() => {
    return `${endpoint}?page=${currentPage.value}&pageSize=${pageSize}`
  });
  function nextPage () {
    currentPage.value ++;
  };
  function prevPage () {
    if (currentPage.value <= 1) {
      return;
    };
    currentPage.value --;
  };
  return {
    endpoint: paginateEndPoint,
    nextPage,
    prevPage,
  }
};