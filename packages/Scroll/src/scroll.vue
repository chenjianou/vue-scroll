<template>
  <div class="scroll-wrapper" ref="scrollRef">
    <div class="scroll-content">
      <PullDownComponent :enableRefresh="enableRefresh" :refreshState="refreshState" />
      <div ref="contentRef" class="scroll-list_content">
        <slot></slot>
      </div>
      <PullUpComponent :enableLoadMore="enableLoadMore" :hasMore="hasMore" :isPullUpLoad="isPullUpLoad"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount, nextTick } from 'vue';
import { REFRESH_STATE, IPos, IProps, DIRECTION } from './scroll.type';
import BScroll from '@better-scroll/core';
import { EaseItem } from '@better-scroll/shared-utils';
import Pullup from '@better-scroll/pull-up';
import ScrollBar, { ScrollbarOptions } from '@better-scroll/scroll-bar';
import PullDown, { PullDownRefreshConfig } from '@better-scroll/pull-down';
import PullDownComponent from './pulldown.vue';
import PullUpComponent from './pullup.vue';
import Props from './props'
BScroll.use(PullDown);
BScroll.use(Pullup);
BScroll.use(ScrollBar);



const DEFAULT_SCROLLOPTIONS: ScrollbarOptions = {
  fade: true,
  interactive: true,
  scrollbarTrackClickable: true,
  scrollbarTrackOffsetTime: 300
}
export default defineComponent({
  props: Props,
  components: {
    PullDownComponent,
    PullUpComponent
  },
  setup(props: IProps, { emit }) {
    const contentRef = ref<HTMLElement>();
    const calcHeight = () => {
      const height = contentRef.value!.clientHeight;
      contentRef.value!.style!.height = `${(height || document.body.clientHeight) + 1}px`;
      scrollApi.refresh();
    };
    const initScroll = () => {
      scroll = new BScroll(scrollRef.value as HTMLElement, {
        scrollY: props.freeScroll || props.direction === DIRECTION.DIRECTION_V,
        scrollX: props.freeScroll || props.direction === DIRECTION.DIRECTION_H,
        freeScroll: props.freeScroll,
        stopPropagation: props.stopPropagation,
        probeType: props.probeType,
        bounceTime: props.bounceTime,
        click: props.click,
        pullUpLoad: props.enableLoadMore && props.pullUpLoad,
        pullDownRefresh: props.enableRefresh && props.pullDown,
        scrollbar: props.enableScrollBar && Object.assign(DEFAULT_SCROLLOPTIONS, props.scrollBar),
      });
      bindEvent();
    };
     // 刷新状态
    let refreshState = ref<REFRESH_STATE>(REFRESH_STATE.PULL_DOWN);
    // 上拉加载更多
    let isPullUpLoad = ref(false);
    const finishPullDown = () => {
      refreshState.value = REFRESH_STATE.PULL_DOWN;
      scroll.finishPullDown();
    };
    const finishPullingUp = () => {
      isPullUpLoad.value = false;
      scroll.finishPullUp();
    };
    // bind scrollEvent
    const bindEvent = () => {
      const pullingDownHandler = () => {
        refreshState.value = REFRESH_STATE.LOADING;
        emit('refresh');
        // finishPullDown()
      };
      const scrollHandler = (pos: IPos) => {
        console.log('scroll')
        // 判断 y滚动 以及状态是否初始化成功
        if(pos.y >= (props.pullDown as PullDownRefreshConfig).threshold && refreshState.value === REFRESH_STATE.PULL_DOWN) {
          refreshState.value = REFRESH_STATE.CAN_REQUEST;
        };
      };
      const pullingUpHandler = () => {
        if(hasMore.value) {
          isPullUpLoad.value = true;
          emit('loadmore');
          // finishPullingUp();
        };
      };
      props.enableRefresh && scroll.on('pullingDown', pullingDownHandler);
      scroll.on('scroll', scrollHandler);
      props.enableLoadMore && scroll.on('pullingUp', pullingUpHandler);
    };
    onMounted(() => {
      initScroll();
      calcHeight();
      nextTick(() => {
        scrollApi.autoPullDownRefresh();
      })
    });
    onBeforeUnmount(() => {
      scroll.destroy()
    });
    const scrollRef = ref<HTMLElement>();
    let scroll: BScroll
    let hasMore = ref(true);
    const proxyScroll = () => {
      const refresh = ()  => {
        // 高度变化refresh
        scroll.refresh();
      };
      // 滚动开启
      const enable = () => {
        scroll.enable();
      };
      // 滚动禁用
      const disable = () => {
        scroll.disable();
      };
      const scrollBy = (deltaX: number, deltaY: number, time?: number | undefined, easing?: EaseItem | undefined): void => {
        scroll.scrollBy.call(scroll, deltaX, deltaY, time, easing)
      };
      const scrollTo = (x: number, y: number, time?: number | undefined, easing?: EaseItem | undefined, extraTransform?: {start: object;end: object; } | undefined): void => {
        scroll.scrollTo.call(scroll, x, y, time, easing, extraTransform)
      };
      const scrollToElement = (el: string | HTMLElement, time: number, offsetX: number | boolean, offsetY: number | boolean, easing?: EaseItem | undefined): void => {
        scroll.scrollToElement.call(scroll, el, time, offsetX, offsetY, easing)
      };
      const autoPullDownRefresh = () => {
        props.enableRefresh && scroll.autoPullDownRefresh();
      };
      return {
        refresh,
        enable,
        disable,
        scrollBy,
        scrollTo,
        scrollToElement,
        autoPullDownRefresh
      }
    };
    const scrollApi = proxyScroll();
    return {
      ...scrollApi,
      scrollRef,
      contentRef,
      REFRESH_STATE,
      refreshState,
      isPullUpLoad,
      hasMore,
      scrollBy,
      scrollTo,
      finishPullDown,
      finishPullingUp
    }
  }
})
</script>
<style lang="scss" scpoed>
.scroll-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  .scroll-content {
    // min-height: calc(100% + 1px);
  }
}
</style>