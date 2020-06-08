/**
 * longTap 长按
 */

/* eslint-disable */
let myCustom: any = {};
let timeCounter: any;

function custom(Vue: any, options: any) {
  let timeNum = 0; //定时器计数
  let isLong = false; //长按标志

  Vue.directive("longTap", {
    bind(el: any, binding: any, vNode: any) {
      let pressTime = ~~binding.arg; //长按时常 毫秒
      if (!pressTime) {
        pressTime = 300;
      } //初始化默认时长
      // 确保提供的表达式是函数
      if (typeof binding.value !== "function") {
        // 获取组件名称
        const compName = vNode.context.name;
        // 将警告传递给控制台
        let error = `[longpress:] provided expression '${binding.expression}' is not a function`;
        if (compName) {
          error += `Found in component '${compName}' `;
        }
        console.error(error);
      }
      el.addEventListener("touchstart", (event: any) => {
        isLong = false;
        timeCounter = setTimeout(() => {
          isLong = true;
          console.log();
          binding.value(el.getBoundingClientRect());
        }, pressTime);
      });
      el.addEventListener("touchend", (event: any) => {
        clearInterval(timeCounter);
      });
    }
  });
}
myCustom = {
  install: custom
};
// myCustom.install = custom;
export { myCustom };
