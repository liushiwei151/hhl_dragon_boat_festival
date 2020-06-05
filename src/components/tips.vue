<template>
  <div class="tips" v-show="val !== false">
    <span class="text" v-show="val !== 'wait'">{{ val }}</span>
    <div class="wait" v-show="val === 'wait'"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({})
export default class Tips extends Vue {
  @Prop() val!: string | boolean;

  mounted(): void {
    // console.log(this.val === false);
  }
}
</script>

<style lang="less" scoped>
.tips {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .wait {
    background: url(../assets/loading-2.gif) no-repeat;
    width: 10vw;
    height: 10vw;
    background-size: 100% 100%;
  }
  .text {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 1vw;
    max-width: 90vw;
    padding: 2vw 5vw;
    color: #fff;
    word-break: break-all;
  }
}
</style>
