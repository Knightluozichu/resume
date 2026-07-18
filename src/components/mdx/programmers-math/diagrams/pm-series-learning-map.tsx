import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "三册目录", premise: "本学习路径严格对应书单中的三册系列：结城浩的数学思维、平冈和幸与堀玄的概率统计、线性代数。三册不是互不相关的知识拼盘：第一册训练表示与证明，第二册处理不确定性，第三册处理空间与映射。", transform: "第一册9章、第二册8章、第三册含第0章在内6章，共23个权威核心单元。", evidence: "用定义、边界样例和反例验证三册目录", invariant: "三册目录：第一册9章、第二册8章、第三册含第0章在内6章，共23个权威核心单元。" },
  { label: "数学模型", premise: "三册目录", transform: "把现实对象映射为变量、集合、关系和假设，并明确模型有效范围。", evidence: "用定义、边界样例和反例验证数学模型", invariant: "数学模型：把现实对象映射为变量、集合、关系和假设，并明确模型有效范围。" },
  { label: "图形直觉", premise: "数学模型", transform: "用状态、分布和空间变换图观察结构，再回到公式验证。", evidence: "用定义、边界样例和反例验证图形直觉", invariant: "图形直觉：用状态、分布和空间变换图观察结构，再回到公式验证。" },
  { label: "程序实验", premise: "图形直觉", transform: "用小规模枚举、模拟和数值计算检查推导，不把有限实验冒充证明。", evidence: "用定义、边界样例和反例验证程序实验", invariant: "程序实验：用小规模枚举、模拟和数值计算检查推导，不把有限实验冒充证明。" },
  { label: "证据链", premise: "程序实验", transform: "每章保留定义、推导、边界、代码和反例，形成可复查结论。", evidence: "贯穿项目选择“有噪声的服务容量预测”：先定义二进制状态与逻辑告警，再用计数和复杂度估计测试空间；接着建立到达与延迟分布，最后用向量状态和线性更新融合观测。每一步都写出假设与反例。", invariant: "证据链：每章保留定义、推导、边界、代码和反例，形成可复查结论。" },
];
export function PmSeriesLearningMapModelLab(){return <ProgrammerMathSeriesLab title="《程序员的数学》三册全书导览：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function PmSeriesLearningMapBoundaryLab(){return <ProgrammerMathSeriesLab title="《程序员的数学》三册全书导览：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function PmSeriesLearningMapEvidenceLab(){return <ProgrammerMathSeriesLab title="《程序员的数学》三册全书导览：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
