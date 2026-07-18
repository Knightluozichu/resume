import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "基例", premise: "数学归纳法用有限证明覆盖无限多个自然数命题。基例确认第一块骨牌能倒，归纳步骤证明任意一块倒下会推动下一块；强归纳允许下一步使用所有更小规模结论，与递归算法的正确性证明直接对应。", transform: "验证最小规模命题，防止归纳链悬空；程序中常对应空输入或单元素。", evidence: "用定义、边界样例和反例验证基例", invariant: "基例：验证最小规模命题，防止归纳链悬空；程序中常对应空输入或单元素。" },
  { label: "归纳假设", premise: "基例", transform: "暂时假定规模k成立，只能按声明范围使用，不能偷用待证的k加1。", evidence: "用定义、边界样例和反例验证归纳假设", invariant: "归纳假设：暂时假定规模k成立，只能按声明范围使用，不能偷用待证的k加1。" },
  { label: "归纳步骤", premise: "归纳假设", transform: "从P(k)严格推出P(k+1)，说明相邻规模之间的传递机制。", evidence: "用定义、边界样例和反例验证归纳步骤", invariant: "归纳步骤：从P(k)严格推出P(k+1)，说明相邻规模之间的传递机制。" },
  { label: "强归纳法", premise: "归纳步骤", transform: "证明规模k加1时可使用所有不超过k的结论，适合多分支递归和质因数分解。", evidence: "用定义、边界样例和反例验证强归纳法", invariant: "强归纳法：证明规模k加1时可使用所有不超过k的结论，适合多分支递归和质因数分解。" },
  { label: "循环不变量", premise: "强归纳法", transform: "循环每轮前后保持的命题，是把归纳法迁移到迭代程序的桥梁。", evidence: "二分查找的循环不变量是：若目标存在，它始终位于半开区间left到right内。初始化覆盖全数组；每次比较后缩小一侧仍保持命题；终止时区间为空即可证明不存在。只测试若干输入不能替代这个对所有迭代的证明。", invariant: "循环不变量：循环每轮前后保持的命题，是把归纳法迁移到迭代程序的桥梁。" },
];
export function Pm1InductionModelLab(){return <ProgrammerMathSeriesLab title="第4章 数学归纳法：推倒无穷多骨牌：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm1InductionBoundaryLab(){return <ProgrammerMathSeriesLab title="第4章 数学归纳法：推倒无穷多骨牌：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm1InductionEvidenceLab(){return <ProgrammerMathSeriesLab title="第4章 数学归纳法：推倒无穷多骨牌：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
