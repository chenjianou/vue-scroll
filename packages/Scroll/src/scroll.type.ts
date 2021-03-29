
import { PullUpLoadConfig } from '@better-scroll/pull-up';
import { ScrollbarOptions } from '@better-scroll/scroll-bar';
import { PullDownRefreshConfig } from '@better-scroll/pull-down';
export enum REFRESH_STATE {
  PULL_DOWN = 'PULL_DOWN',
  CAN_REQUEST = 'CAN_REQUEST',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
};
export interface IPos{
  x: number
  y: number
};
export enum DIRECTION {
  DIRECTION_H = 'horizontal',
  DIRECTION_V = 'vertical'
};
export interface IProps {
  pullUpLoad?: PullUpLoadConfig,
  pullDown?: PullDownRefreshConfig,
  scrollBar?: ScrollbarOptions,
  enableScrollBar: Boolean,
  enableRefresh: Boolean,
  enableLoadMore: Boolean,
  freeScroll?: (boolean & Boolean) | undefined,
  stopPropagation: (boolean & Boolean) | undefined,
  direction?: DIRECTION,
  bounceTime?: number & Number,
  click?: (boolean | undefined) & Boolean
  probeType: number & Number,
  [propName: string]: any,
}