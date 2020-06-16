<template>
  <div id="app">
    <router-view />
    <tips :val="showMsg"></tips>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue, Provide, Watch } from "vue-property-decorator";
import api from "./api";
import tips from "./components/tips.vue";
interface Data {
  code: number;
  msg?: string;
  data?: object;
}
interface Api {
  data: Data;
  status: number;
  statusText: string;
  headers: object;
  config: object;
  request?: object;
}
@Component({
  components: {
    tips
  }
})
export default class App extends Vue {
  @Provide()
  public isTip = this.isTips;
  @Watch("showMsg")
  showMsgWatch(newData: string | boolean) {
    console.log(newData);
    if (newData !== false && newData !== "wait") {
      setTimeout(() => {
        this.showMsg = false;
      }, 1500);
    }
  }
  //弹出tips的值 false关闭 wait等待 别的字符串直接显示
  showMsg: string | boolean = false;
  created(): void {
    if (this.$route.name !== "Home") {
      this.$router.push("/");
    }
    this.getJsSign();
  }
  //wx禁止调整字体大小
  /* global WeixinJSBridge */
  /*eslint no-undef: "error"*/
  // prohibitFontSize() {
  //   const handleFontSize = function() {
  //     // 设置网页字体为默认大小
  //     WeixinJSBridge.invoke("setFontSizeCallback", {
  //       fontSize: 0
  //     });

  //     // 重写设置网页字体大小的事件
  //     WeixinJSBridge.on("menu:setfont", function() {
  //       WeixinJSBridge.invoke("setFontSizeCallback", {
  //         fontSize: 0
  //       });
  //     });
  //   };
  //   if (
  //     typeof WeixinJSBridge == "object" &&
  //     typeof WeixinJSBridge.invoke == "function"
  //   ) {
  //     handleFontSize();
  //   } else {
  //     if (document.addEventListener) {
  //       document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
  //     } else if (document.attachEvent) {
  //       document.attachEvent("WeixinJSBridgeReady", handleFontSize);

  //       document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
  //     }
  //   }
  // }
  getJsSign() {
    const self = this;
    const wx = Vue.prototype.wx;
    const share = {
      title: "端午赛龙舟，好礼派送中！",
      desc: "接粽子就能赢大礼，超丰厚福利！",
      link: "https://wx.hhl1916.com/huanghelou1916-center/wx/gCode?name=toBoat",
      imgUrl: "https://pic.cwyyt.cn/upload/img/20200612/1623222322_longzhou.jpg"
    };
    api.getJsSign(location.href).then(res => {
      if (res.data.code === 200) {
        wx.config({
          debug: false,
          appId: res.data.data.appid,
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature, // 必填，签名
          jsApiList: [
            "hideMenuItems",
            "onMenuShareAppMessage",
            "onMenuShareTimeline"
          ] // 必填，需要使用的JS接口列表
        });
        wx.ready(function() {
          wx.hideMenuItems({
            menuList: [
              "menuItem:editTag",
              "menuItem:copyUrl",
              "menuItem:originPage",
              "menuItem:openWithQQBrowser",
              "menuItem:openWithSafari",
              "menuItem:share:email",
              "menuItem:share:brand"
            ]
          });
          wx.onMenuShareTimeline({
            title: share.title, // 分享标题
            link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share.imgUrl, // 分享图标
            success: function() {
              // 设置成功
              self.shareGame();
            }
          });
          wx.onMenuShareAppMessage({
            title: share.title, // 分享标题
            desc: share.desc, //分享描述
            link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share.imgUrl, // 分享图标
            type: "", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
              // 设置成功
              self.shareGame();
            }
          });
        });
      } else {
        self.isTip(res.data.msg);
      }
    });
  }
  //分享游戏
  shareGame() {
    const self = this;
    const data = JSON.parse(localStorage.getItem("userInfo") as string).openid;
    (api as any).shareGame(data).then((res: Api) => {
      if (res.data.code === 200) {
        self.isTips("分享成功");
        console.log(res.data.data);
      } else {
        self.isTips(res.data.msg as string);
      }
    });
  }
  private isTips(e: string) {
    this.showMsg = e;
  }
}
</script>
<style lang="less">
* {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
html,
body,
ul,
dl {
  margin: 0;
  padding: 0;
}
li,
dd {
  list-style-type: none;
  margin: 0;
}
</style>
