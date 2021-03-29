
<template>
  <div class="pullup-tips" v-if="enableLoadMore || isPullUpLoad">
    <div class="pullup-content">
      <div v-if="hasMore">
        <div v-if="!isPullUpLoad" class="before-trigger">
          <span class="pullup-txt">Pull up and load more</span>
        </div>
        <div v-if="isPullUpLoad" class="after-trigger">
          <span class="pullup-txt">Loading...</span>
        </div>
      </div>
      <div v-else>
        我是有底线的______
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { REFRESH_STATE } from './scroll.type';

export default {
  props: {
    enableLoadMore: {
      type: Boolean,
    },
    hasMore: {
      type: Boolean,
      default: false,
    },
    isPullUpLoad: {
      type: Boolean,
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
.pullup-tips {
  .pullup-content {
    text-align: center;
    width: 100%;
    // transform: translateY(100%) translateZ(0);
  }
}
</style>