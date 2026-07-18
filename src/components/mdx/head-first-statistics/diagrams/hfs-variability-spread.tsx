import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"极差",data:"中心相同的数据仍可能有完全不同的风险。本章依次比较极差、四分位距、方差、标准差和标准分数，用箱线图观察分布范围，并解释为何平方偏差提供可分解的波动度量。",model:"最大值减最小值，计算简单但完全由两个端点决定。",evidence:"用计数、图形和反例验证极差",warning:"用极差代表整体波动，忽略它只依赖最大和最小两个观测。"},
  {label:"四分位距",data:"极差",model:"上四分位数减下四分位数，描述中间一半数据并降低离群点影响。",evidence:"用计数、图形和反例验证四分位距",warning:"混用总体方差与样本方差分母，导致估计目标和自由度不一致。"},
  {label:"方差",data:"四分位距",model:"平方偏差的平均或无偏估计，量纲被平方但便于代数分解。",evidence:"用计数、图形和反例验证方差",warning:"用极差代表整体波动，忽略它只依赖最大和最小两个观测。"},
  {label:"标准差",data:"方差",model:"方差平方根，恢复原单位并衡量典型偏离尺度。",evidence:"用计数、图形和反例验证标准差",warning:"混用总体方差与样本方差分母，导致估计目标和自由度不一致。"},
  {label:"标准分数",data:"标准差",model:"观测减均值再除标准差，把不同单位数据转换为相对位置。",evidence:"两个服务平均延迟都为100毫秒，一个稳定在95到105，另一个在20与500之间波动。容量与体验决策必须看标准差、IQR和尾分位数。标准分数可比较不同接口，但重尾时仍要保留原分布。",warning:"用极差代表整体波动，忽略它只依赖最大和最小两个观测。"},
];
export function HfsVariabilitySpreadDataLab(){return <HeadFirstStatsLab title="第3章 变异与离散：有力的范围：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsVariabilitySpreadModelLab(){return <HeadFirstStatsLab title="第3章 变异与离散：有力的范围：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsVariabilitySpreadEvidenceLab(){return <HeadFirstStatsLab title="第3章 变异与离散：有力的范围：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
