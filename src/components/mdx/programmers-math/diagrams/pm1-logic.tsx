import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "命题", premise: "逻辑用于消除自然语言歧义。命题只有在给定语境中才能判断真或假；非、与、或、蕴含把复杂条件拆成可枚举的真值组合。程序中的分支、断言、查询条件和规格说明都依赖这种二元推理。", transform: "能够明确判定真假的陈述；开放问题和含糊形容词在补充条件前不是合格命题。", evidence: "用定义、边界样例和反例验证命题", invariant: "命题：能够明确判定真假的陈述；开放问题和含糊形容词在补充条件前不是合格命题。" },
  { label: "真值表", premise: "命题", transform: "枚举原子命题的全部组合，以机械方式验证复合表达式是否等价。", evidence: "用定义、边界样例和反例验证真值表", invariant: "真值表：枚举原子命题的全部组合，以机械方式验证复合表达式是否等价。" },
  { label: "逻辑与或非", premise: "真值表", transform: "与要求条件同时成立，或要求至少一个成立，非负责翻转真值。", evidence: "用定义、边界样例和反例验证逻辑与或非", invariant: "逻辑与或非：与要求条件同时成立，或要求至少一个成立，非负责翻转真值。" },
  { label: "蕴含", premise: "逻辑与或非", transform: "只有前件真而后件假时为假；它描述承诺，不等同于因果关系。", evidence: "用定义、边界样例和反例验证蕴含", invariant: "蕴含：只有前件真而后件假时为假；它描述承诺，不等同于因果关系。" },
  { label: "德摩根定律", premise: "蕴含", transform: "整体否定会交换与、或并逐项取反，是改写守卫条件的重要工具。", evidence: "访问控制规则“已登录并且是管理员，或者持有一次性恢复令牌”必须显式加括号。先写决策表，再映射代码，可发现默认优先级、空身份和令牌过期等边界。安全条件的否定应使用德摩根定律逐项检查，避免漏掉一种放行路径。", invariant: "德摩根定律：整体否定会交换与、或并逐项取反，是改写守卫条件的重要工具。" },
];
export function Pm1LogicModelLab(){return <ProgrammerMathSeriesLab title="第2章 逻辑：真与假的二元世界：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm1LogicBoundaryLab(){return <ProgrammerMathSeriesLab title="第2章 逻辑：真与假的二元世界：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm1LogicEvidenceLab(){return <ProgrammerMathSeriesLab title="第2章 逻辑：真与假的二元世界：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
