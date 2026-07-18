import { PythonAdvancedOfficialLab, type PythonAdvancedCase } from "./official-lab";
const cases: PythonAdvancedCase[] = [
  { label: "语言与API", input: "需求与输入", action: "第1至4章从环境、函数级语法、类级机制推进到命名与公共API。", evidence: "语言与API的测试与迁移记录", invariant: "第1至4章从环境、函数级语法、类级机制推进到命名与公共API。" },
  { label: "包与应用", input: "语言与API", action: "第5至7章把包、Atomisator应用和zc.buildout连接成可分发系统。", evidence: "包与应用的测试与迁移记录", invariant: "第5至7章把包、Atomisator应用和zc.buildout连接成可分发系统。" },
  { label: "项目生命周期", input: "包与应用", action: "第8至11章覆盖版本控制、迭代生命周期、文档与测试驱动开发。", evidence: "项目生命周期的测试与迁移记录", invariant: "第8至11章覆盖版本控制、迭代生命周期、文档与测试驱动开发。" },
  { label: "性能与设计", input: "项目生命周期", action: "第12至14章先测量瓶颈，再选择算法、并发、缓存和Python化模式。", evidence: "性能与设计的测试与迁移记录", invariant: "第12至14章先测量瓶颈，再选择算法、并发、缓存和Python化模式。" },
  { label: "历史工具迁移", input: "性能与设计", action: "原书基于Python 2.5时代生态", evidence: "历史工具迁移的测试与迁移记录", invariant: "原书基于Python 2.5时代生态；保留why和架构边界，按当前Python与PyPA文档替换how。" },
];
export function PyaLearningMapModelLab(){return <PythonAdvancedOfficialLab title="全书导览：执行链" caption="沿需求、实现和证据追踪本章核心。" cases={cases} tone="cyan" />;}
export function PyaLearningMapBoundaryLab(){return <PythonAdvancedOfficialLab title="全书导览：边界" caption="切换单元，比较历史工具与现代迁移边界。" cases={cases} tone="amber" initial={1} />;}
export function PyaLearningMapEvidenceLab(){return <PythonAdvancedOfficialLab title="全书导览：证据" caption="用测试、环境和制品证明结果可重放。" cases={cases} tone="emerald" initial={2} />;}
