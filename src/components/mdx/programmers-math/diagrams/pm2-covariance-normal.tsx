import { ProgrammerMathSeriesLab, type ProgrammerMathCase } from "./official-lab";
const cases: ProgrammerMathCase[] = [
  { label: "协方差", premise: "多变量概率需要同时描述各维尺度和共同变化。协方差矩阵的对角线是方差，非对角线是协方差；特征向量给出椭圆主轴，特征值给出轴向扩散，连接概率统计与线性代数。", transform: "衡量两个变量围绕各自均值共同增减的方向与尺度，受单位影响。", evidence: "用定义、边界样例和反例验证协方差", invariant: "协方差：衡量两个变量围绕各自均值共同增减的方向与尺度，受单位影响。" },
  { label: "相关系数", premise: "协方差", transform: "用标准差归一化协方差，位于负1到1，但只刻画线性关系。", evidence: "用定义、边界样例和反例验证相关系数", invariant: "相关系数：用标准差归一化协方差，位于负1到1，但只刻画线性关系。" },
  { label: "协方差矩阵", premise: "相关系数", transform: "对称半正定矩阵，汇总所有变量方差和两两协方差。", evidence: "用定义、边界样例和反例验证协方差矩阵", invariant: "协方差矩阵：对称半正定矩阵，汇总所有变量方差和两两协方差。" },
  { label: "多元正态分布", premise: "协方差矩阵", transform: "由均值向量和协方差矩阵确定，等密度面是椭圆或椭球。", evidence: "用定义、边界样例和反例验证多元正态分布", invariant: "多元正态分布：由均值向量和协方差矩阵确定，等密度面是椭圆或椭球。" },
  { label: "马氏距离", premise: "多元正态分布", transform: "按协方差缩放和旋转后的距离，能区分高方差方向与异常方向。", evidence: "CPU和请求量高度正相关时，单独用CPU阈值会产生误报。联合模型可把沿正常相关方向的变化视为常态，而把垂直主轴的偏移识别为异常。但均值和协方差也会被异常点污染，应配合稳健估计和分群。", invariant: "马氏距离：按协方差缩放和旋转后的距离，能区分高方差方向与异常方向。" },
];
export function Pm2CovarianceNormalModelLab(){return <ProgrammerMathSeriesLab title="第5章 协方差矩阵、多元正态分布与椭圆：模型" caption="切换核心概念，追踪定义、变换和证据。" cases={cases} tone="cyan" />;}
export function Pm2CovarianceNormalBoundaryLab(){return <ProgrammerMathSeriesLab title="第5章 协方差矩阵、多元正态分布与椭圆：边界" caption="比较条件变化后，结论在哪一步失效。" cases={cases} tone="amber" initial={1} />;}
export function Pm2CovarianceNormalEvidenceLab(){return <ProgrammerMathSeriesLab title="第5章 协方差矩阵、多元正态分布与椭圆：验收" caption="用推导、数值和反例完成证据闭环。" cases={cases} tone="emerald" initial={2} />;}
