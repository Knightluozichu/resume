import type { ReviewQuestion } from "./types";

export const gmpEngineBasicsQuestions: ReviewQuestion[] = [
  {
    id: "gmp-engine-basics-1",
    chapter: "gmp-engine-basics",
    level: 1,
    question: "游戏循环的核心步骤是什么？每帧执行什么？",
    answer: "游戏循环每帧执行：1. 输入采集（读键盘/手柄/触摸）→ 2. 逻辑更新（Update，游戏逻辑）→ 3. 物理模拟（FixedUpdate，碰撞/力学）→ 4. 渲染（Render，画到屏幕）→ 5. 显示（SwapBuffers）。60fps 每帧 16ms，五个步骤必须在这 16ms 内完成。",
    tags: ["游戏循环", "每帧步骤"],
  },
  {
    id: "gmp-engine-basics-2",
    chapter: "gmp-engine-basics",
    level: 2,
    question: "为什么现代引擎用组件系统而非继承？",
    answer: "继承的问题：层级深修改难（加功能改整个继承链）、菱形继承冲突、不灵活（飞行敌人需多重继承很复杂）。组件系统优势：功能按需组合（需要什么加什么组件）、修改局部（改一个组件不影响其他）、复用性强（同一个 FlyComponent 用于飞行敌人/道具/坐骑）。组合优于继承是现代引擎主流设计。",
    tags: ["组件系统", "继承", "组合优于继承"],
  },
  {
    id: "gmp-engine-basics-3",
    chapter: "gmp-engine-basics",
    level: 3,
    question: "固定时间步长和可变时间步长分别用于什么？为什么物理需要固定步长？",
    answer: "固定步长（FixedUpdate）：固定间隔执行用于物理模拟。物理需要固定步长因为：物理积分稳定性依赖固定 dt（可变 dt 会导致物体速度/位置计算不稳定），确定性要求（相同输入相同结果，用于回放/网络同步）。可变步长（Update）：每帧间隔不固定用于逻辑和渲染，适应帧率波动保证流畅。两者结合是现代引擎标准做法。",
    tags: ["固定步长", "可变步长", "物理确定性"],
  },
  {
    id: "gmp-engine-basics-4",
    chapter: "gmp-engine-basics",
    level: 4,
    question: "资源管理的加载/卸载策略是什么？如何避免启动时全量加载？",
    answer: "策略：1. 按需加载（用到才加载，如进入关卡才加载关卡资源）。2. 引用计数（追踪资源被多少对象引用，归零才卸载）。3. 资源池（复用已加载资源不重复加载）。4. 预加载（关卡切换时后台预加载下一关资源）。5. 延迟卸载（切换场景时不立即卸载旧资源，等新资源加载完再卸）。避免全量加载：启动只加载首屏必需资源，其他按需加载。用 Addressables 或类似系统实现异步加载，加载时显示 Loading 画面。",
    tags: ["资源管理", "按需加载", "引用计数", "综合"],
  },
];
