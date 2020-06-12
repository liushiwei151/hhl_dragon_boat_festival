<template>
  <div class="BGbox" :style="{ height: Height + 'px' }">
    <div class="home">
      <i class="icon" @click="showModal('rank')"></i>
      <button class="button" @click="startGame"></button>
      <button class="actRule" @click="showModal('rule')"></button>
      <!-- 排行榜 -->
      <transition name="fade">
        <div class="rank" v-show="isRankShow">
          <ul>
            <li v-for="(item, index) in rankInfo" :key="index">
              <dl>
                <dd>{{ item.rank }}</dd>
                <dd>{{ item.memberNo }}</dd>
                <dd>
                  <span>{{ item.nickName }}</span>
                </dd>
                <dd>{{ item.score }}</dd>
              </dl>
            </li>
            <li v-for="(a, b) in rankLength" :key="11 + b">
              <dl>
                <dd></dd>
                <dd></dd>
                <dd>
                  <span></span>
                </dd>
                <dd></dd>
              </dl>
            </li>
            <li>
              <dl>
                <dd>{{ meRank.rank }}</dd>
                <dd>{{ meRank.memberNo }}</dd>
                <dd>
                  <span>{{ meRank.nickName }}</span>
                </dd>
                <dd>{{ meRank.score }}</dd>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import api from "../api";
interface RankInfoInter {
  rank: string | number;
  memberNo: string | number;
  nickName: string;
  score: string | number;
}
interface Data {
  code: number;
  msg?: string;
  data?: any;
}
interface Api {
  data: Data;
  status: number;
  statusText: string;
  headers: object;
  config: object;
  request?: object;
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
  rankInfo: Array<RankInfoInter> = [];
  //背景的固定高度
  Height = 0;
  //自己的排名
  meRank: RankInfoInter = {
    rank: "",
    memberNo: "",
    nickName: "",
    score: ""
  };

  get rankLength(): number {
    if (this.rankInfo.length <= 11) {
      return 11 - this.rankInfo.length;
    } else {
      return 0;
    }
  }
  created(): void {
    this.getUserInfo();
  }
  mounted(): void {
    this.Height = window.innerHeight;
  }
  //处理url获取地址的值
  openid(): string {
    // const url = location.href;
    const url =
      "http://qrhhl.yunyutian.cn/boat/index.html?openid=oXslc0zEvV5RwspCzgWcQMmL-_yA#/";
    if (url.split("=")[1].indexOf("&") < 0) {
      if (url.split("=")[1].indexOf("#") < 0) {
        return url.split("=")[1];
      } else {
        return url.split("=")[1].split("#")[0];
      }
    } else {
      return url.split("=")[1].split("&")[0];
    }
  }
  //获取用户信息接口
  getUserInfo() {
    const self = this;
    const data = this.openid();
    self.isTip("wait");
    api.userInfo(data).then((res: Api) => {
      if (res.data.code === 200) {
        self.isTip(false);
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        self.meRank = {
          rank: res.data.data.rank,
          memberNo: res.data.data.memberNo,
          nickName: res.data.data.nickName,
          score: res.data.data.score
        };
      } else {
        self.isTip(res.data.msg);
      }
    });
  }
  rankingList() {
    const self = this;
    self.isTip("wait");
    (api as any).rankingList().then((res: Api) => {
      self.isTip(false);
      if (res.data.code === 200) {
        const value: any = res.data.data as RankInfoInter;
        value.unshift({
          rank: "排名",
          memberNo: "用户编号",
          nickName: "昵称",
          score: "粽子数量"
        });
        self.rankInfo = value;
        self.isRankShow = true;
      } else {
        self.isTip(res.data.msg);
      }
    });
  }
  // 显示弹框
  showModal(e: string) {
    if (e === "rank") {
      this.rankingList();
    } else if (e === "rule") {
      this.isRuleShow = true;
    } else if (e === "share") {
      this.isShareShow = true;
    }
  }
  //关闭弹框
  closeModal(e: string) {
    if (e === "rank") {
      this.isRankShow = false;
    } else if (e === "rule") {
      this.isRuleShow = false;
    } else if (e === "share") {
      this.isShareShow = false;
    }
  }
  //开始游戏
  startGame() {
    const self = this;
    const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
    if (userInfo.frequency <= 0) {
      self.showModal("share");
      return;
    }
    self.isTip("wait");
    (api as any).playGame(userInfo.openid).then((res: Api) => {
      self.isTip(false);
      if (res.data.code === 200) {
        const gameId = res.data.data;
        self.$router.push({ path: "/Game", query: { id: gameId } });
      } else {
        self.isTip(res.data.msg);
      }
    });
  }
}
</script>
<style scoped lang="less">
@redFont: {
  font-size: 4.5vw;
  font-weight: 600;
  color: rgb(173, 43, 43);
};
.BGbox {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bigBG.jpg) no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home {
  position: relative;
  width: 100vw;
  height: 161.066vw;
  background: url(../assets/home_bg.png) no-repeat;
  background-size: 100% 100%;
  .actRule {
    border: none;
    position: absolute;
    left: 0;
    top: 10vh;
    width: 20.5vw;
    height: 9.3vw;
    padding: 0;
    background: url(../assets/actRule.png);
    background-size: 100% 100%;
    outline: none;
  }
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
    bottom: 5vh;
    left: 20vw;
  }
}
</style>
