<template>
  <Scroll v-bind="$attrs">
    <slot :data="data"></slot>    
  </Scroll>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';
import Scroll from '../../Scroll/src/scroll.vue';
import { useFetch, usePagination } from '../../../src/hooks/fetch';
export default defineComponent({
  components: {
    Scroll
  },
  props: {
    endpoint: {
      type: String,
      required: true,
    }
  },
  setup(props, ctx) {
    const paginionMeta = ref({ page: 1, pageSize: 10, total: 0 });
    const { endpoint, nextPage, prevPage } = usePagination(props.endpoint, paginionMeta);
    const api = useFetch(endpoint);
    return {
      ...api,
      nextPage,
      prevPage
    }
  }
})
</script>
<style lang="scss" scpoed>
</style>