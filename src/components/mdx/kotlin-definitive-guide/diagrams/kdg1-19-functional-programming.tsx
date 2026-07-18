import { OfficialKdg1BookLab } from "./official-kdg1-book-lab";

const nodes = [
  "19. Functional Programming Basics",
  "Function Categories",
  "Transforms",
  "Filters",
  "Combines",
  "Why Functional Programming?",
  "Sequences",
  "For the More Curious: Profiling",
  "For the More Curious: Arrow.kt",
  "Challenge: Reversing the Values in a Map",
  "Challenge: Applying Functional Programming to Tavern.kt",
  "Challenge: Sliding Window"
];

export function KdgModelLab() { return <OfficialKdg1BookLab mode="model" unitTitle="19. Functional Programming Basics" focus="用变换、过滤、合并和惰性Sequence构造透明数据管线，并通过评估定位代价" nodes={nodes} />; }
export function KdgFailureLab() { return <OfficialKdg1BookLab mode="failure" unitTitle="19. Functional Programming Basics" focus="把链式调用等同函数式设计，却在lambda中修改外部状态" nodes={nodes} />; }
export function KdgEvidenceLab() { return <OfficialKdg1BookLab mode="evidence" unitTitle="19. Functional Programming Basics" focus="输入输出表、纯函数边界、求值次数、序列性能对照和滑窗测试" nodes={nodes} />; }
