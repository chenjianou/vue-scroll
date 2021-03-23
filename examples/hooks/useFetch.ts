import { isRef, ref, watch } from 'vue';
import axios from 'axios';


export function useFetch(endpoint: any) {
  let data = ref(null);
  let loading = ref(false);
  let error =  ref('');
  // ...
  function fetchData() {
    // ...
    
    // If it's a ref, get its value
    // otherwise use it directly
      return axios.get(isRef(endpoint) ? endpoint.value : endpoint).then(resp => {
        const { data } = resp; 
      }) // ...
  }
  // watch the endpoint if its a ref/computed value
  if (isRef(endpoint)) {
    watch(endpoint, () => {
      // refetch the data again
      fetchData();
    });
  } 
  
  return {
    data,
    loading,
    error
    // ...
  };
} 
