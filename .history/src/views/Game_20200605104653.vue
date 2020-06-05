<template>
  <div class="game">game</div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
@Component({})
export default class Game extends Vue {
  @Inject()
  private isTip!: Function;
}
</script>

<style lang="ts"></style>
