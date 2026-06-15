/** 复习题库 · 使用布局与部件创建用户界面（bnrg-layouts）。Big Nerd Ranch Guide 第 10 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgLayoutsQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-ly-1",
    chapter: "bnrg-layouts",
    level: 1,
    question: "LinearLayout、RelativeLayout（ConstraintLayout）各适合什么场景？",
    answer:
      "LinearLayout：子 View 单行或单列排列，简单表单。ConstraintLayout：复杂嵌套布局、减少层级、性能更好——用约束关系定位子 View，替代多层 LinearLayout 嵌套。",
    tags: ["布局", "ConstraintLayout"],
  },
  {
    id: "bnrg-ly-2",
    chapter: "bnrg-layouts",
    level: 1,
    question: "`wrap_content` 和 `match_parent`（`0dp` 在 ConstraintLayout 中）各表示什么？",
    answer:
      "wrap_content：View 大小包裹内容。match_parent：填满父容器剩余空间。ConstraintLayout 里宽高设为 0dp 表示 MATCH_CONSTRAINT——在约束范围内尽可能扩展。",
    tags: ["尺寸", "属性"],
  },
  {
    id: "bnrg-ly-3",
    chapter: "bnrg-layouts",
    level: 2,
    question: "为什么深层嵌套的 LinearLayout 会导致性能问题？",
    answer:
      "每层嵌套多一轮 measure/layout  pass。深层嵌套意味着多次递归测量，主线程耗时增加，复杂列表滚动时可能掉帧。ConstraintLayout 扁平化布局可减少嵌套层级。",
    tags: ["性能", "嵌套"],
  },
  {
    id: "bnrg-ly-4",
    chapter: "bnrg-layouts",
    level: 2,
    question: "ViewBinding 相比 findViewById 的优势？",
    answer:
      "编译期生成类型安全的绑定类，空安全和类型安全——不存在错误 ID 或类型转换。findViewById 运行时查找，可能返回 null 或 ClassCastException。ViewBinding 无反射开销。",
    tags: ["ViewBinding", "findViewById"],
  },
  {
    id: "bnrg-ly-5",
    chapter: "bnrg-layouts",
    level: 3,
    question: "ConstraintLayout 里两个 Button 水平居中并排，最少需要几条约束？",
    answer:
      "每个 Button 至少需要：水平方向 start/end 或 left/right 约束到 parent 或彼此；垂直方向 top/bottom 约束到 parent。两个并排 Button：左 Button 的 start→parent start，end→右 Button start；右 Button 的 end→parent end，start→左 Button end；两者 top/bottom→parent。",
    tags: ["ConstraintLayout", "约束"],
  },
];

export default bnrgLayoutsQuestions;
