/** 复习题库 · 官方七章学习地图（ico-learning-map）。 */

import type { ReviewQuestion } from "./types";

export const icoLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ico-lm-1",
    chapter: "ico-learning-map",
    level: 1,
    question: "第一版官方七章分别回答对象模型的哪一层问题？",
    answer:
      "第1章建立 object model/static-dynamic view；第2章解释 default/copy constructor synthesis 与初始化变换；第3章讲 data binding/layout/access；第4章讲 member invocation、virtual/thunk/member pointer/inline；第5章讲完整 construction/copy/destruction state；第6章讲 storage、new/delete、temporary；第7章讲 template、exception、RTTI 与 DSO/shared-memory 边界。",
    tags: ["官方七章", "学习路线"],
  },
  {
    id: "ico-lm-2",
    chapter: "ico-learning-map",
    level: 2,
    question:
      "为什么 representation、program transformation、lifetime state machine、deferred decisions 必须按依赖关系学习？",
    answer:
      "representation 先定义 object/subobject/metadata 在哪里；transformation 才能解释 this、constructor、slot/thunk 如何操作它；lifetime 决定这些 bytes 在哪个 phase 是合法 object；template/exception/RTTI 再在 compile/runtime 使用 metadata 做晚决议。跳过前层会把 vtable、new、RTTI 误解成孤立魔法。",
    tags: ["机制依赖", "对象表示", "生命周期"],
  },
  {
    id: "ico-lm-3",
    chapter: "ico-learning-map",
    level: 3,
    question:
      "如何用 language guarantee、implementation ABI、experimental evidence 三栏记录一次 virtual-call 实验？",
    answer:
      "guarantee 写 base virtual call 必须产生 final overrider 的 observable behavior；ABI 栏写当前 target 预计通过 vptr/slot/可能 thunk 实现；experiment 固定 compiler/options，记录 base-view address、slot target、adjusted this、assembly 与 output。vptr offset/shape 只能归 ABI/实验，不能升格为语言规定。",
    tags: ["证据边界", "ABI", "实验"],
  },
  {
    id: "ico-lm-4",
    chapter: "ico-learning-map",
    level: 4,
    question:
      "设计一个同时覆盖 virtual base、copy、array-new failure 与 RTTI 的跨章节 probe，需要记录哪些工件？",
    answer:
      "先画唯一 virtual base/direct bases/members/vptr views；记录 constructor/copy/destructor counters 与 base address adjustment；array 第 k 个 throw 应只逆序销毁前 k 个 complete elements并释放 allocation；local polymorphic pointer/reference dynamic_cast 分别验证 success/null/bad_cast。把调用顺序归 language semantics，把 offsets/cookie/RTTI layout 归 ABI observation。",
    tags: ["综合实验", "虚继承", "异常路径", "RTTI"],
  },
];

export default icoLearningMapQuestions;
