import type { ReviewQuestion } from "./types";

/** 状态模式章复习题 */
export const dpStateQuestions: ReviewQuestion[] = [
  {
    id: "dp-state-01",
    chapter: "dp-state",
    level: 1,
    question: "状态模式的意图是什么？",
    answer: "状态模式允许一个对象在其内部状态改变时改变它的行为，这个对象看起来像是改变了其类。\n\n核心意图：把「状态相关的行为」分散到独立的状态类中，让对象在不同状态下表现出不同的行为，而不需要用大量的条件判断。每个状态封装成一个类，状态切换 = 替换当前状态对象。对调用方而言，同一个方法在不同状态下自动有不同的行为，仿佛对象「变成了另一种东西」。",
    tags: ["意图", "基础概念"],
  },
  {
    id: "dp-state-02",
    chapter: "dp-state",
    level: 2,
    question: "状态模式和策略模式结构几乎一样，本质区别在哪里？",
    answer: "表面相似：都是「Context 持有一个接口引用，运行时切换实现」，UML 几乎一样。\n\n本质区别在于「谁来决定切换」和「切换的语义」：\n- 策略模式：由客户端（外部）主动选择用哪个策略，策略之间是平等的替代关系，切换是「我决定用哪个算法」。Context 通常不关心策略怎么换，换什么由调用方说了算。\n- 状态模式：由状态对象自己（内部）决定下一状态，状态切换是「当前状态遇到某个事件后自动迁移」。Context 把行为委托给状态对象，状态对象在处理事件时可以改变 Context 的当前状态。\n\n一句话：策略是「我选怎么做」，状态是「我现在是什么样就怎么做，做完可能变成另一个样」。策略模式关心「可替换的算法」，状态模式关心「状态的迁移和不同状态下的行为」。",
    tags: ["对比", "策略模式"],
  },
  {
    id: "dp-state-03",
    chapter: "dp-state",
    level: 3,
    question: "自动售货机有「投币→选择商品→出货」的流程，如何用状态模式设计？",
    answer: "1. 定义状态接口 `VendingState`，声明 `insertCoin()`、`selectProduct()`、`dispense()` 等方法，参数传入售货机 Context。\n2. 具体状态类：\n- `IdleState`（待机）：`insertCoin()` → 切换到 `HasCoinState`；其他操作提示无效。\n- `HasCoinState`（已投币）：`selectProduct()` → 切换到 `DispensingState`；`insertCoin()` 提示已投币。\n- `DispensingState`（出货中）：`dispense()` → 出货，找零，切换回 `IdleState`；期间禁止其他操作。\n3. `VendingMachine`（Context）：持有当前 `VendingState` 引用，所有操作都委托给当前状态：`state.insertCoin(this)`。\n\n关键点：每个状态类只处理「在自己状态下合法的操作」，非法操作直接拒绝或忽略。状态迁移逻辑写在状态类内部（如 `HasCoinState.selectProduct()` 里执行 `machine.setState(new DispensingState())`），而不是写在一个巨大的 `switch` 里。新增状态（如「缺货状态」）只需加一个状态类，不影响其他状态。",
    tags: ["应用", "自动售货机"],
  },
  {
    id: "dp-state-04",
    chapter: "dp-state",
    level: 4,
    question: "状态模式如何消除大量的 if-else / switch 状态判断？这种消除带来了什么代价？",
    answer: "消除机制：\n不用状态模式时，每个方法里都有 `switch (state) { case A: ...; case B: ...; }`，N 个方法 × M 个状态 = N×M 个分支，且每个状态的逻辑散落在各个方法中，改一个状态要翻遍所有方法。\n\n状态模式把「每个状态的所有行为」收敛到一个状态类里。Context 不再做判断，直接 `state.handle()`，具体走到哪个分支由「当前是哪个状态对象」决定。分支判断从「运行时 switch」变成了「编译期多态分派」。\n\n带来的代价：\n1. 类数量增加：每个状态一个类，状态多时类爆炸。\n2. 状态迁移逻辑分散：迁移规则散落在各状态类中（A 知道自己迁到 B，B 知道迁到 C），想看清全局状态机需要把所有状态类读一遍。可用状态转换表补充文档化。\n3. 状态间可能需要互相引用：状态切换时要 new 下一个状态，状态类之间产生依赖。\n\n适用判断：状态数量适中（3 个以上）、行为差异大、状态可能扩展时用状态模式收益最大。如果只有 2 个状态且不会变，一个 if-else 更直接。",
    tags: ["消除 if-else", "代价", "权衡"],
  },
];
