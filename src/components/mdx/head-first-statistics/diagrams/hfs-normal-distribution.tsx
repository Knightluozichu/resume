import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"概率密度",data:"连续变量的概率来自密度曲线面积，单点概率为零。正态分布由均值与标准差决定，标准化把任意正态变量转为标准正态，概率可通过同一累积分布读取。",model:"区间下的面积是概率，曲线高度本身不是点概率。",evidence:"用计数、图形和反例验证概率密度",warning:"把密度高度当作点概率，忘记连续变量概率来自面积。"},
  {label:"正态分布",data:"概率密度",model:"对称钟形连续分布，由均值定位、标准差定宽。",evidence:"用计数、图形和反例验证正态分布",warning:"只因直方图大致对称就假设正态，不检查尾部、混合群体与过程漂移。"},
  {label:"标准化",data:"正态分布",model:"减均值并除标准差，把位置转换为距均值多少个标准差。",evidence:"用计数、图形和反例验证标准化",warning:"把密度高度当作点概率，忘记连续变量概率来自面积。"},
  {label:"标准正态",data:"标准化",model:"均值0、方差1的正态分布，为概率表与统一计算提供基准。",evidence:"用计数、图形和反例验证标准正态",warning:"只因直方图大致对称就假设正态，不检查尾部、混合群体与过程漂移。"},
  {label:"区间概率",data:"标准正态",model:"用累积分布函数之差计算，需明确端点和尾部方向。",evidence:"制造尺寸只有在过程稳定、单峰且近似对称时才适合正态模型。规格合格率应由区间概率计算，同时用QQ图或残差检查模型；截断和混合批次会破坏钟形假设。",warning:"把密度高度当作点概率，忘记连续变量概率来自面积。"},
];
export function HfsNormalDistributionDataLab(){return <HeadFirstStatsLab title="第8章 正态分布：保持正常：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsNormalDistributionModelLab(){return <HeadFirstStatsLab title="第8章 正态分布：保持正常：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsNormalDistributionEvidenceLab(){return <HeadFirstStatsLab title="第8章 正态分布：保持正常：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
