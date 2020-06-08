<template>
  <div class="game">
    <div class="gameBG"></div>
    <!-- 粽子 -->
    <ul class="zongziBox" ref="zongzi"></ul>
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
        <div class="longzhou" :style="{ animationDuration: longzSpeed + 's' }">
          <div class="longHead"></div>
        </div>
      </div>
    </transition>
    <div class="xian"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Watch } from "vue-property-decorator";
@Component({})
export default class Game extends Vue {
  @Inject()
  private isTip!: Function;
  //通用属性
  //龙舟平常滑浆速度
  speed = 0.7;
  //长按时龙舟划桨速度
  longSpeed = 0.3;
  //粽子下路速度
  fall = 5000;
  // 声明图片
  imgName = "gu1";
  imgName1 = "gu1";
  gdName = "gu1";
  setInterObejct: any;
  setInterObejct1: any;
  // 龙舟速度
  longzSpeed = this.speed;
  //屏幕宽高
  screenWidth = 0;
  screenHeight = 0;
  //龙舟位置
  longPosition = 0;
  //粽子的存储空间和粽子的key值
  zongziBox: Map<number, HTMLLIElement> = new Map();
  zongziKey = 0;
  //监控粽子的定时器
  setZongzi: Map<number, any> = new Map();
  //龙舟的x轴
  // dragonBoatX!:number;

  @Watch("longzhouX")
  positionWatch(newData: number) {
    // const x1 = newData + this.screenWidth * 0.091;
    // const x2 = x1 + 0.11 * this.screenWidth;
    // const y2 = y1 + this.screenWidth * 0.11;
    // todo 实时监控龙头的坐标矩形x1左上角
    console.log(newData);
  }

  get longzhouX(): number {
    return this.longPosition + this.screenWidth * 0.091;
  }
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
    this.longPosition = this.screenWidth * 0.34;
    this.longzSpeed = 0.4;
    setTimeout(() => {
      this.longzSpeed = this.speed;
    }, 2500);
    setTimeout(() => {
      this.zongziMove();
    }, 1000);
  }

  zongziMove() {
    const self = this;
    //等待一段时间后再下落中的时间
    const timer = 500;
    const key = this.zongziKey;
    let _ul: any = this.$refs.zongzi;
    const x =
      Math.floor(Math.random() * this.screenWidth * 0.63) +
      this.screenWidth * 0.12;
    const li: HTMLLIElement = document.createElement("li");
    li.style.left = x + "px";
    this.zongziBox.set(key, li);
    this.zongziKey++;
    _ul.appendChild(li);
    //添加定时器监听粽子坐标
    let tid = setInterval(function() {
      let value = window.getComputedStyle(li).getPropertyValue("transform");
      if (value !== "none") {
        let y = value.split(",")[5].substr(0, value.split(",")[5].length - 1);
        if (self.screenHeight * 0.7 <= Number(y)) {
          self.collision(x, key);
        }
      }
    }, 100);
    this.setZongzi.set(key, tid);
    // 延迟一定时间等渲染完后再赋值位移
    setTimeout(() => {
      let px = this.screenHeight * 0.8 + this.screenWidth * 0.13 + "px";
      li.style.transform = "translate(0, " + px + ")";
      // li.className = "zongziMove";
    }, timer);
    //未碰撞在一定时间后删除关闭定时器li标签和存储的粽子
    setTimeout(() => {
      li.remove();
      clearInterval(this.setZongzi.get(key));
      this.zongziBox.delete(key);
      this.setZongzi.delete(key);
    }, this.fall + timer);
  }
  //碰撞
  collision(x: number, key: number) {
    let x2 = x + this.screenWidth * 0.137;
    console.log(x, x2, key);
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
      this.zongziMove();
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
    this.setInterObejct = setInterval(() => {
      if (this.imgName === "gu1") {
        this.imgName = "gu2";
      } else {
        this.imgName = "gu1";
      }
      this.moveLong("left");
    }, 100);
    this.longzSpeed = this.longSpeed;
  }
  //长按结束敲鼓
  handleTouchEnd() {
    if (this.setInterObejct) {
      clearInterval(this.setInterObejct);
    }
    if (this.setInterObejct1) {
      clearInterval(this.setInterObejct1);
    }
    this.longzSpeed = this.speed;
  }
  //长按右点击敲鼓
  rightLong() {
    this.setInterObejct = setInterval(() => {
      if (this.imgName1 === "gu1") {
        this.imgName1 = "gu2";
      } else {
        this.imgName1 = "gu1";
      }
      this.moveLong("right");
    }, 100);
    this.longzSpeed = this.longSpeed;
  }
  //移动龙舟
  moveLong(e: string) {
    if (e === "left" && this.longPosition <= 0) {
      return;
    }
    if (e === "right" && this.longPosition >= this.screenWidth * 0.69) {
      return;
    }
    if (e === "right") {
      this.longPosition += 20;
    } else if (e === "left") {
      this.longPosition -= 20;
    }
  }
}
</script>
<style lang="less">
.zongziBox {
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  li {
    width: 13.7vw;
    height: 13vw;
    background: url(..//assets/zongzi.png) no-repeat;
    background-size: 100% 100%;
    left: 20vw;
    top: -13vw;
    position: absolute;
    transition: all 5s linear;
  }
}
</style>
<style lang="less" scoped>
.xian {
  position: absolute;
  top: 70vh;
  width: 100%;
  height: 1px;
  background-color: black;
}
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
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes startAnimation {
  0% {
    top: 80vh;
  }
  50% {
    top: 55vh;
  }
  100% {
    top: 70vh;
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
  transform: translateX(30px);
}

.game {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .longzhouBox {
    background: url(../assets/longBg.png) no-repeat;
    background-size: 100% 100%;
    width: 31.333vw;
    height: 68.133vw;
    position: fixed;
    top: 70vh;
    z-index: 5;
    transition: all 0.3s;
    animation: startAnimation 5s ease;
    .longzhou {
      background: url(../assets/long.png) no-repeat;
      background-size: 300% 100%;
      width: 100%;
      height: 100%;
      background-position: 0 0;
      animation: play steps(3) infinite;
      position: absolute;
      .longHead {
        background-color: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0;
        width: 13vw;
        height: 13vw;
        left: 9.1vw;
      }
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
