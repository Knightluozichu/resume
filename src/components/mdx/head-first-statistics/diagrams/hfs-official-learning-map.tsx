import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"描述数据",data:"本书按15章从看懂数据、计算概率推进到抽样推断与回归。学习路径保持原书故事驱动顺序，同时为每章补上公式推导、可重放代码和反例证书。",model:"先用图形、中心和离散程度认识样本。",evidence:"用计数、图形和反例验证描述数据",warning:"跳过可视化直接做检验，可能被离群点、分群和录入错误误导。"},
  {label:"概率规则",data:"描述数据",model:"用事件、条件和计数建立随机机制。",evidence:"用计数、图形和反例验证概率规则",warning:"只记公式不记录样本单位、随机机制和推断目标。"},
  {label:"分布模型",data:"概率规则",model:"用离散与连续分布描述结果和参数。",evidence:"用计数、图形和反例验证分布模型",warning:"跳过可视化直接做检验，可能被离群点、分群和录入错误误导。"},
  {label:"统计推断",data:"分布模型",model:"从样本估计总体并控制决策错误。",evidence:"用计数、图形和反例验证统计推断",warning:"只记公式不记录样本单位、随机机制和推断目标。"},
  {label:"关系建模",data:"统计推断",model:"用卡方、相关与回归分析变量关系。",evidence:"贯穿项目使用一份真实但匿名的服务质量数据：先画分布，再拟合到达与延迟模型，设计用户抽样，构造区间与检验，最后分析版本和设备关系。每一步保存假设与缺失机制。",warning:"跳过可视化直接做检验，可能被离群点、分群和录入错误误导。"},
];
export function HfsOfficialLearningMapDataLab(){return <HeadFirstStatsLab title="《深入浅出统计学》全书导览：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsOfficialLearningMapModelLab(){return <HeadFirstStatsLab title="《深入浅出统计学》全书导览：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsOfficialLearningMapEvidenceLab(){return <HeadFirstStatsLab title="《深入浅出统计学》全书导览：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
