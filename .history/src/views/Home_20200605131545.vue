<template>
  <div class="home">
    <i class="icon" @click="showModal('rank')"></i>
    <button class="button" @click="startGame"></button>
    <button @click="showModal('rule')">规则</button>
    <button @click="showModal('share')">分享</button>
    <!-- 排行榜 -->
    <transition name="fade">
      <div class="rank" v-show="isRankShow">
        <ul>
          <li v-for="(item, index) in rankInfo" :key="index">
            <dl>
              <dd>{{ item.ranking }}</dd>
              <dd>{{ item.infoNumber }}</dd>
              <dd>
                <span>{{ item.name }}</span>
              </dd>
              <dd>{{ item.number }}</dd>
            </dl>
          </li>
        </ul>
        <button class="closeButton" @click="closeModal('rank')"></button>
      </div>
    </transition>
    <!-- 规则 -->
    <transition name="fade">
      <div class="rule" v-show="isRuleShow">
        <button class="closeButton" @click="closeModal('rule')"></button>
      </div>
    </transition>
    <!-- 提示次数用完 -->
    <transition name="fade">
      <div class="share" v-show="isShareShow" @click="closeModal('share')">
        <i class="share-img"></i>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator';

interface RankInfoInter {
  ranking: string;
  infoNumber: string | number;
  name: string;
  number: string | number;
}
@Component({})
export default class Home extends Vue {
  @Inject()
  private isTip!: Function;

  // 排行版显示
  isRankShow = false;
  //规则显示
  isRuleShow = false;
  //分享显示
  isShareShow = false;
  //排行榜数据R
  rankInfo: Array<RankInfoInter> = [
    {
      ranking: '排名',
      infoNumber: '用户编号',
      name: '昵称',
      number: '粽子数量'
    }
  ];

  created(): void {
    for (let i = 0; i < 10; i++) {
      const rankNumber = 'TOP' + (i + 1);
      this.rankInfo.push({
        ranking: rankNumber,
        infoNumber: '12345678',
        name: '流逝的光明市区',
        number: '99999'
      });
    }
  }
  // 显示弹框
  showModal(e: string) {
    if (e === 'rank') {
      this.isRankShow = true;
    } else if (e === 'rule') {
      this.isRuleShow = true;
    } else if (e === 'share') {
      this.isShareShow = true;
    }
  }
  //关闭弹框
  closeModal(e: string) {
    if (e === 'rank') {
      this.isRankShow = false;
    } else if (e === 'rule') {
      this.isRuleShow = false;
    } else if (e === 'share') {
      this.isShareShow = false;
    }
  }
  //开始游戏
  startGame() {
    this.$router.push('/Game');
  }
}
</script>
<style scoped lang="less">
@redFont: {
  font-size: 4.5vw;
  font-weight: 600;
  color: rgb(173, 43, 43);
};
.home {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/home_bg.png) no-repeat;
  background-size: 100% 100%;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .share {
    width: 100%;
    height: 100%;
    position: fixed;
    box-sizing: border-box;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    .share-img {
      background: url(../assets/share.png) no-repeat;
      background-size: 100% 100%;
      width: 72.3vw;
      height: 50vh;
      display: block;
      right: 0;
      top: 0;
      position: absolute;
    }
  }
  .rule {
    width: 100%;
    height: 100%;
    background: url(../assets/rule.png) no-repeat;
    background-size: 100% 100%;
    position: fixed;
    box-sizing: border-box;
    top: 0;
    left: 0;
    .closeButton {
      border: none;
      background: url(../assets/closeButton.png) no-repeat;
      background-size: 100% 100%;
      width: 70vw;
      position: absolute;
      height: 20vw;
      bottom: 11vh;
      left: 15vw;
      outline: none;
    }
  }
  .rank {
    width: 100%;
    height: 100%;
    background: url(../assets/rankBG.png) no-repeat;
    background-size: 100% 100%;
    position: fixed;
    box-sizing: border-box;
    padding: 20vh 8vw 18vh;
    top: 0;
    left: 0;
    ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 5vw;
      li {
        flex: 1;
        width: 100%;
        background-color: rgba(226, 198, 180, 0.3);
      }
      li:first-of-type {
        dd {
          @redFont();
        }
      }
      li:nth-of-type(odd) {
        background-color: rgba(231, 208, 205, 0.3);
      }
    }
    dl {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      dd {
        flex: 1.1;
        white-space: nowrap;
        color: black;
        font-size: 4vw;
        font-weight: 500;
        width: 0;
        height: 100%;
        line-height: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
          width: 100%;
        }
      }
      dd:first-of-type {
        flex: 0.7;
        @redFont();
      }
    }
    .closeButton {
      border: none;
      background: url(../assets/closeButton.png) no-repeat;
      background-size: 100% 100%;
      width: 70vw;
      position: absolute;
      height: 20vw;
      bottom: 3vh;
      left: 15vw;
      outline: none;
    }
  }
  .icon {
    display: block;
    position: absolute;
    background: url(../assets/home_icon.png) no-repeat;
    background-size: 100% 100%;
    width: 20vw;
    height: 20vw;
    right: 0;
    bottom: 20vh;
  }
  .button {
    position: absolute;
    background: url(../assets/home_startGame.png) no-repeat;
    background-size: 100% 100%;
    border: none;
    outline: none;
    width: 60vw;
    height: 20vw;
    bottom: 10vh;
    left: 20vw;
  }
}
</style>
