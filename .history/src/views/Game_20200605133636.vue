<template>
  <div class="game"></div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
@Component({})
export default class Game extends Vue {
  @Inject()
  private isTip!: Function;
}
</script>

<style lang="less" scoped>
.game {
  background: url(../assets/gameBG2.png) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}
</style>
