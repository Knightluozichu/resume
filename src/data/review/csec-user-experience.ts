import type { ReviewQuestion } from "./types";

export const csecUserExperienceQuestions: ReviewQuestion[] = [
  {
    id: "csec-user-experience-1",
    chapter: "csec-user-experience",
    level: 2,
    question: ":focus-visible 和 :focus 的区别是什么？为什么要用前者？",
    answer:
      ":focus 在元素获得焦点时触发——无论是键盘 Tab 还是鼠标点击。这意味着用户用鼠标点击按钮后，按钮会保留一个焦点环，视觉上显得多余。:focus-visible 是浏览器智能判断的伪类——只在「用户需要焦点提示时」触发，即键盘导航时。鼠标点击不触发 :focus-visible，键盘 Tab 才触发。这样键盘用户能看到焦点位置（无障碍必需），鼠标用户不被多余焦点环打扰。最佳实践是 :focus-visible 设高亮样式、:focus:not(:focus-visible) 去掉默认环。",
    tags: [":focus-visible", "无障碍"],
  },
  {
    id: "csec-user-experience-2",
    chapter: "csec-user-experience",
    level: 3,
    question: "scroll-behavior: smooth 设在 html 上和设在具体容器上有什么区别？",
    answer:
      "设在 html（或 :root）上时，影响整个文档的滚动行为——所有 #hash 锚点跳转、所有 scrollIntoView() 调用都会平滑滚动。这通常是全局期望的行为。设在具体容器上时，只影响该容器内部的滚动——当容器内容被滚动到可见区域时用平滑过渡。区别在于作用域：html 是全局文档滚动，容器是局部滚动区域。注意：scroll-behavior 不影响用户手动滚轮滚动，只影响程序化滚动（锚点跳转、scrollTo）。",
    tags: ["scroll-behavior", "平滑滚动"],
  },
  {
    id: "csec-user-experience-3",
    chapter: "csec-user-experience",
    level: 3,
    question: "暗色主题为什么不能简单地把黑白反转？",
    answer:
      "好的暗色主题不是简单取反——白色背景直接反转成纯黑（#000）会刺眼，暗色背景应该是深灰（#1a1a2e）而非纯黑。文字色不应是纯白（#fff）而应是浅灰（#e0e0e0）以降低对比疲劳。彩色在暗色背景上需要提亮饱和度才能保持视觉一致（如 #58a 在暗色模式应为 #7b9ee8）。阴影在暗色模式下应更深更不透明。这些调整需要设计系统层面的 token 映射，而非逐个属性覆盖。",
    tags: ["暗色主题", "prefers-color-scheme"],
  },
  {
    id: "csec-user-experience-4",
    chapter: "csec-user-experience",
    level: 4,
    question: "用 prefers-color-scheme 实现暗色主题时，如何避免页面加载时的颜色闪烁？",
    answer:
      "闪烁（FOUC，Flash of Unstyled Content）的原因是：HTML 先以默认（亮色）渲染，CSS 加载后才应用暗色媒体查询——这个切换瞬间产生闪烁。纯 CSS 方案无法完全避免（CSS 在 HTML 之后才生效）。解决方案：①在 `<head>` 中内联关键 CSS 变量（含 prefers-color-scheme 查询），让首屏渲染前就确定颜色；②用 JS 在 `<head>` 中提前注入一个 script，读取 matchMedia('(prefers-color-scheme: dark)') 并在 documentElement 上加 class，再配合 CSS 变量切换；③服务端根据 prefers-color-scheme 请求头直接输出对应主题的 CSS。方案 ① 最简单、方案 ③ 最彻底。",
    tags: ["暗色主题", "FOUC", "性能"],
  },
];
