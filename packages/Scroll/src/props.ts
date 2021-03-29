import { PropType } from "@vue/runtime-core";
import  { PullUpLoadConfig } from '@better-scroll/pull-up';
import  { ScrollbarOptions } from '@better-scroll/scroll-bar';
import  { PullDownRefreshConfig } from '@better-scroll/pull-down';
import { DIRECTION } from "./scroll.type";
export default {
  freeScroll: {
    type: Boolean ,
    default: false,
    required: false,
  },
  direction: {
    type: String as PropType<DIRECTION>,
    default: DIRECTION.DIRECTION_V
  },
  // 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
  // 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
  // 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
  probeType: {
    type: Number,
    default: 2,
  },
  // 作用：设置回弹动画的动画时长。
  bounceTime: {
    type: Number,
    default: 800
  },
  stopPropagation: {
    type: Boolean,
    default: false
  },
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
    type: Object as PropType<ScrollbarOptions | undefined>,
    default: () => ({})
  },
};