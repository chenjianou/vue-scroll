<template>
    <div class="pulldown-scroller" v-if="enableRefresh">
      <div class="pulldown-wrapper">
        <div v-show="refreshState === REFRESH_STATE.PULL_DOWN">
          <span>Pull Down and refresh</span>
        </div>
        <div v-show="refreshState === REFRESH_STATE.CAN_REQUEST">
          <span>CAN_REQUEST...</span>
        </div>
        <div v-show="refreshState === REFRESH_STATE.LOADING">
          <span>Loading...</span>
        </div>
        <div v-show="refreshState === REFRESH_STATE.SUCCESS">
          <span>Refresh success</span>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { REFRESH_STATE } from './scroll.type';

export default {
  props: {
    refreshState: {
      type: String,
    },
    enableRefresh: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
        // 刷新状态
    return {
      REFRESH_STATE,
    }
  }
}
</script>

<style lang="scss" scoped>
  .pulldown-scroller {
    position: absolute;
    top: 0;
    width: 100%;
    transform: translateY(-100%) translateZ(0);
  }
</style>