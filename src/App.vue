<template>
  <div id="app">
    <router-view />
    <tips :val="showMsg"></tips>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from "vue-property-decorator";
import tips from "./components/tips.vue";
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

  private isTips(e: string) {
    this.showMsg = e;
  }
}
</script>
<style lang="less">
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
