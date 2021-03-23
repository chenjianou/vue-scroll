<template>
  <div class="scroll-wrapper" ref="scrollRef">
    <div class="scroll-content">
      <div class="pulldown-scroller" v-if="enableRefresh">
        <div class="pulldown-wrapper">
          <div v-show="refreshState === REFRESH_STATE.PULL_DOWN">
            {{beforePullDown}}
            <span v-show="beforePullDown">Pull Down and refresh</span>
            <span v-show="!beforePullDown">CAN_REQUEST...</span>
          </div>
          <div v-show="refreshState === REFRESH_STATE.LOADING">
            <span>Loading...</span>
          </div>
          <div v-show="refreshState === REFRESH_STATE.SUCCESS">
            <span>Refresh success</span>
          </div>
        </div>
      </div>
      <div class="scroll-list_content">
        <slot></slot>
      </div>
      <div class="pullup-tips" v-if="enableLoadMore">
        <div class="pullup-content">
          <div v-if="hasMore">
            <div v-if="!isPullUpLoad" class="before-trigger">
              <span class="pullup-txt">Pull up and load more</span>
            </div>
            <div v-else class="after-trigger">
              <span class="pullup-txt">Loading...</span>
            </div>
          </div>
          <div v-else>
            我是有底线的______
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, onBeforeUnmount } from 'vue';
import BScroll from '@better-scroll/core';
import Pullup, { PullUpLoadConfig } from '@better-scroll/pull-up';
import PullDown, { PullDownRefreshConfig } from '@better-scroll/pull-down';
import ScrollBar, { ScrollbarOptions } from '@better-scroll/scroll-bar';
import { REFRESH_STATE, IPos } from './scroll.type';
import { EaseItem } from '@better-scroll/shared-utils';
BScroll.use(PullDown);
BScroll.use(Pullup);
BScroll.use(ScrollBar);

interface IPorps {
  pullUpLoad?: PullUpLoadConfig,
  pullDown?: PullDownRefreshConfig,
  scrollBar?: ScrollbarOptions,
  enableScrollBar: Boolean,
  enableRefresh: Boolean,
  enableLoadMore: Boolean,
  [propName: string]: any,
}

const DEFAULT_SCROLLOPTIONS: ScrollbarOptions = { 
    fade: true, 
    interactive: true,
    scrollbarTrackClickable: true,
    scrollbarTrackOffsetTime: 300
}
export default defineComponent({
  props: {
    click: {
      type: Boolean,
      default: true
    },
    enableRefresh: {
      type: Boolean,
      default: false
    },
    enableLoadMore: {
      type: Boolean,
      default: false
    },
    enableScrollBar: {
      type: Boolean,
      default: false
    },
      // type: boo as PropType<ITodo[]>,
    pullUpLoad: {
      type: Object as PropType<PullUpLoadConfig | undefined>,
      default: () => ({ threshold: 0 }),
    },
    pullDown: {
      type: Object as PropType<PullDownRefreshConfig | undefined>,
      default: () => ({ threshold: 50, stop: 30 }),
    },
    scrollBar: {
      type: Object as PropType<ScrollbarOptions | true>,
      default: () => ({})
    },
  },
  setup(props: IPorps, ctx) {
    onMounted(() => {
      initScroll();
      bindEvent();
    });
    onBeforeUnmount(() => {
      scroll.destroy()
    });
    const scrollRef = ref<HTMLElement>();
    let scroll: BScroll
    let refreshState = ref<REFRESH_STATE>(REFRESH_STATE.PULL_DOWN);
    let beforePullDown = ref(true);
    let isPullUpLoad = ref(false);
    const finishPullDown = () => {
      beforePullDown.value = true;
      refreshState.value = REFRESH_STATE.PULL_DOWN;
      scroll.finishPullDown();
    };
    const pullingDownHandler = () => {
      refreshState.value = REFRESH_STATE.LOADING;
      setTimeout(() => {
        finishPullDown()
      }, 1000);
    };
    const scrollHandler = (pos: IPos) => {
      if(pos.y >= (props.pullDown as PullDownRefreshConfig).threshold && beforePullDown) {
        beforePullDown.value = false;
      }
    };
    const finishPullingUp = () => {
      isPullUpLoad.value = false;
      scroll.finishPullUp();
    }
    let hasMore = ref(false);
    const pullingUpHandler = () => {
      if(hasMore.value) {
        isPullUpLoad.value = true;
        setTimeout(() => {
          finishPullingUp()
        }, 1000);
      } 
    };
    const bindEvent = () => {
      props.enableRefresh && scroll.on('pullingDown', pullingDownHandler);
      props.enableLoadMore && scroll.on('scroll', scrollHandler);
      props.enableScrollBar && scroll.on('pullingUp', pullingUpHandler);
    }
    const initScroll = () => {
      scroll = new BScroll(scrollRef.value as HTMLElement, {
        scrollY: true,
        bounceTime: 800,
        click: true,
        pullUpLoad: props.enableLoadMore && props.pullUpLoad,
        pullDownRefresh: props.enableRefresh && props.pullDown,
        scrollbar: props.enableScrollBar && Object.assign(DEFAULT_SCROLLOPTIONS, props.scrollBar),
      })
    };
    // 高度变化refresh
    const refresh = ()  => {
      scroll.refresh();
    };
    // 滚动开启
    const enable = () => {
      scroll.enable();
    };
    // 滚动禁用
    const disable = () => {
      console.log(scroll);
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
    return {
      scrollRef,
      REFRESH_STATE,
      refreshState,
      beforePullDown,
      isPullUpLoad,
      hasMore,
      refresh,
      enable,
      disable,
      scrollBy,
      scrollTo,
      scrollToElement
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
    min-height: calc(100% + 1px);
  }
  .pulldown-scroller {
    position: absolute;
    top: 0;
    width: 100%;
    transform: translateY(-100%) translateZ(0);
  }
  .pullup-tips {
    .pullup-content {
      width: 100%;
      transform: translateY(100%) translateZ(0);
    }
  }
}
</style>