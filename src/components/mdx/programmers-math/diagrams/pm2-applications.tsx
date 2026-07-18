import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "回归分析", premise: "最后一章连接回归、主成分分析、随机游走、卡尔曼滤波、马尔可夫链和信息论。共同主线是：用概率模型压缩不确定性，依据观测更新状态，并用损失或信息量评价预测。", transform: "用条件均值描述输入与输出关系，残差结构决定线性模型是否可信。", evidence: "用定义、边界样例和反例验证回归分析", invariant: "回归分析：用条件均值描述输入与输出关系，残差结构决定线性模型是否可信。" },
  { label: "主成分分析", premise: "回归分析", transform: "对协方差矩阵特征分解，选择最大方差方向进行旋转与降维。", evidence: "用定义、边界样例和反例验证主成分分析", invariant: "主成分分析：对协方差矩阵特征分解，选择最大方差方向进行旋转与降维。" },
  { label: "随机过程", premise: "主成分分析", transform: "按时间索引的一族随机变量，需要描述状态转移和跨时间依赖。", evidence: "用定义、边界样例和反例验证随机过程", invariant: "随机过程：按时间索引的一族随机变量，需要描述状态转移和跨时间依赖。" },
  { label: "卡尔曼滤波", premise: "随机过程", transform: "在线组合动态预测与带噪观测，以协方差权衡两类信息。", evidence: "用定义、边界样例和反例验证卡尔曼滤波", invariant: "卡尔曼滤波：在线组合动态预测与带噪观测，以协方差权衡两类信息。" },
  { label: "信息熵", premise: "卡尔曼滤波", transform: "平均编码下限与不确定性度量，概率越均匀，熵通常越高。", evidence: "位置融合系统用运动模型预测下一状态，再用GPS观测修正。GPS噪声变大时滤波器应更信任预测，模型不稳定时应更信任观测。协方差不是装饰参数，它决定增益；错误单位或未建模偏差会让估计看似平滑却系统性错误。", invariant: "信息熵：平均编码下限与不确定性度量，概率越均匀，熵通常越高。" },
];
export function Pm2ApplicationsModelLab(){return <ProgrammerMathSeriesLab title="第8章 概率论的各类应用：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm2ApplicationsBoundaryLab(){return <ProgrammerMathSeriesLab title="第8章 概率论的各类应用：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm2ApplicationsEvidenceLab(){return <ProgrammerMathSeriesLab title="第8章 概率论的各类应用：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
