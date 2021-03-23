<script lang="ts">
import { defineComponent, onMounted, ref, h } from "vue";
import LoadMore from '../packages/LoadMore/src/loadmore.vue'
export default defineComponent({
  name: "App",
  setup() {
    onMounted(() => {
    })
  },
  render () {
    return h(LoadMore, {
      
    })
  }
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
