import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "确定性生成器", premise: "伪随机数生成器由有限内部状态确定性地产生看似随机的序列。均匀整数、浮点映射和目标分布采样都可能引入偏差；模拟要求可复现种子，安全用途则要求不可预测的密码学随机源。", transform: "同一算法和种子产生同一序列，便于重放，也意味着普通生成器可预测。", evidence: "用定义、边界样例和反例验证确定性生成器", invariant: "确定性生成器：同一算法和种子产生同一序列，便于重放，也意味着普通生成器可预测。" },
  { label: "种子", premise: "确定性生成器", transform: "初始化内部状态；测试应记录种子，生产安全密钥不应使用可猜种子。", evidence: "用定义、边界样例和反例验证种子", invariant: "种子：初始化内部状态；测试应记录种子，生产安全密钥不应使用可猜种子。" },
  { label: "周期", premise: "种子", transform: "有限状态序列最终重复；周期长只是必要条件，不保证统计质量。", evidence: "用定义、边界样例和反例验证周期", invariant: "周期：有限状态序列最终重复；周期长只是必要条件，不保证统计质量。" },
  { label: "分布变换", premise: "周期", transform: "从均匀随机数构造目标分布，需处理离散精度、尾部和拒绝效率。", evidence: "用定义、边界样例和反例验证分布变换", invariant: "分布变换：从均匀随机数构造目标分布，需处理离散精度、尾部和拒绝效率。" },
  { label: "密码学随机", premise: "分布变换", transform: "要求即使观察大量输出也难以预测后续值，接口和威胁模型不同于模拟PRNG。", evidence: "游戏掉落可以用记录种子的普通PRNG重放争议局；密码重置令牌必须使用操作系统密码学随机源，且令牌还需足够熵、短时有效和一次性消费。把两个需求统一成一个random调用会同时伤害调试与安全。", invariant: "密码学随机：要求即使观察大量输出也难以预测后续值，接口和威胁模型不同于模拟PRNG。" },
];
export function Pm2PseudorandomModelLab(){return <ProgrammerMathSeriesLab title="第7章 伪随机数：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm2PseudorandomBoundaryLab(){return <ProgrammerMathSeriesLab title="第7章 伪随机数：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm2PseudorandomEvidenceLab(){return <ProgrammerMathSeriesLab title="第7章 伪随机数：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
