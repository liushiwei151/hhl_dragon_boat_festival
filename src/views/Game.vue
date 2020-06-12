<template>
  <div class="game">
    <!-- 成功和失败的弹框 -->
    <div class="mask" v-show="popup !== ''">
      <div class="success lotter" v-show="popup === 'success'">
        <p>您已成功接到超过30个粽子</p>
        <p>获得惊喜奖励</p>
        <p>{{ lotterise.name }}</p>
        <div
          :style="{ backgroundImage: 'url(' + lotterise.imgUrl + ')' }"
        ></div>
      </div>
      <button
        class="successButton"
        @click="gameComputed()"
        v-show="popup === 'success'"
      ></button>
      <div class="success" v-show="popup === 'thanks'">
        <p>您已成功接到超过30个粽子</p>
        <p>感谢您的参与！</p>
      </div>
      <button
        class="thanksButton"
        @click="gameComputed()"
        v-show="popup === 'thanks'"
      ></button>
      <div class="fail" v-show="popup === 'fail'">
        <p>您在30秒游戏时间内,</p>
        <p>未成功收获30个粽子,</p>
        <p>再接再厉哦！</p>
      </div>
      <button
        class="failButton"
        @click="gameComputed()"
        v-show="popup === 'fail'"
      ></button>
    </div>
    <div class="gameBG">
      <div class="gameBox"></div>
    </div>
    <!-- 分数和时间 -->
    <div class="gameHead">
      <div class="headBox">
        <span class="fontj">剩余时间:</span
        ><span class="value">{{ timeRemaining }}</span>
      </div>
      <div class="headBox">
        <span class="fontj">数量:</span
        ><span class="value">{{ ricePuddingNumber }}</span>
      </div>
    </div>
    <!-- 粽子 -->
    <ul class="zongziBox" ref="zongzi"></ul>
    <div class="fixedBG">
      <div
        class="leftDrum drum"
        @touchstart="druming(0)"
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
        @touchstart="druming(1)"
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
        <div
          class="longzhou"
          :style="{ animationDuration: longzSpeed + 's' }"
        ></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Watch } from "vue-property-decorator";
import api from "../api";
@Component({})
export default class Game extends Vue {
  @Inject()
  private isTip!: Function;
  //通用属性
  //龙舟平常滑浆速度
  speed = 0.7;
  //长按时龙舟划桨速度
  longSpeed = 0.4;
  //粽子的下落速度
  zongziFall = "5000";
  //游戏的id
  gameId!: any;
  //奖品的名称和图片
  lotterise = {
    name: "",
    imgUrl: ""
  };
  // 声明图片
  imgName = "gu1";
  imgName1 = "gu1";
  gdName = "gu1";
  setInterObejct: any;
  setInterObejct1: any;
  //弹出成功还是失败''代表不弹
  popup = "";
  // 龙舟速度
  longzSpeed = this.speed;
  //获得粽子的数量
  ricePuddingNumber = 0;
  //粽子下路速度
  fall = "5000";
  //剩余时间
  timeRemaining = 30;
  //屏幕宽高
  screenWidth = 0;
  screenHeight = 0;
  //龙舟位置
  longPosition: string | number = "34%";
  //粽子的存储空间和粽子的key值
  zongziBox: Map<number, HTMLLIElement> = new Map();
  zongziKey = 0;
  //监控粽子的定时器
  setZongzi: Map<number, any> = new Map();
  //存储敲鼓的定时器
  setDrum: Array<any> = [];

  @Watch("setDrum")
  WatchDrum(newData: Array<any>) {
    console.log(newData);
  }

  get longzhouX(): number {
    return Number(this.longPosition) + this.screenWidth * 0.091;
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
    this.gameId = this.$route.query.id;
    console.log(this.$route.query.id);
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.longPosition = this.screenWidth * 0.34;
    this.longzSpeed = 0.4;
    setTimeout(() => {
      this.longzSpeed = this.speed;
    }, 2500);
    setTimeout(() => {
      this.controlzongzi();
      this.countDown();
    }, 5000);
  }
  gameComputed() {
    this.$router.push("/");
  }
  //倒计时
  countDown() {
    this.timeRemaining--;
    if (this.timeRemaining <= 0) {
      return;
    }
    setTimeout(() => {
      this.countDown();
    }, 1000);
  }
  //控制粽子数量
  controlzongzi() {
    if (this.timeRemaining > 20) {
      this.zongziMove();
      const random =
        Math.floor(Math.random() * (Number(this.zongziFall) - 3000)) + 2000;

      setTimeout(() => {
        this.fall = String(random);
        this.controlzongzi();
      }, 666);
    } else if (this.timeRemaining <= 20 && this.timeRemaining > 10) {
      this.zongziMove();
      const random =
        Math.floor(Math.random() * (Number(this.zongziFall) - 3000)) + 1500;
      setTimeout(() => {
        this.fall = String(random);
        this.controlzongzi();
      }, 500);
    } else if (this.timeRemaining <= 10 && this.timeRemaining > 0) {
      this.zongziMove();
      const random =
        Math.floor(Math.random() * (Number(this.zongziFall) - 3000)) + 1000;

      setTimeout(() => {
        this.fall = String(random);
        this.controlzongzi();
      }, 500);
    } else {
      this.lotteries();
      return;
    }
  }
  //判断中奖
  lotteries() {
    const self = this;
    if (this.ricePuddingNumber >= 30) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
      const data = {
        openid: userInfo.openid,
        gameRecordVO: {
          id: self.gameId,
          score: self.ricePuddingNumber
        }
      };
      api.lotteries(data).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data);
          if (res.data.data.prizeName === "谢谢惠顾") {
            self.popup = "thanks";
          } else {
            self.lotterise = {
              name: res.data.data.prizeName,
              imgUrl: res.data.data.imgUrl
            };
            self.popup = "success";
          }
        } else {
          self.isTip(res.data.msg);
        }
      });
    } else {
      this.popup = "fail";
    }
  }
  //创建下落的粽子
  zongziMove() {
    const self = this;
    //等待一段时间后再下落中的时间
    const timer = 500;
    const key = this.zongziKey;
    const _ul: any = this.$refs.zongzi;
    const x =
      Math.floor(Math.random() * this.screenWidth * 0.63) +
      this.screenWidth * 0.12;
    const li: HTMLLIElement = document.createElement("li");
    li.style.left = x + "px";
    li.style.transitionDuration = this.fall + "ms";
    this.zongziBox.set(key, li);
    this.zongziKey++;
    _ul.appendChild(li);
    //添加定时器监听粽子坐标
    const tid = setInterval(function() {
      const value = window.getComputedStyle(li).getPropertyValue("transform");
      if (value && value !== "none") {
        const y = value.split(",")[5].substr(0, value.split(",")[5].length - 1);
        if (
          self.screenHeight * 0.7 <= Number(y) &&
          self.screenHeight * 0.7 + self.screenWidth * 0.13 >= Number(y)
        ) {
          self.collision(x, key);
        }
      }
    }, 100);
    this.setZongzi.set(key, tid);
    // 延迟一定时间等渲染完后再赋值位移
    setTimeout(() => {
      const px = this.screenHeight * 0.8 + this.screenWidth * 0.13 + "px";
      li.style.transform = "translate(0, " + px + ")";
      // li.className = "zongziMove";
    }, timer);
    //未碰撞在一定时间后删除关闭定时器li标签和存储的粽子
    setTimeout(() => {
      li.remove();
      clearInterval(this.setZongzi.get(key));
      this.zongziBox.delete(key);
      this.setZongzi.delete(key);
    }, Number(this.fall) + timer);
  }
  //碰撞
  collision(x1: number, key: number) {
    const x2 = x1 + this.screenWidth * 0.137;
    const l1 = this.longzhouX;
    const l2 = l1 + this.screenWidth * 0.13;
    if (this.timeRemaining <= 0) {
      return;
    }
    if ((l1 <= x2 && l1 >= x1) || (l2 <= x2 && l2 >= x1)) {
      (this.zongziBox.get(key) as HTMLLIElement).remove();
      this.zongziBox.delete(key);
      this.ricePuddingNumber++;
    }
  }
  // 触碰敲鼓0左1右
  druming(e: number) {
    if (this.setDrum.length > 1) {
      this.setDrum.forEach(e => {
        clearInterval(e);
      });
      this.setDrum = [];
      this.druming(e);
      return;
    }
    if (e === 0) {
      this.swichDrum(e);
      const setInte = setInterval(() => {
        if (this.imgName === "gu1") {
          this.imgName = "gu2";
        } else {
          this.imgName = "gu1";
        }
        this.moveLong("left");
      }, 100);
      this.setDrum.push(setInte);
      console.log(this.setDrum);
    } else if (e === 1) {
      this.swichDrum(e);
      const setInte = setInterval(() => {
        if (this.imgName1 === "gu1") {
          this.imgName1 = "gu2";
        } else {
          this.imgName1 = "gu1";
        }
        this.moveLong("right");
      }, 100);
      this.setDrum.push(setInte);
    }

    this.longzSpeed = this.longSpeed;
  }
  //点击敲鼓
  swichDrum(e: number) {
    if (e === 0) {
      if (this.imgName === "gu1") {
        this.imgName = "gu2";
      } else {
        this.imgName = "gu1";
      }
      this.moveLong("left");
    } else if (e === 1) {
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
      this.moveLong("left", 30);
    }, 100);
    this.longzSpeed = this.longSpeed;
  }
  //长按结束敲鼓
  handleTouchEnd() {
    console.log(this.setDrum);
    console.log("结束");
    this.setDrum.forEach(e => {
      clearInterval(e);
    });
    this.setDrum = [];
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
      this.moveLong("right", 30);
    }, 100);
    this.longzSpeed = this.longSpeed;
  }
  //移动龙舟
  moveLong(e: string, f?: number) {
    if (e === "left" && this.longPosition <= 0) {
      return;
    }
    if (e === "right" && this.longPosition >= this.screenWidth * 0.69) {
      return;
    }
    let num = 30;
    if (f) {
      num = f;
    }
    if (e === "right") {
      (this.longPosition as number) += num;
    } else if (e === "left") {
      (this.longPosition as number) -= num;
    }
  }
}
</script>
<style lang="less">
.zongziBox {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  li {
    width: 13.7vw;
    height: 13vw;
    background: url(../assets/zongzi.png) no-repeat;
    background-size: 100% 100%;
    left: 20vw;
    top: -13vw;
    position: absolute;
    transition-property: all;
    transition-timing-function: linear;
    z-index: 100;
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
  .mask {
    position: fixed;
    z-index: 40;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    .success {
      background: url(../assets/success.png) no-repeat;
      background-size: 100% 100%;
      width: 88.7vw;
      height: 107.1vw;
      margin-left: 5vw;
      box-sizing: border-box;
      padding-top: 60vw;
      p {
        margin: 0;
        padding: 0;
        font-size: 4vw;
        margin-bottom: 4vw;
        font-weight: 550;
      }
    }
    .lotter {
      padding-top: 50vw;
      p {
        margin-bottom: 2vw;
        white-space: nowrap;
      }
      div {
        width: 25vw;
        height: 25vw;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin: 0 auto;
      }
    }
    .fail {
      background: url(../assets/fail.png) no-repeat;
      background-size: 100% 100%;
      width: 88.7vw;
      height: 107.1vw;
      margin-left: 5vw;
      padding-top: 55vw;
      box-sizing: border-box;
      p {
        margin: 0;
        padding: 0;
        font-size: 4vw;
        margin-bottom: 4vw;
        font-weight: 550;
      }
    }
    .failButton {
      border: none;
      outline: none;
      background: url(../assets/failButton.png) no-repeat;
      background-size: 100% 100%;
      width: 61.6vw;
      height: 18.4vw;
      margin-top: 3vh;
    }
    .thanksButton {
      border: none;
      outline: none;
      background: url(../assets/closeLotter.png) no-repeat;
      background-size: 100% 100%;
      width: 61.6vw;
      height: 18.4vw;
      margin-top: 3vh;
    }
    .successButton {
      border: none;
      outline: none;
      background: url(../assets/successButton.png) no-repeat;
      background-size: 100% 100%;
      width: 61.6vw;
      height: 18.4vw;
      margin-top: 3vh;
    }
  }
  .gameHead {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 30;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 2vh 14vw 0 13vw;
    .headBox {
      width: 28vw;
      white-space: nowrap;
    }
    .fontj {
      background: linear-gradient(
        0deg,
        rgba(2, 0, 36, 0.8270658605238971) 0%,
        rgba(255, 255, 255, 1) 62%
      );
      background-clip: text;
      margin-right: 3vw;
      color: transparent;
      font-size: 4vw;
    }
    .value {
      color: rgb(248, 213, 160);
      font-size: 7vw;
    }
  }
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
    background-color: rgb(36, 65, 91);
    top: 0;
    left: 0;
    background-size: 100% 50%;
    width: 100%;
    height: 200%;
    z-index: -1;
    .gameBox {
      background: url(../assets/gameBG.png);
      top: 0;
      left: 0;
      background-size: 100% 50%;
      width: 100%;
      height: 200%;
      z-index: -1;
      animation: scrollBG 7s linear infinite;
    }
  }
}
</style>
