import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "离散推理链", premise: "总复习不再按卷隔离知识，而是检验能否从现实问题选择离散、概率或线性模型，推导结论，识别适用边界，并用程序与反例建立证据。23章的验收标准是能迁移，而不是能复述。", transform: "位权、逻辑、模运算、归纳和递归共同描述有限程序如何处理无限规模。", evidence: "用定义、边界样例和反例验证离散推理链", invariant: "离散推理链：位权、逻辑、模运算、归纳和递归共同描述有限程序如何处理无限规模。" },
  { label: "状态空间", premise: "离散推理链", transform: "计数与指数增长决定穷举边界，不可判定性说明算法能力还有原则极限。", evidence: "用定义、边界样例和反例验证状态空间", invariant: "状态空间：计数与指数增长决定穷举边界，不可判定性说明算法能力还有原则极限。" },
  { label: "概率推断", premise: "状态空间", transform: "联合、条件、分布、估计和随机过程把不确定性变成可计算模型。", evidence: "用定义、边界样例和反例验证概率推断", invariant: "概率推断：联合、条件、分布、估计和随机过程把不确定性变成可计算模型。" },
  { label: "线性系统", premise: "概率推断", transform: "向量、矩阵、秩、分解和特征值解释表示、求解与长期行为。", evidence: "用定义、边界样例和反例验证线性系统", invariant: "线性系统：向量、矩阵、秩、分解和特征值解释表示、求解与长期行为。" },
  { label: "综合验收", premise: "线性系统", transform: "结论必须附输入域、单位、随机机制、数值误差和可重放证据。", evidence: "综合题：为带噪传感器的环形事件缓冲设计异常检测。模运算管理槽位，逻辑定义告警，归纳证明索引不越界，概率分布描述噪声，协方差识别联合异常，LU或特征方法求模型。最终用故障注入和固定种子重放。", invariant: "综合验收：结论必须附输入域、单位、随机机制、数值误差和可重放证据。" },
];
export function PmSeriesFinalReviewModelLab(){return <ProgrammerMathSeriesLab title="《程序员的数学》三册总复习：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function PmSeriesFinalReviewBoundaryLab(){return <ProgrammerMathSeriesLab title="《程序员的数学》三册总复习：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function PmSeriesFinalReviewEvidenceLab(){return <ProgrammerMathSeriesLab title="《程序员的数学》三册总复习：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
