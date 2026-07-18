import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "可读语法", input: "需求与输入", action: "迭代器、装饰器、上下文管理器和类机制应让资源与协议更清楚，而不是追求技巧密度。", evidence: "可读语法的测试与迁移记录", invariant: "迭代器、装饰器、上下文管理器和类机制应让资源与协议更清楚，而不是追求技巧密度。" },
  { label: "可分发系统", input: "可读语法", action: "包元数据、模块边界、可重建环境和发布制品把脚本提升为可安装系统。", evidence: "可分发系统的测试与迁移记录", invariant: "包元数据、模块边界、可重建环境和发布制品把脚本提升为可安装系统。" },
  { label: "可追踪生命周期", input: "可分发系统", action: "版本、任务、CI、文档和测试把需求到发布证据串成可重放链。", evidence: "可追踪生命周期的测试与迁移记录", invariant: "版本、任务、CI、文档和测试把需求到发布证据串成可重放链。" },
  { label: "测量后优化", input: "可追踪生命周期", action: "用户目标、基线、剖析和回归测试先于数据结构、并发与缓存方案。", evidence: "测量后优化的测试与迁移记录", invariant: "用户目标、基线、剖析和回归测试先于数据结构、并发与缓存方案。" },
  { label: "Python化设计", input: "测量后优化", action: "协议、组合和函数是一等选择，只有扩展轴确实稳定时才引入更重的模式。", evidence: "Python化设计的测试与迁移记录", invariant: "协议、组合和函数是一等选择，只有扩展轴确实稳定时才引入更重的模式。" },
];
export function PyaFinalReviewModelLab(){return <PythonAdvancedOfficialLab title="全书总复习：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaFinalReviewBoundaryLab(){return <PythonAdvancedOfficialLab title="全书总复习：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaFinalReviewEvidenceLab(){return <PythonAdvancedOfficialLab title="全书总复习：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
