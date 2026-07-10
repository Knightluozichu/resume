import type { ReviewQuestion } from "./types";

export const uhmHmiBasicsQuestions: ReviewQuestion[] = [
  {
    id: "uhm-hmi-basics-1",
    chapter: "uhm-hmi-basics",
    level: 1,
    question: `HMI 的全称是什么？它的核心任务是什么？`,
    answer: `HMI 全称 Human-Machine Interface（人机交互界面）。核心任务是：采集数据 → 绑定到 UI → 渲染显示 → 响应交互 → 持续更新。它是连接用户与机器系统的信息桥梁。`,
    tags: ["HMI", "基本概念"],
  },
  {
    id: "uhm-hmi-basics-2",
    chapter: "uhm-hmi-basics",
    level: 2,
    question: `HMI 的三大约束是什么？分别有什么含义？`,
    answer: `实时性：数据从产生到显示的延迟不超过阈值（车载 100ms，工业 50ms）。安全性：界面不能崩溃或显示错误数据，否则可能导致安全事故。确定性：相同输入必须产生相同输出，行为可预测，不能有随机抖动。`,
    tags: ["三大约束", "实时性", "安全性", "确定性"],
  },
  {
    id: "uhm-hmi-basics-3",
    chapter: "uhm-hmi-basics",
    level: 3,
    question: `为什么不建议在 Update 中每帧刷新所有 UI 元素？正确的做法是什么？`,
    answer: `HMI 数据更新频率通常 10-50Hz，渲染帧率 60-120Hz，每帧刷新全部 UI 会造成大量无效操作，浪费 CPU/GPU 资源并可能导致闪烁。正确做法是使用脏标记或事件驱动机制——仅在数据源真正变化时更新对应 UI 元素，未变化的元素保持不变。`,
    tags: ["性能优化", "脏标记", "事件驱动"],
  },
  {
    id: "uhm-hmi-basics-4",
    chapter: "uhm-hmi-basics",
    level: 4,
    question: `HMI 与游戏 UI 的本质区别是什么？如果用游戏 UI 的思路做 HMI 会产生什么问题？`,
    answer: `游戏 UI 追求视觉体验和沉浸感，HMI 追求信息传达效率和操作可靠性。本质区别在于：HMI 的每个像素都有明确含义，每次刷新都有数据来源；游戏 UI 可以有装饰性元素和随意动画。用游戏 UI 思路做 HMI 会导致：随意刷新浪费性能、装饰性动画干扰信息读取、缺少安全约束可能导致误操作。HMI 必须建立三级信息层级（紧急/重要/辅助），按层级分配视觉权重。`,
    tags: ["HMI vs 游戏UI", "信息层级", "综合"],
  },
];
