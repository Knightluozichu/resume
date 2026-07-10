import type { ReviewQuestion } from "./types";

export const gmaMdfFrameworkQuestions: ReviewQuestion[] = [
  {
    id: "gma-mdf-framework-1",
    chapter: "gma-mdf-framework",
    level: 1,
    question: `Machinations 框架的七个核心元素是什么？`,
    answer: `1. 源（Source）——自动产生资源。2. 池（Pool）——存储资源。3. 转换器（Converter）——将一种资源变为另一种。4. 排水（Drain）——消耗/移除资源。5. 闸门（Gate）——根据条件分流资源。6. 触发器（Trigger）——在特定条件下激活事件。7. 注册器（Register）——存储状态变量供其他元素引用。这七个元素通过资源流连接，构成可视化的游戏经济结构图。`,
    tags: ["Machinations", "核心元素"],
  },
  {
    id: "gma-mdf-framework-2",
    chapter: "gma-mdf-framework",
    level: 2,
    question: `Machinations 中「资源流」和「信息流」有什么区别？`,
    answer: `资源流（实线箭头）传输实际的游戏资源——金币从源流到池，材料从池流到转换器变为装备。信息流（虚线箭头）传输状态信息但不传输资源——注册器记录当前金币数，闸门读取这个数字决定是否放行。区别在于：资源流改变资源的量和位置，信息流只读取状态用于决策。例如：玩家金币&gt;100 时商店打折——信息流（读取金币数）控制闸门（打折与否），但金币本身不流动。`,
    tags: ["Machinations", "资源流", "信息流"],
  },
  {
    id: "gma-mdf-framework-3",
    chapter: "gma-mdf-framework",
    level: 3,
    question: `用 Machinations 元素画一个简单的「刷怪→掉落→升级」循环，并分析它是正反馈还是负反馈。`,
    answer: `结构：源（怪物刷新）→ 池（怪物池）→ 转换器（击杀：怪物→经验+掉落）→ 池（经验池）→ 闸门（经验&gt;阈值时触发）→ 触发器（升级）→ 注册器（等级↑）→ 信息流回到转换器（等级越高伤害越高）。这是正反馈环：杀怪→经验→升级→更强→杀更快→更多经验。滚雪球效应。如果不加限制，玩家会越来越强到无挑战。解决：加入负反馈——怪物等级随玩家等级提升（动态难度），或升级所需经验指数增长（边际递减）。`,
    tags: ["Machinations", "反馈环路", "正反馈"],
  },
  {
    id: "gma-mdf-framework-4",
    chapter: "gma-mdf-framework",
    level: 4,
    question: `为什么 Machinations 框架能帮助发现「隐藏的反馈环路」？给出一个实际设计中的例子。`,
    answer: `Machinations 把游戏经济结构显式画成图，设计师能看到平时隐藏在代码和规则中的资源流动路径。隐藏环路指设计师未意识到的反馈链。例：设计一个卡牌游戏，意图是「能量限制出牌节奏」。但用 Machinations 画图后发现隐藏环路：抽卡（源）→手牌（池）→出牌消耗能量（排水）→但某些卡牌效果是「每出一张牌恢复1能量」（触发器→源），形成正反馈：出牌越多→能量越多→出牌更多。设计师本意是能量限制，但隐藏环路让能量变成了正反馈，导致 combo 流无敌。Machinations 图让这个环路一目了然。修复：限制能量恢复卡的数量或设置上限。`,
    tags: ["Machinations", "隐藏反馈", "综合分析"],
  },
];
