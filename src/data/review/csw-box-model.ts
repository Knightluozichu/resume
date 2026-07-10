import type { ReviewQuestion } from "./types";

export const cswBoxModelQuestions: ReviewQuestion[] = [
  {
    id: "csw-box-model-1",
    chapter: "csw-box-model",
    level: 2,
    question: `一个 width:200px; padding:15px; border:5px 的元素，在 content-box 和 border-box 下实际宽度和内容区宽度各是多少？`,
    answer:
      `content-box（默认）：实际宽度 = 200 + 15×2 + 5×2 = 240px，内容区 = 200px（width 就是内容区）。border-box：实际宽度 = 200px（width 含 border+padding），内容区 = 200 - 15×2 - 5×2 = 160px。关键区别：content-box 的 width 只管内容区，padding/border 向外撑大；border-box 的 width 管整个盒子，padding/border 向内挤压内容区。`,
    tags: ["盒模型", "box-sizing", "尺寸计算"],
  },
  {
    id: "csw-box-model-2",
    chapter: "csw-box-model",
    level: 3,
    question: `margin 合并在哪些场景不发生？为什么 flex 子元素的 margin 不合并？`,
    answer:
      `不合并的场景：① flex/grid 容器的直接子元素；② 浮动元素；③ 绝对/固定定位元素；④ 行内块元素；⑤ 触发了 BFC 的元素之间。flex 子元素不合并的原因：flex 容器为其子元素建立「flex 格式化上下文」，这是独立于正常流的渲染上下文，正常流的 margin 合并规则不适用于它。同理 grid 建立 grid 格式化上下文，BFC 建立块级格式化上下文，都不遵循正常流 margin 合并规则。margin 合并只在「相邻块级正常流」中发生。`,
    tags: ["margin合并", "flex", "格式化上下文"],
  },
  {
    id: "csw-box-model-3",
    chapter: "csw-box-model",
    level: 3,
    question: `margin 合并取大值规则是什么？有哪些阻止合并的手段？`,
    answer:
      `取大值规则：相邻块级元素的垂直外边距合并为 max(margin-a, margin-b) 而非相加。如块A margin-bottom:30、块B margin-top:20，间距 = 30px 非 50px。阻止手段：①父元素触发 BFC（overflow:hidden / display:flow-root）隔离子元素 margin；②中间插入 padding/border/行内块隔断相邻关系；③父元素加 padding-top/border-top 阻止子元素 margin 穿透；④用 flex/grid 布局（其格式化上下文不合并）。注意合并只发生在相邻块级正常流，用 gap 替代 margin 可彻底规避。`,
    tags: ["margin合并", "取大值", "阻止合并"],
  },
  {
    id: "csw-box-model-4",
    chapter: "csw-box-model",
    level: 4,
    question: `为什么现代项目全局设置 box-sizing:border-box？content-box 有什么工程隐患？`,
    answer:
      `content-box（默认）下 width 只管内容区，加 padding/border 后实际宽度变大，容易撑破父容器导致布局错乱——设 width:200px 加 padding:15px border:5px 后实际 240px，如果父容器刚好 200px 就溢出了。border-box 下 width 含 border+padding，所见即所得，设多少实际就是多少，padding/border 向内挤压内容区而非向外撑大，布局可预测。现代项目全局 \`* { box-sizing: border-box; }\` 消除尺寸计算的不可控性，是布局稳定性的基础保障。这也是为什么很多 CSS reset 第一行就是它。`,
    tags: ["盒模型", "border-box", "工程实践"],
  },
];
