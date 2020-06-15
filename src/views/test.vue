<template>
  <div></div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST
}
@Component
export default class test extends Vue {
  dir: Direction = Direction.WEST;
  mounted(): void {
    console.log(this.dir);
  }
}
</script>
