<template>
  <Scroll :enableRefresh="true" :enableScrollBar="true" :enableLoadMore="true" v-bind="$attrs" ref="scroll" @refresh="refresh" @loadmore="loadmore">
    <slot :data="data"></slot>
  </Scroll>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref } from 'vue';
import Scroll from '../../Scroll/src/scroll.vue';
import { useFetch, usePagination } from '../../../src/hooks/fetch';
interface IScrollComp {
  autoPullDownRefresh: () => {},
  finishPullDown: () => {},
  finishPullingUp: () => {},
  [props: string]: any
}
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
    const { nextPage, prevPage } = usePagination(props.endpoint, paginionMeta);
    const data = ref([]);
    const scroll = ref<IScrollComp>();
    const refresh = () => {
      setTimeout(() => {
        scroll.value?.finishPullDown();
      }, 1000);
    };
    const loadmore = () => {
      setTimeout(() => {
        scroll.value?.finishPullingUp();
      }, 1000);
    };
    onMounted(() => {
    });
    return {
      data,
      nextPage,
      prevPage,
      scroll,
      loadmore,
      refresh
    }
  }
})
</script>
<style lang="scss" scpoed>
</style>