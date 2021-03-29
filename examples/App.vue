<template>
  <LoadMore  endpoint="/data/index">
    <!-- <h1 v-for="i in 100">hello world</h1> -->
  </LoadMore>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, h } from "vue";
import LoadMore from '../packages/LoadMore/src/loadmore.vue'
export default defineComponent({
  components: {
    LoadMore
  },
  name: "App",
  setup() {
    onMounted(() => {
    })
  },
});
</script>

<style lang="scss">
body, html, #app {
  height: 100%;
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
}
</style>
