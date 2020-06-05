<template>
  <div class="game">
    <div class="gameBG"></div>
    <div class="fixedBG">
      <div
        class="leftDrum drum"
        @click="swichDrum"
        :style="{ backgroundImage: 'url(' + gdUrl + ')' }"
      >
        <div
          class="drum"
          :style="{ backgroundImage: 'url(' + imgUrl + ')' }"
        ></div>
      </div>
      <!-- <div class="rightDrum drum"></div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
@Component({})
export default class Game extends Vue {
  @Inject()
  private isTip!: Function;

  imgName = "gu1";
  gdName = "gu1";

  get imgUrl(): string {
    const a = require("../assets/" + this.imgName + ".png");
    return a;
  }
  get gdUrl(): string {
    const a = require("../assets/" + this.gdName + ".png");
    return a;
  }

  swichDrum() {
    if (this.imgName === "gu1") {
      this.imgName = "gu2";
    } else {
      this.imgName = "gu1";
    }
  }
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
@keyframes scrollBG {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
.game {
  width: 100%;
  height: 100%;
  .fixedBG {
    background: url(../assets/gameBG2.png) no-repeat;
    @bg100();
    .drum {
      width: 25vw;
      height: 28vw;
      background-size: 100% 100%;
    }
    .leftDrum {
    }
    .rightDrum {
    }
  }
  .gameBG {
    background: url(../assets/gameBG.png);
    position: fixed;
    top: 0;
    left: 0;
    background-size: 100% 50%;
    width: 100%;
    height: 200%;
    z-index: -1;
    animation: scrollBG 4s linear infinite;
  }
}
</style>
