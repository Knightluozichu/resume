import { HeadFirstStatsLab, type HeadFirstStatsCase } from "./official-lab";
const cases:HeadFirstStatsCase[]=[
  {label:"原假设",data:"六步检验流程从原假设、备择假设、统计量、临界区和p值到决策。第一类错误、第二类错误和功效揭示阈值取舍。检验结果必须与效应大小和实际后果一起解释。",model:"作为基准被检验的参数声明，统计量分布在其成立时可计算。",evidence:"用计数、图形和反例验证原假设",warning:"把未拒绝原假设写成证明原假设为真；可能只是功效不足。"},
  {label:"备择假设",data:"原假设",model:"希望检测的偏离方向，可为单侧或双侧并应预先指定。",evidence:"用计数、图形和反例验证备择假设",warning:"实验后才选择单侧方向或删指标，破坏预先错误率控制。"},
  {label:"显著性水平",data:"备择假设",model:"长期第一类错误率上限，决定拒绝区域。",evidence:"用计数、图形和反例验证显著性水平",warning:"把未拒绝原假设写成证明原假设为真；可能只是功效不足。"},
  {label:"p值",data:"显著性水平",model:"原假设下观察到当前或更极端统计量的概率。",evidence:"用计数、图形和反例验证p值",warning:"实验后才选择单侧方向或删指标，破坏预先错误率控制。"},
  {label:"功效",data:"p值",model:"备择真实时正确拒绝原假设的概率，受效应、样本量和噪声影响。",evidence:"药物或产品实验必须预注册主指标、方向、样本量和停止规则。反复窥视数据会提高误报率。报告应包含效应、区间、p值、功效和不良后果，避免“显著即重要”。",warning:"把未拒绝原假设写成证明原假设为真；可能只是功效不足。"},
];
export function HfsHypothesisTestsDataLab(){return <HeadFirstStatsLab title="第13章 假设检验：查看证据：数据" caption="切换统计对象，观察数据、模型与证据。" cases={cases} tone="cyan"/>}
export function HfsHypothesisTestsModelLab(){return <HeadFirstStatsLab title="第13章 假设检验：查看证据：模型" caption="改变假设，比较模型边界。" cases={cases} tone="amber" initial={1}/> }
export function HfsHypothesisTestsEvidenceLab(){return <HeadFirstStatsLab title="第13章 假设检验：查看证据：证据" caption="用误差、反例和重放完成验收。" cases={cases} tone="emerald" initial={2}/> }
