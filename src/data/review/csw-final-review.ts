import type { ReviewQuestion } from "./types";

export const cswFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "csw-final-review-1",
    chapter: "csw-final-review",
    level: 3,
    question: `用全书四层知识解释「一个卡片 hover 上浮动画」的完整渲染过程。`,
    answer:
      `①流与盒模型：卡片用 box-sizing:border-box 确保尺寸所见即所得，padding/border 向内挤压不撑破布局；②布局体系：卡片内部用 flex 排列（gap 替代 margin 避免合并），外层用 grid 定位；③文本排版：标题用 line-height:1.5（无单位值让子元素行高自适应）+ white-space:nowrap+overflow:hidden+text-overflow:ellipsis 实现单行省略；④视觉动效：hover 时 transform:translateY(-4px)，配合 transition:transform 0.3s ease-out 平滑过渡。transform 不触发重排（只合成），transition 用 ease-out（快→慢出场首选）。will-change:transform 提前提升合成层优化。`,
    tags: ["综合", "渲染旅程", "四层串联"],
  },
  {
    id: "csw-final-review-2",
    chapter: "csw-final-review",
    level: 3,
    question: `全书四层核心知识是什么？每层解决什么问题？`,
    answer:
      `①流与盒模型（正常流/浮动/BFC/盒模型）解决「元素怎么排、盒子多大」——是所有上层布局的基底；②文本与排版（装饰/换行/行高）解决「文字怎么断、行怎么排」——控制文字呈现；③布局体系（Flex/Grid）解决「元素放哪」——精确控制空间分配与定位；④视觉与动效（transform/animation）解决「怎么动」——驱动交互视觉。每层解决上层遗留问题：流与盒能排但控制不了文字→文本层补断行；文本能断但放不准→布局层补定位；布局能放但不能动→动效层补运动。核心主线：流与盒决定怎么排→文本决定怎么断→布局决定怎么放→动效决定怎么动。`,
    tags: ["综合", "四层知识", "依赖链"],
  },
  {
    id: "csw-final-review-3",
    chapter: "csw-final-review",
    level: 4,
    question: `为什么说「把属性当终点的人写出的页面脆弱，把渲染机制当核心的人才能写出可控的 CSS」？`,
    answer:
      `属性是表层的——照文档抄 display:flex、margin:20px 谁都会。但遇到「浮动塌陷」「margin 合并导致间距不对」「line-height 继承后行高异常」「flex:1 分配结果和预期不同」「动画卡顿」这些问题时，只懂属性的人无从下手。懂渲染机制的人知道：塌陷是浮动脱离流导致高度计算不含浮动子，合并是正常流相邻块级取大值规则，行高异常是无单位值动态重算 vs 带单位值固定继承，flex 分配是 basis 先占剩余再按 grow 分，卡顿是动画了触发重排的属性。机制是「为什么」，属性是「是什么」，工程判断力来自前者。`,
    tags: ["综合", "工程思维", "渲染机制"],
  },
  {
    id: "csw-final-review-4",
    chapter: "csw-final-review",
    level: 4,
    question: `用 CSS 渲染机制解释以下现象：①flex 子元素 margin 不合并 ②transform 动画比 top 流畅 ③line-height:1.5 比 24px 安全`,
    answer:
      `①flex 子元素 margin 不合并：flex 容器为子元素建立「flex 格式化上下文」，独立于正常流，正常流的 margin 合并规则（相邻块级取大值）不适用，所以 flex 子元素间距 = margin 之和而非取大值。②transform 动画比 top 流畅：transform 是合成属性，操作合成层位图，不触发重排不重绘，只 GPU 合成；top 是定位属性，修改触发重排（重新计算布局）再重绘，主线程负担重易掉帧。③line-height:1.5 比 24px 安全：1.5 是无单位值，子元素继承比例因子，在自身 font-size 上动态重算（子元素 20px→30px）；24px 是固定值，子元素继承 24px 不变，子元素字号大于 24px 时行高不足文字重叠。无单位值让行高随字号自适应。`,
    tags: ["综合", "格式化上下文", "合成层", "继承"],
  },
];
