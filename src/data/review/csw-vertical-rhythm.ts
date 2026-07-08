import type { ReviewQuestion } from "./types";

export const cswVerticalRhythmQuestions: ReviewQuestion[] = [
  {
    id: "csw-vertical-rhythm-1",
    chapter: "csw-vertical-rhythm",
    level: 2,
    question: "line-height 无单位值和带单位值在继承时有什么本质区别？",
    answer:
      "无单位值（如 1.5）：子元素继承的是比例因子 1.5，会在子元素自身的 font-size 上重新计算。父元素 16px → 行高 24px；子元素 20px → 行高 30px（1.5×20）。带单位值（如 24px）和百分比（如 150%）：在设置元素上就计算成固定值 24px，子元素继承的是 24px 这个固定值而非比例。子元素 20px → 行高还是 24px，可能小于字号导致文字重叠。本质区别：无单位值传递「比例」（动态重算），带单位/百分比传递「计算结果」（固定继承）。",
    tags: ["line-height", "继承", "无单位值"],
  },
  {
    id: "csw-vertical-rhythm-2",
    chapter: "csw-vertical-rhythm",
    level: 3,
    question: "为什么图片下方会有几像素的间隙？如何消除？",
    answer:
      "原因：img 是 inline 元素，默认 vertical-align:baseline，图片底部与文字基线对齐。而基线下方还有「下沉」空间（字母 g/y 等下半部分占的区域），这部分是半行距的下半部分，所以图片底边到容器底边之间留出了这段空隙。解决方案：①vertical-align:middle/top/bottom（改变对齐方式，不再贴基线）；②display:block（变成块级，脱离行盒，无基线问题）；③父容器 line-height:0（消除半行距）。最推荐 vertical-align:middle 或 display:block。",
    tags: ["vertical-align", "图片间隙", "baseline"],
  },
  {
    id: "csw-vertical-rhythm-3",
    chapter: "csw-vertical-rhythm",
    level: 3,
    question: "行盒模型的组成部分是什么？行距如何计算？",
    answer:
      "行盒（Line Box）是一行文字所在的矩形区域，高度 = line-height × font-size。内部组成：内容区（高度 = font-size，文字实际占据的区域）+ 上下半行距。行距 = (line-height - 1) × font-size，上下各分一半为半行距。例如 font-size:16px、line-height:1.5：行盒高度 = 24px，内容区 = 16px，行距 = (1.5-1)×16 = 8px，上下各 4px 半行距。inline/inline-block 元素在行盒内按 vertical-align 对齐。",
    tags: ["行盒", "行距", "line-height"],
  },
  {
    id: "csw-vertical-rhythm-4",
    chapter: "csw-vertical-rhythm",
    level: 4,
    question: "什么是垂直韵律？如何用基线倍数建立统一的间距系统？",
    answer:
      "垂直韵律是让所有垂直间距成为基线（基础单位）的整数倍，形成视觉节奏感。做法：定义一个基础基线（如 8px），所有字号、行高、间距都设为它的倍数。例如基线 8px：标题 24px(3×) line-height 1.33、段落 16px(2×) line-height 1.5、段间距 16px(2×)、节间距 32px(4×)。这样所有元素在垂直方向上对齐到同一网格，视觉节奏统一不杂乱。vertical-align 只对 inline/inline-block 生效（基于行盒基线），对块级无效——块级垂直对齐靠 margin/padding 控制到基线倍数。",
    tags: ["垂直韵律", "基线", "间距系统"],
  },
];
