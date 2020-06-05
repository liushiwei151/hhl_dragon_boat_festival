<template>
  <div class="game">
    <div class="gameBG"></div>
    <div class="fixedBG"></div>
  </div>
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
@bg100: {
  position: fixed;
  top: 0;
  left: 0;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
};
.game {
  width: 100%;
  height: 100%;
  .fixedBG {
    background: url(../assets/gameBG2.png) no-repeat;
    @bg100();
  }
  .gameBG {
    background: url(../assets/gameBG.png);
    z-index: -1;
    height: auto !important;
    @bg100();
  }
}
</style>
