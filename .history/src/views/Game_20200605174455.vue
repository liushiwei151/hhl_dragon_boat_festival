<template>
  <div class="game">
    <div class="gameBG"></div>
    <div class="fixedBG">
      <div
        class="leftDrum drum"
        @click="swichDrum(1)"
        v-longTap="leftLong"
        @touchend="handleTouchEnd"
        :style="{ backgroundImage: 'url(' + gdUrl + ')' }"
      >
        <div
          class="drum"
          :style="{ backgroundImage: 'url(' + imgUrl + ')' }"
        ></div>
      </div>
      <div
        class="leftDrum drum"
        @click="swichDrum(2)"
        v-longTap="rightLong"
        @touchend="handleTouchEnd"
        :style="{ backgroundImage: 'url(' + gdUrl + ')' }"
      >
        <div
          class="drum"
          :style="{ backgroundImage: 'url(' + imgUrl1 + ')' }"
        ></div>
      </div>
    </div>
    <transition name="list">
      <div class="longzhouBox" :style="{ left: longPosition + 'px' }">
        <div class="longzhou"></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
@Component({})
export default class Game extends Vue {
  @Inject()
  private isTip!: Function;

  imgName = "gu1";
  imgName1 = "gu1";
  gdName = "gu1";
  setInterObejct: any;
  setInterObejct1: any;
  //屏幕宽高
  screenWidth: number = 0;
  screenHeight: number = 0;
  //龙舟位置
  longPosition: number = 0;

  get imgUrl(): string {
    const a = require("../assets/" + this.imgName + ".png");
    return a;
  }
  get imgUrl1(): string {
    const a = require("../assets/" + this.imgName1 + ".png");
    return a;
  }
  get gdUrl(): string {
    const a = require("../assets/" + this.gdName + ".png");
    return a;
  }

  mounted(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.longPosition = this.screenWidth * 0.5;
  }

  //点击敲鼓
  swichDrum(e: number) {
    if (e === 1) {
      if (this.imgName === "gu1") {
        this.imgName = "gu2";
      } else {
        this.imgName = "gu1";
      }
      this.moveLong("left");
    } else if (e === 2) {
      if (this.imgName1 === "gu1") {
        this.imgName1 = "gu2";
      } else {
        this.imgName1 = "gu1";
      }
      this.moveLong("right");
    }
  }

  //长按左自动敲鼓
  leftLong() {
    const self = this;
    this.setInterObejct = setInterval(() => {
      if (this.imgName === "gu1") {
        this.imgName = "gu2";
      } else {
        this.imgName = "gu1";
      }
      this.moveLong("left");
    }, 200);
  }
  //长按结束敲鼓
  handleTouchEnd() {
    if (this.setInterObejct) {
      clearInterval(this.setInterObejct);
    }
    if (this.setInterObejct1) {
      clearInterval(this.setInterObejct1);
    }
  }
  //长按右点击敲鼓
  rightLong() {
    const self = this;
    this.setInterObejct = setInterval(() => {
      if (this.imgName1 === "gu1") {
        this.imgName1 = "gu2";
      } else {
        this.imgName1 = "gu1";
      }
      this.moveLong("right");
    }, 200);
  }
  //移动龙舟
  moveLong(e: string) {
    if (e === "right") {
      this.longPosition += 20;
    } else if (e === "left") {
      this.longPosition -= 20;
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
@keyframes play {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -94vw 0;
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.game {
  width: 100%;
  height: 100%;
  .longzhouBox {
    background: url(../assets/longBg.png) no-repeat;
    background-size: 100% 100%;
    width: 31.333vw;
    height: 68.133vw;
    position: relative;
    top: 60vh;
    z-index: 5;
    .longzhou {
      background: url(../assets/long.png) no-repeat;
      background-size: 300% 100%;
      width: 100%;
      height: 100%;
      background-position: 0 0;
      animation: play 0.5s steps(3) infinite;
      position: absolute;
    }
  }
  .fixedBG {
    background: url(../assets/gameBG2.png) no-repeat;
    @bg100();
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    box-sizing: border-box;
    padding: 0 12vw;
    z-index: 20;
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
