import type { ReviewQuestion } from "./types";

export const cswAnimationTransitionQuestions: ReviewQuestion[] = [
  {
    id: "csw-animation-transition-1",
    chapter: "csw-animation-transition",
    level: 2,
    question: `transition 和 @keyframes animation 的本质区别是什么？各适合什么场景？`,
    answer:
      `transition：被动触发，状态变化时自动补间，需明确起止两态，到位停止。适合 hover/click 等交互反馈（按钮上浮、颜色渐变）。@keyframes animation：主动驱动，设定关键帧后自动播放，可无限循环，无需状态触发。适合持续动画（加载旋转、呼吸效果、入场动画）。核心区别：transition 是「两态之间的补间」，animation 是「多关键帧的序列」；transition 到位即停，animation 可循环；transition 需要触发条件，animation 自驱动。`,
    tags: ["transition", "animation", "对比"],
  },
  {
    id: "csw-animation-transition-2",
    chapter: "csw-animation-transition",
    level: 3,
    question: `为什么动画应优先用 transform/opacity 而非 width/top？will-change 应该如何正确使用？`,
    answer:
      `transform/opacity 是合成属性，浏览器把元素提升到独立合成层，直接在 GPU 移动/调整已绘制好的位图，不触发重排也不重绘，主线程几乎无负担。width/top 是布局属性，修改触发重排（重新计算所有受影响元素位置尺寸），再重绘，主线程负担重，容易掉帧。will-change 提前告知浏览器将变化的属性以创建合成层优化。正确用法：①只在即将动画的元素上加；②明确指定属性（will-change:transform 而非 all）；③动画结束后移除（避免显存浪费）。`,
    tags: ["性能", "will-change", "合成层", "transform"],
  },
  {
    id: "csw-animation-transition-3",
    chapter: "csw-animation-transition",
    level: 3,
    question: `ease-out、ease-in、ease-in-out、linear 各是什么样的缓动曲线？适合什么场景？`,
    answer:
      `ease-out：快→慢，先快速变化再减速到位，出场/消失首选（元素快速出现再缓缓停稳）。ease-in：慢→快，先缓慢再加速，进场/出发（元素缓缓启动再加速离开）。ease-in-out：慢-快-慢，两端缓中段快，通用对称动画。linear：匀速，机械感强，慎用——自然界的运动很少匀速，适合进度条等机械场景。自定义贝塞尔曲线 cubic-bezier(0.4,0,0.2,1) 可精确控制节奏。出场用 ease-out、进场用 ease-in 是常见的设计直觉。`,
    tags: ["缓动函数", "timing-function", "ease"],
  },
  {
    id: "csw-animation-transition-4",
    chapter: "csw-animation-transition",
    level: 4,
    question: `transition:all 有什么问题？display 和 auto 值为什么不能过渡？`,
    answer:
      `transition:all 的问题：①尝试过渡所有变化的属性，包括不需要过渡的，性能差；②容易产生意外动画——改个 padding 触发不预期的过渡。应明确指定属性如 transition:transform 0.3s, opacity 0.2s。display 和 auto 值不能过渡的原因：transition 需要数值才能在两态间插值补间。display:none↔block 是离散切换无中间值；height:auto 的实际像素值不确定（取决于内容），浏览器无法在 auto 和 100px 之间插值。解决方案：用 max-height 代替 height:auto（设一个足够大的值），或用 JS 读取实际高度再设固定值过渡，或用 transform/opacity 替代 display 切换。`,
    tags: ["transition", "transition:all", "display", "auto"],
  },
];
